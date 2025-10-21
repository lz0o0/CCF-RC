// 信息安全会议数据
const conferences = [
    {
        name: "CCS 2026",
        fullName: "ACM Conference on Computer and Communications Security",
        ccfLevel: "ccf-a",
        tags: ["安全+网络", "信息安全"],
        deadlines: [
            {
                type: "Round 1",
                date: "2026-01-14",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Round 2", 
                date: "2026-04-29",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Copenhagen, Denmark",
        conferenceDate: "November 15-19, 2026",
        website: "https://www.sigsac.org/ccs/CCS2026/",
        note: "Notice! Only submission deadline is determined and else stay with TBD!"
    },
    {
        name: "USENIX 2026",
        fullName: "USENIX Security Symposium",
        ccfLevel: "ccf-a",
        tags: ["安全+网络", "信息安全"],
        deadlines: [
            {
                type: "Cycle 1",
                date: "2025-08-19",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Cycle 2",
                date: "2026-01-29",
                time: "23:59:59", 
                timezone: "UTC-12"
            }
        ],
        location: "Baltimore, MD, USA",
        conferenceDate: "August 12–14, 2026",
        website: "https://www.usenix.org/conference/usenixsecurity26",
        note: "Multiple submission cycles"
    },
    {
        name: "S&P 2026", 
        fullName: "IEEE Symposium on Security and Privacy",
        ccfLevel: "ccf-a",
        tags: ["安全+网络", "信息安全"],
        deadlines: [
            {
                type: "Cycle 1",
                date: "2025-5-29",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Cycle 2",
                date: "2025-11-6",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "San Francisco, CA, USA",
        conferenceDate: "May 18-20, 2026",
        website: "https://www.ieee-security.org/TC/SP2026/",
        note: "Annual premier security conference"
    },
    {
        name: "FOCI 2026",
        fullName: "Free and Open Communications on the Internet",
        ccfLevel: "non-ccf",
        tags: ["网络安全", "隐私保护", "网络审查"],
        deadlines: [
            {
                type: "Paper Submission",
                date: "2025-11-07",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Online Event",
        conferenceDate: "July 14 2026",
        website: "https://foci.community/",
        note: "Workshop on internet freedom, co-located with PETS"
    },
    // 网络测量
    {
        name: "IMC 2026",
        fullName: "Internet Measurement Conference",
        ccfLevel: "ccf-b",
        tags: ["网络测量", "网络"],
        deadlines: [
            {
                type: "cycle 1",
                date: "2025-11-13",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {                
                type: "cycle 2",
                date: "2026-04-22",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Karlsruhe, Germany",
        conferenceDate: "November 3-6, 2026",
        website: "https://conferences.sigcomm.org/imc/2025/",
        note: "Internet measurement conference"
    },
    {
        name: "PAM 2026",
        fullName: "Passive and Active Measurement Conference",
        ccfLevel: "ccf-c",
        tags: ["网络测量", "网络"],
        deadlines: [
            {
                type: "Abstract Registration",
                date: "2025-10-15",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Virtual Event, Austria",
        conferenceDate: "March 23-25, 2026",
        website: "https://pam2026.at",
        note: "Passive and active measurement"
    },
];

// 全局变量
let currentFilter = 'ccf-a'; // 默认显示CCF A类
let countdownIntervals = {};

// 背景控制函数
function uploadBackground() {
    document.getElementById('bg-upload').click();
}

function handleBackgroundUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            setCustomBackground(imageUrl);
            // 保存到本地存储
            localStorage.setItem('customBackground', imageUrl);
        };
        reader.readAsDataURL(file);
    }
}

function setCustomBackground(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.classList.add('custom-bg');
}

function resetBackground() {
    document.body.style.backgroundImage = '';
    document.body.classList.remove('custom-bg');
    // 清除本地存储
    localStorage.removeItem('customBackground');
}

// 页面加载时检查是否有保存的背景
function loadSavedBackground() {
    const savedBackground = localStorage.getItem('customBackground');
    if (savedBackground) {
        setCustomBackground(savedBackground);
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    loadSavedBackground(); // 加载保存的背景
    setupFilterButtons();
    renderConferences();
    updateCountdowns();
    setInterval(updateCountdowns, 1000); // 每秒更新倒计时
});

// 设置过滤按钮
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // 设置默认选中CCF A类按钮
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === 'ccf-a') {
            btn.classList.add('active');
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加active类到当前按钮
            this.classList.add('active');
            
            currentFilter = this.dataset.filter;
            renderConferences();
        });
    });
}

// 渲染会议列表（支持时间轴视图和卡片视图）
function renderConferences() {
    const grid = document.getElementById('conferences-grid');
    const filteredConferences = filterConferences();
    
    grid.innerHTML = '';
    
    if (currentFilter === 'all') {
        renderTimelineConferences();
        return;
    }

    filteredConferences.forEach(conference => {
        const card = createConferenceCard(conference);
        grid.appendChild(card);
    });

    updateConferenceCount(filteredConferences.length);
}

// 简单时间轴渲染（恢复到方案A之前的轻量版）
function renderTimelineConferences() {
    const grid = document.getElementById('conferences-grid');
    const now = new Date();
    const sixMonthsLater = new Date(now.getFullYear(), now.getMonth() + 6, 1);

    // 筛选未来6个月内的会议
    const filtered = conferences.filter(conf => {
        const nearest = getNearestDeadline(conf.deadlines);
        const date = parseDeadlineDate(nearest);
        return date >= now && date < sixMonthsLater;
    });

    const grouped = groupConferencesByMonth(filtered);

    let total = 0;
    Object.keys(grouped).sort().forEach(monthKey => {
        const section = document.createElement('div');
        section.className = 'timeline-month-section';

        const title = document.createElement('h2');
        title.className = 'timeline-month-title';
        const [y, m] = monthKey.split('-');
        title.textContent = `${y}年 ${parseInt(m,10)}月`;
        section.appendChild(title);

        grouped[monthKey].sort((a,b)=> parseDeadlineDate(getNearestDeadline(a.deadlines)) - parseDeadlineDate(getNearestDeadline(b.deadlines))).forEach(conf => {
            total++;
            const nearest = getNearestDeadline(conf.deadlines);
            const item = document.createElement('div');
            item.className = 'timeline-item';

            const dateEl = document.createElement('div');
            dateEl.className = 'timeline-date';
            dateEl.textContent = formatDeadlineMonthDay(nearest);

            const content = document.createElement('div');
            content.className = 'timeline-content';
            content.innerHTML = `
                <a class="conference-name" href="${conf.website}" target="_blank">${conf.name}</a>
                <div class="conference-extra">${conf.fullName ? conf.fullName : ''}</div>
                <div class="conference-location">${conf.location ? conf.location : ''}</div>
            `;

            item.appendChild(dateEl);
            item.appendChild(content);
            section.appendChild(item);
        });

        grid.appendChild(section);
    });

    updateConferenceCount(total);
}

// 格式化为 MM/DD（用于时间轴日期）
function formatDeadlineMonthDay(deadline) {
    const d = parseDeadlineDate(deadline);
    const mm = String(d.getMonth() + 1).padStart(2,'0');
    const dd = String(d.getDate()).padStart(2,'0');
    return `${mm}/${dd}`;
}

// 按月份分组，返回键为 'YYYY-MM'
function groupConferencesByMonth(conferencesList) {
    const grouped = {};
    conferencesList.forEach(conf => {
        const nearest = getNearestDeadline(conf.deadlines);
        const d = parseDeadlineDate(nearest);
        const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(conf);
    });
    return grouped;
}

// 按时间轴样式渲染会议（用于 '全部' 过滤器）：展示未来6个月内的会议，按月分组
// （timeline 渲染已被移除，保留卡片视图逻辑）

// 过滤会议
function filterConferences() {
    let filteredConferences;
    if (currentFilter === 'all') {
        filteredConferences = [...conferences];
    } else {
        filteredConferences = conferences.filter(conf => conf.ccfLevel === currentFilter);
    }
    
    // 按截止时间排序
    return sortConferencesByDeadline(filteredConferences);
}

// 按截止时间排序会议
function sortConferencesByDeadline(conferences) {
    const now = new Date();
    
    return conferences.sort((a, b) => {
        const deadlineA = getNearestDeadline(a.deadlines);
        const deadlineB = getNearestDeadline(b.deadlines);
        
        const dateA = parseDeadlineDate(deadlineA);
        const dateB = parseDeadlineDate(deadlineB);
        
        const isExpiredA = dateA < now;
        const isExpiredB = dateB < now;
        
        // 未截止的排在前面
        if (isExpiredA && !isExpiredB) return 1;
        if (!isExpiredA && isExpiredB) return -1;
        
        // 如果都未截止，距离截止时间越短的排在前面
        if (!isExpiredA && !isExpiredB) {
            return dateA - dateB;
        }
        
        // 如果都已截止，按截止时间从近到远排序
        if (isExpiredA && isExpiredB) {
            return dateB - dateA;
        }
        
        return 0;
    });
}

// 创建会议卡片
function createConferenceCard(conference) {
    const card = document.createElement('div');
    card.className = `conference-card ${conference.ccfLevel}`;
    
    // 获取最近的截止日期
    const nearestDeadline = getNearestDeadline(conference.deadlines);
    const isExpired = isDeadlineExpired(nearestDeadline);
    
    if (isExpired) {
        card.classList.add('expired');
    }
    
    // 生成标签HTML
    const tagsHtml = conference.tags ? conference.tags.map(tag => 
        `<span class="conference-tag">${tag}</span>`
    ).join('') : '';
    
    card.innerHTML = `
        <div class="conference-header">
            <div>
                <a href="${conference.website}" target="_blank" class="conference-name">${conference.name}</a>
                <div class="conference-full-name">${conference.fullName}</div>
            </div>
            <div class="ccf-badge ${conference.ccfLevel}">
                ${getCCFLabelText(conference.ccfLevel)}
            </div>
        </div>
        
        <div class="conference-details">
            <div class="detail-row">
                <span class="detail-label">会议日期:</span>
                <span class="detail-value">${conference.conferenceDate}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">会议地点:</span>
                <span class="detail-value">${conference.location}</span>
            </div>
            ${conference.note ? `
            <div class="detail-row">
                <span class="detail-label">备注:</span>
                <span class="detail-value">${conference.note}</span>
            </div>
            ` : ''}
        </div>
        
        <div class="countdown" id="countdown-${conference.name.replace(/\s+/g, '-')}">
            <div class="countdown-value">计算中...</div>
            <div class="countdown-label">距离截止时间</div>
        </div>
        
        <div class="deadline-info">
            <strong>${nearestDeadline.type} 截止时间:</strong><br>
            ${formatDeadlineDateTime(nearestDeadline)}
        </div>
        
        <div class="website-link">
            ${tagsHtml}
        </div>
    `;
    
    return card;
}

// 获取最近的截止日期
function getNearestDeadline(deadlines) {
    const now = new Date();

    // 找到所有未过期的截止日期
    const futureDeadlines = deadlines.filter(deadline => {
        const deadlineDate = parseDeadlineDate(deadline);
        console.log(`Checking deadline: ${deadline.date} -> Parsed: ${deadlineDate}`);
        return deadlineDate > now;
    });

    // 如果有未过期的截止日期，返回最近的一个
    if (futureDeadlines.length > 0) {
        const nearest = futureDeadlines.reduce((nearest, current) => {
            const nearestDate = parseDeadlineDate(nearest);
            const currentDate = parseDeadlineDate(current);
            return currentDate < nearestDate ? current : nearest;
        });
        console.log(`Nearest future deadline: ${nearest.date}`);
        return nearest;
    }

    // 如果所有截止日期都已过期，返回最晚的一个
    const latest = deadlines.reduce((latest, current) => {
        const latestDate = parseDeadlineDate(latest);
        const currentDate = parseDeadlineDate(current);
        return currentDate > latestDate ? current : latest;
    });
    console.log(`All deadlines expired. Latest deadline: ${latest.date}`);
    return latest;
}

// 修复日期解析问题，标准化日期格式
function parseDeadlineDate(deadline) {
    try {
        // 标准化日期格式为 YYYY-MM-DD
        const standardizedDate = deadline.date.split('-').map(part => part.padStart(2, '0')).join('-');
        const dateTimeStr = `${standardizedDate}T${deadline.time}`;
        const date = new Date(dateTimeStr);

        if (isNaN(date.getTime())) {
            console.error(`Invalid date format after standardization: ${dateTimeStr}`);
            return new Date(); // 返回当前时间以避免崩溃
        }

        // 处理时区转换
        const timezoneOffset = getTimezoneOffset(deadline.timezone);
        date.setMinutes(date.getMinutes() + timezoneOffset);

        return date;
    } catch (error) {
        console.error("Error parsing deadline date:", error);
        return new Date(); // 返回当前时间以避免崩溃
    }
}

// 获取时区偏移量（分钟）
function getTimezoneOffset(timezone) {
    const utcOffsetMatch = timezone.match(/UTC([+-]\d+)/);
    if (utcOffsetMatch) {
        const offset = parseInt(utcOffsetMatch[1]);
        return -offset * 60; // 转换为分钟，并取反
    }
    return 0;
}

// 检查截止日期是否已过期
function isDeadlineExpired(deadline) {
    const now = new Date();
    const deadlineDate = parseDeadlineDate(deadline);
    return deadlineDate < now;
}

// 格式化截止日期时间
function formatDeadlineDateTime(deadline) {
    const deadlineDate = parseDeadlineDate(deadline);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Shanghai'
    };
    
    const formatter = new Intl.DateTimeFormat('zh-CN', options);
    const formattedDate = formatter.format(deadlineDate);
    
    return `${formattedDate} (CST)`;
}

// 获取CCF等级标签文本
function getCCFLabelText(ccfLevel) {
    const levelMap = {
        'ccf-a': 'CCF A',
        'ccf-b': 'CCF B', 
        'ccf-c': 'CCF C',
        'non-ccf': '非CCF'
    };
    return levelMap[ccfLevel] || ccfLevel;
}

// 更新倒计时函数，添加错误处理
function updateCountdowns() {
    conferences.forEach(conference => {
        const countdownId = `countdown-${conference.name.replace(/\s+/g, '-')}`;
        const countdownElement = document.getElementById(countdownId);

        if (!countdownElement) {
            console.warn(`Countdown element not found for conference: ${conference.name}`);
            return; // 跳过不存在的元素
        }

        const nearestDeadline = getNearestDeadline(conference.deadlines);
        console.log(`Updating countdown for ${conference.name}. Nearest deadline: ${nearestDeadline.date}`);

        const deadlineDate = parseDeadlineDate(nearestDeadline);
        const now = new Date();
        const timeDiff = deadlineDate - now;

        if (timeDiff > 0) {
            const countdown = calculateCountdown(timeDiff);
            countdownElement.querySelector('.countdown-value').textContent = 
                `${countdown.days}天 ${countdown.hours}时 ${countdown.minutes}分 ${countdown.seconds}秒`;
        } else {
            countdownElement.querySelector('.countdown-value').textContent = '已截止';
            countdownElement.parentElement.classList.add('expired');
        }
    });
}

// 计算倒计时
function calculateCountdown(timeDiff) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
}

// 更新会议数量显示
function updateConferenceCount(count) {
    const countElement = document.getElementById('conference-count');
    countElement.textContent = `显示 ${count} 个会议`;
}
 
