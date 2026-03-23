#!/usr/bin/env python3

import argparse
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Remove conferences whose deadlines have all expired."
    )
    parser.add_argument(
        "--data",
        default="data/conferences.json",
        help="Path to the conference JSON file.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview removals without writing changes.",
    )
    parser.add_argument(
        "--today",
        help="Override the current time with an ISO timestamp, for example 2026-03-23T00:00:00+08:00.",
    )
    return parser.parse_args()


def parse_now(today: Optional[str]) -> datetime:
    if not today:
        return datetime.now(timezone.utc)

    normalized = today.replace("Z", "+00:00")
    parsed = datetime.fromisoformat(normalized)
    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def get_timezone_offset_minutes(timezone_label: str) -> int:
    if not timezone_label.startswith("UTC") or len(timezone_label) < 5:
        return 0

    sign = timezone_label[3]
    hours = int(timezone_label[4:])
    if sign == "-":
        hours = -hours
    return hours * 60


def parse_deadline(deadline: Dict[str, Any]) -> datetime:
    year_str, month_str, day_str = deadline["date"].split("-")
    hour_str, minute_str, second_str = deadline["time"].split(":")

    year = int(year_str)
    month = int(month_str)
    day = int(day_str)
    hour = int(hour_str)
    minute = int(minute_str)
    second = int(second_str)

    offset_minutes = get_timezone_offset_minutes(deadline.get("timezone", "UTC+0"))
    tz = timezone(timedelta(minutes=offset_minutes))
    return datetime(year, month, day, hour, minute, second, tzinfo=tz).astimezone(timezone.utc)


def conference_has_future_deadline(conference: Dict[str, Any], now: datetime) -> bool:
    deadlines = conference.get("deadlines", [])
    return any(parse_deadline(deadline) > now for deadline in deadlines)


def format_deadline(deadline: Dict[str, Any]) -> str:
    return f'{deadline["type"]}: {deadline["date"]} {deadline["time"]} {deadline.get("timezone", "UTC+0")}'


def main() -> int:
    args = parse_args()
    data_path = Path(args.data)
    now = parse_now(args.today)

    conferences = json.loads(data_path.read_text(encoding="utf-8"))
    kept: List[Dict[str, Any]] = []
    removed: List[Dict[str, Any]] = []

    for conference in conferences:
        if conference_has_future_deadline(conference, now):
            kept.append(conference)
        else:
            removed.append(conference)

    print(f"Current reference time (UTC): {now.isoformat()}")
    print(f"Kept conferences: {len(kept)}")
    for conference in kept:
        print(f'- KEEP  {conference["name"]}')

    print(f"Removed conferences: {len(removed)}")
    for conference in removed:
        latest_deadline = max(conference.get("deadlines", []), key=parse_deadline)
        print(f'- DROP  {conference["name"]}  ({format_deadline(latest_deadline)})')

    if args.dry_run:
        print("Dry run only. No files were changed.")
        return 0

    data_path.write_text(
        json.dumps(kept, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Updated {data_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
