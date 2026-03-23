const DATA_SOURCE = 'data/conferences.json';

// 全局变量
let conferences = [];
let currentFilter = 'all';
let countdownTimer = null;

// 默认背景（当用户没有自定义背景时使用）
const BUILTIN_BACKGROUNDS = [
    'assets/berserk-11.jpg',
    'assets/berserk-12.jpg',
    'assets/eva-3.png',
    'assets/wlop-1.png',
    'assets/wlop-2.jpeg'
];
const DEFAULT_BACKGROUND = 'assets/wlop-2.jpeg';
const DEFAULT_BACKGROUND_INDEX = Math.max(BUILTIN_BACKGROUNDS.indexOf(DEFAULT_BACKGROUND), 0);
const DEFAULT_BACKGROUND_INDEX_KEY = 'defaultBackgroundIndex';

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
    // 清除已保存的自定义背景，并在内置背景中切换到下一张
    localStorage.removeItem('customBackground');
    document.body.classList.remove('custom-bg');
    const nextIndex = (getStoredDefaultBackgroundIndex() + 1) % BUILTIN_BACKGROUNDS.length;
    applyBuiltinBackground(nextIndex);
}

// 页面加载时检查是否有保存的背景
function loadSavedBackground() {
    const savedBackground = localStorage.getItem('customBackground');
    if (savedBackground) {
        setCustomBackground(savedBackground);
    }
}

// 如果没有保存的自定义背景，使用默认背景
function loadSavedBackgroundWithDefault() {
    const savedBackground = localStorage.getItem('customBackground');
    if (savedBackground) {
        setCustomBackground(savedBackground);
    } else {
        applyBuiltinBackground(getStoredDefaultBackgroundIndex());
    }
}

function applyBuiltinBackground(index) {
    const normalizedIndex = index >= 0 && index < BUILTIN_BACKGROUNDS.length ? index : DEFAULT_BACKGROUND_INDEX;
    tryDefaultBackgrounds([BUILTIN_BACKGROUNDS[normalizedIndex]], function(foundUrl) {
        localStorage.setItem(DEFAULT_BACKGROUND_INDEX_KEY, String(normalizedIndex));
        setCustomBackground(foundUrl);
    });
}

function getStoredDefaultBackgroundIndex() {
    const storedIndex = Number(localStorage.getItem(DEFAULT_BACKGROUND_INDEX_KEY));
    if (Number.isInteger(storedIndex) && storedIndex >= 0 && storedIndex < BUILTIN_BACKGROUNDS.length) {
        return storedIndex;
    }
    return DEFAULT_BACKGROUND_INDEX;
}

// 依次尝试给定图片路径，找到第一个能加载的就回调
function tryDefaultBackgrounds(urls, callback) {
    if (!urls || urls.length === 0) return;
    let i = 0;
    function tryNext() {
        if (i >= urls.length) return; // 没有可用图片
        const img = new Image();
        img.onload = function() {
            callback(urls[i]);
        };
        img.onerror = function() {
            i++;
            tryNext();
        };
        img.src = urls[i];
    }
    tryNext();
}

// 初始化页面
document.addEventListener('DOMContentLoaded', async function() {
    loadSavedBackgroundWithDefault(); // 加载保存的背景，若无则使用默认背景
    setupFilterButtons();
    setStatusMessage('正在加载会议数据...');

    const loaded = await loadConferenceData();
    if (!loaded) {
        return;
    }

    renderConferences();
    updateCountdowns();
    countdownTimer = setInterval(updateCountdowns, 1000); // 每秒更新倒计时
});

async function loadConferenceData() {
    try {
        const response = await fetch(DATA_SOURCE, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Conference data must be an array');
        }

        conferences = data.filter(isValidConferenceRecord);
        if (conferences.length === 0) {
            setStatusMessage('暂无可显示的会议数据。');
            updateConferenceCount(0);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Failed to load conference data:', error);
        setStatusMessage('会议数据加载失败，请通过本地服务器访问页面并检查 data/conferences.json。');
        updateConferenceCount(0);
        return false;
    }
}

function isValidConferenceRecord(record) {
    return Boolean(
        record &&
        typeof record.name === 'string' &&
        Array.isArray(record.deadlines) &&
        record.deadlines.length > 0 &&
        typeof record.website === 'string'
    );
}

function setStatusMessage(message) {
    const grid = document.getElementById('conferences-grid');
    grid.innerHTML = `<div class="empty-state">${message}</div>`;
}

// 设置过滤按钮
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // 设置默认选中“全部”按钮
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === 'all') {
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

    if (filteredConferences.length === 0) {
        setStatusMessage('当前筛选条件下暂无会议。');
        updateConferenceCount(0);
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
    const monthKeys = Object.keys(grouped).sort();

    if (monthKeys.length === 0) {
        setStatusMessage('未来 6 个月内暂无会议。');
        updateConferenceCount(0);
        return;
    }

    monthKeys.forEach(monthKey => {
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
        return deadlineDate > now;
    });

    // 如果有未过期的截止日期，返回最近的一个
    if (futureDeadlines.length > 0) {
        return futureDeadlines.reduce((nearest, current) => {
            const nearestDate = parseDeadlineDate(nearest);
            const currentDate = parseDeadlineDate(current);
            return currentDate < nearestDate ? current : nearest;
        });
    }

    // 如果所有截止日期都已过期，返回最晚的一个
    return deadlines.reduce((latest, current) => {
        const latestDate = parseDeadlineDate(latest);
        const currentDate = parseDeadlineDate(current);
        return currentDate > latestDate ? current : latest;
    });
}

// 将 deadline 解析为真实时间点，支持 UTC±X 格式
function parseDeadlineDate(deadline) {
    try {
        const [yearStr, monthStr, dayStr] = deadline.date.split('-');
        const [hourStr = '0', minuteStr = '0', secondStr = '0'] = deadline.time.split(':');
        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        const hour = Number(hourStr);
        const minute = Number(minuteStr);
        const second = Number(secondStr);

        if ([year, month, day, hour, minute, second].some(Number.isNaN)) {
            throw new Error(`Invalid deadline fields: ${deadline.date} ${deadline.time}`);
        }

        const timezoneOffsetMinutes = getTimezoneOffset(deadline.timezone);
        const utcTimestamp = Date.UTC(year, month - 1, day, hour, minute, second) - timezoneOffsetMinutes * 60 * 1000;
        return new Date(utcTimestamp);
    } catch (error) {
        console.error("Error parsing deadline date:", error);
        return new Date(); // 返回当前时间以避免崩溃
    }
}

// 获取时区偏移量（分钟）
function getTimezoneOffset(timezone) {
    const utcOffsetMatch = timezone.match(/UTC([+-]\d+)/);
    if (utcOffsetMatch) {
        const offset = parseInt(utcOffsetMatch[1], 10);
        return offset * 60;
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
 
