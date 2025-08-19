// 信息安全会议数据
const conferences = [
    {
        name: "CCS 2025",
        fullName: "ACM Conference on Computer and Communications Security",
        ccfLevel: "ccf-a",
        tags: ["安全+网络", "信息安全"],
        deadlines: [
            {
                type: "Round 1",
                date: "2025-01-24",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Round 2", 
                date: "2025-05-02",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Copenhagen, Denmark",
        conferenceDate: "October 14-18, 2025",
        website: "https://www.sigsac.org/ccs/CCS2025/",
        note: "Two submission rounds"
    },
    {
        name: "USENIX Security 2026",
        fullName: "USENIX Security Symposium",
        ccfLevel: "ccf-a",
        tags: ["安全+网络", "信息安全"],
        deadlines: [
            {
                type: "Cycle 1",
                date: "2025-08-27",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Cycle 2",
                date: "2026-02-06",
                time: "23:59:59", 
                timezone: "UTC-12"
            }
        ],
        location: "Baltimore, MD, USA",
        conferenceDate: "August 12-14, 2026",
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
                type: "First Deadline",
                date: "2025-11-14",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "San Francisco, CA, USA",
        conferenceDate: "May 17-21, 2026",
        website: "https://sp2026.ieee-security.org/",
        note: "Annual premier security conference"
    },
    {
        name: "NDSS 2026",
        fullName: "Network and Distributed System Security Symposium", 
        ccfLevel: "ccf-a",
        tags: ["安全+网络", "信息安全"],
        deadlines: [
            {
                type: "Summer Deadline",
                date: "2025-09-13",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "San Diego, CA, USA",
        conferenceDate: "February 23-26, 2026",
        website: "https://www.ndss-symposium.org/ndss2026/",
        note: "Top-tier security symposium"
    },
    {
        name: "AsiaCCS 2026",
        fullName: "Asia Conference on Computer and Communications Security",
        ccfLevel: "ccf-c", 
        tags: ["安全+网络", "信息安全"],
        deadlines: [
            {
                type: "1st Round",
                date: "2025-08-26",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "2nd Round",
                date: "2025-12-13",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Bangalore, India",
        conferenceDate: "June 1-6, 2026",
        website: "https://asiaccs2026.cse.iitkgp.ac.in/",
        note: "Premier Asian security conference"
    },
    {
        name: "ESORICS 2025",
        fullName: "European Symposium on Research in Computer Security",
        ccfLevel: "ccf-b",
        tags: ["安全+网络", "信息安全"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-01-15",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-01-22",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Luxembourg",
        conferenceDate: "September 22-26, 2025",
        website: "https://esorics2025.org/",
        note: "European security research symposium"
    },
    {
        name: "ACSAC 2025",
        fullName: "Annual Computer Security Applications Conference",
        ccfLevel: "ccf-b",
        tags: ["安全+网络", "信息安全"],
        deadlines: [
            {
                type: "Paper Submission",
                date: "2025-06-10",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Austin, TX, USA",
        conferenceDate: "December 8-12, 2025", 
        website: "https://www.acsac.org/2025/",
        note: "Applied security conference"
    },
    {
        name: "RAID 2025",
        fullName: "International Symposium on Research in Attacks, Intrusions and Defenses",
        ccfLevel: "ccf-b",
        tags: ["安全+网络", "信息安全"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-03-28",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-04-04",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Padua, Italy",
        conferenceDate: "September 30 - October 2, 2025",
        website: "https://raid2025.org/",
        note: "Attacks and defenses research"
    },
    {
        name: "SecureComm 2025",
        fullName: "International Conference on Security and Privacy in Communication Networks",
        ccfLevel: "ccf-c",
        tags: ["安全+通信", "信息安全"],
        deadlines: [
            {
                type: "Paper Submission",
                date: "2025-05-15",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Milan, Italy",
        conferenceDate: "October 13-15, 2025",
        website: "https://securecomm.org/2025/",
        note: "Security in communications"
    },
    {
        name: "ACNS 2026",
        fullName: "Applied Cryptography and Network Security",
        ccfLevel: "ccf-c",
        tags: ["安全+网络", "密码学"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-11-15",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-11-22",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Vienna, Austria",
        conferenceDate: "June 22-25, 2026",
        website: "https://wp.nyu.edu/acns2026/",
        note: "Applied cryptography conference"
    },
    {
        name: "FC 2026",
        fullName: "Financial Cryptography and Data Security",
        ccfLevel: "non-ccf",
        tags: ["密码学", "金融安全"],
        deadlines: [
            {
                type: "Paper Submission",
                date: "2025-09-15",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "San Juan, Puerto Rico",
        conferenceDate: "February 23-27, 2026",
        website: "https://fc26.ifca.ai/",
        note: "Financial cryptography conference"
    },
    {
        name: "CT-RSA 2026",
        fullName: "RSA Conference Cryptographers' Track",
        ccfLevel: "non-ccf",
        tags: ["密码学", "信息安全"],
        deadlines: [
            {
                type: "Paper Submission", 
                date: "2025-10-01",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "San Francisco, CA, USA",
        conferenceDate: "May 4-7, 2026",
        website: "https://ct-rsa.org/2026/",
        note: "Cryptographers' track at RSA"
    },
    {
        name: "FOCI 2026",
        fullName: "Free and Open Communications on the Internet",
        ccfLevel: "non-ccf",
        tags: ["网络安全", "隐私保护", "网络审查"],
        deadlines: [
            {
                type: "Paper Submission",
                date: "2026-04-20",
                time: "23:59:59",
                timezone: "UTC-11"
            }
        ],
        location: "TBD (Co-located with PETS)",
        conferenceDate: "July 14 2026",
        website: "https://foci.community/",
        note: "Workshop on internet freedom, co-located with PETS"
    },
    // 网络测量
    {
        name: "IMC 2025",
        fullName: "Internet Measurement Conference",
        ccfLevel: "ccf-b",
        tags: ["网络测量", "网络"],
        deadlines: [
            {
                type: "Paper Submission",
                date: "2025-05-15",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Montreal, Canada",
        conferenceDate: "October 28-30, 2025",
        website: "https://conferences.sigcomm.org/imc/2025/",
        note: "Internet measurement conference"
    },
    {
        name: "SIGMETRICS 2026",
        fullName: "ACM SIGMETRICS International Conference on Measurement and Modeling of Computer Systems",
        ccfLevel: "ccf-b",
        tags: ["网络测量", "性能评估"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-10-15",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-10-22",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Boston, MA, USA",
        conferenceDate: "June 15-19, 2026",
        website: "https://www.sigmetrics.org/sigmetrics2026/",
        note: "Performance measurement and modeling"
    },
    {
        name: "PAM 2026",
        fullName: "Passive and Active Measurement Conference",
        ccfLevel: "ccf-c",
        tags: ["网络测量", "网络"],
        deadlines: [
            {
                type: "Paper Submission",
                date: "2025-11-15",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Puerto Varas, Chile",
        conferenceDate: "March 23-25, 2026",
        website: "https://pam2026.networks.imdea.org/",
        note: "Passive and active measurement"
    },
    // 网络+通信
    {
        name: "SIGCOMM 2025",
        fullName: "ACM Special Interest Group on Data Communication",
        ccfLevel: "ccf-a",
        tags: ["网络+通信", "网络"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-01-25",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-02-01",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Los Angeles, CA, USA",
        conferenceDate: "August 18-22, 2025",
        website: "https://conferences.sigcomm.org/sigcomm/2025/",
        note: "Premier networking conference"
    },
    {
        name: "INFOCOM 2026",
        fullName: "IEEE International Conference on Computer Communications",
        ccfLevel: "ccf-a",
        tags: ["网络+通信", "网络"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-07-23",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-07-23",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "London, UK",
        conferenceDate: "May 18-21, 2026",
        website: "https://infocom2026.ieee-infocom.org/",
        note: "Leading networking conference"
    },
    {
        name: "IWQoS 2025",
        fullName: "International Workshop on Quality of Service",
        ccfLevel: "ccf-b",
        tags: ["网络+通信", "服务质量"],
        deadlines: [
            {
                type: "Paper Submission",
                date: "2025-03-15",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Guangzhou, China",
        conferenceDate: "June 19-21, 2025",
        website: "https://iwqos2025.ieee-iwqos.org/",
        note: "Quality of service workshop"
    },
    {
        name: "ICNP 2025",
        fullName: "IEEE International Conference on Network Protocols",
        ccfLevel: "ccf-b",
        tags: ["网络+通信", "网络协议"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-05-15",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-05-22",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Charleroi, Belgium",
        conferenceDate: "October 28-31, 2025",
        website: "https://icnp25.cs.ucr.edu/",
        note: "Network protocols conference"
    },
    // 网络
    {
        name: "TMC 2025",
        fullName: "IEEE Transactions on Mobile Computing",
        ccfLevel: "ccf-a",
        tags: ["网络", "移动计算"],
        deadlines: [
            {
                type: "Continuous Submission",
                date: "2025-12-31",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Online",
        conferenceDate: "2025",
        website: "https://www.computer.org/csdl/journal/tm",
        note: "Mobile computing journal"
    },
    {
        name: "TON 2025",
        fullName: "IEEE/ACM Transactions on Networking",
        ccfLevel: "ccf-a",
        tags: ["网络", "网络协议"],
        deadlines: [
            {
                type: "Continuous Submission",
                date: "2025-12-31",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Online",
        conferenceDate: "2025",
        website: "https://ton.lids.mit.edu/",
        note: "Networking journal"
    },
    {
        name: "NSDI 2026",
        fullName: "USENIX Symposium on Networked Systems Design and Implementation",
        ccfLevel: "ccf-a",
        tags: ["网络", "系统设计"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-09-12",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-09-19",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Boston, MA, USA",
        conferenceDate: "April 13-15, 2026",
        website: "https://www.usenix.org/conference/nsdi26",
        note: "Networked systems design"
    },
    // 取证、隐私保护
    {
        name: "TIFS 2025",
        fullName: "IEEE Transactions on Information Forensics and Security",
        ccfLevel: "ccf-a",
        tags: ["取证、隐私保护", "信息安全"],
        deadlines: [
            {
                type: "Continuous Submission",
                date: "2025-12-31",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Online",
        conferenceDate: "2025",
        website: "https://signalprocessingsociety.org/publications-resources/ieee-transactions-information-forensics-and-security",
        note: "Information forensics and security journal"
    },
    {
        name: "DFRWS 2025",
        fullName: "Digital Forensics Research Workshop",
        ccfLevel: "ccf-c",
        tags: ["取证、隐私保护", "数字取证"],
        deadlines: [
            {
                type: "Paper Submission",
                date: "2025-03-01",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Philadelphia, PA, USA",
        conferenceDate: "July 14-17, 2025",
        website: "https://dfrws.org/conferences/dfrws-usa-2025/",
        note: "Digital forensics research"
    },
    {
        name: "PETS 2026",
        fullName: "Privacy Enhancing Technologies Symposium",
        ccfLevel: "ccf-c",
        tags: ["取证、隐私保护", "隐私技术"],
        deadlines: [
            {
                type: "Round 1",
                date: "2025-05-31",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Round 2",
                date: "2025-08-31",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Bristol, UK",
        conferenceDate: "July 15-19, 2026",
        website: "https://petsymposium.org/2026/",
        note: "Privacy enhancing technologies"
    },
    // 知识发现、数据挖掘
    {
        name: "CIKM 2025",
        fullName: "ACM International Conference on Information and Knowledge Management",
        ccfLevel: "ccf-b",
        tags: ["知识发现、数据挖掘", "信息管理"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-05-16",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-05-23",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Boise, Idaho, USA",
        conferenceDate: "October 21-25, 2025",
        website: "https://cikm2025.org/",
        note: "Information and knowledge management"
    },
    {
        name: "ECML-PKDD 2025",
        fullName: "European Conference on Machine Learning and Principles and Practice of Knowledge Discovery",
        ccfLevel: "ccf-b",
        tags: ["知识发现、数据挖掘", "机器学习"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-03-21",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-03-28",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Vilnius, Lithuania",
        conferenceDate: "September 9-13, 2025",
        website: "https://ecmlpkdd.org/2025/",
        note: "Machine learning and knowledge discovery"
    },
    {
        name: "PAKDD 2026",
        fullName: "Pacific-Asia Conference on Knowledge Discovery and Data Mining",
        ccfLevel: "ccf-c",
        tags: ["知识发现、数据挖掘", "数据挖掘"],
        deadlines: [
            {
                type: "Abstract",
                date: "2025-12-06",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2025-12-13",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Tokyo, Japan",
        conferenceDate: "May 25-28, 2026",
        website: "https://pakdd2026.org/",
        note: "Pacific-Asia knowledge discovery"
    },
    // 人工智能
    {
        name: "IJCNN 2025",
        fullName: "International Joint Conference on Neural Networks",
        ccfLevel: "ccf-c",
        tags: ["人工智能", "神经网络"],
        deadlines: [
            {
                type: "Paper Submission",
                date: "2025-01-15",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Yokohama, Japan",
        conferenceDate: "June 30 - July 5, 2025",
        website: "https://2025.ijcnn.org/",
        note: "Neural networks conference"
    },
    // 其他
    {
        name: "WWW 2025",
        fullName: "The Web Conference",
        ccfLevel: "ccf-a",
        tags: ["其他", "万维网"],
        deadlines: [
            {
                type: "Abstract",
                date: "2024-10-17",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2024-10-24",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Sydney, Australia",
        conferenceDate: "April 28 - May 2, 2025",
        website: "https://www2025.thewebconf.org/",
        note: "World Wide Web conference"
    },
    {
        name: "DSN 2025",
        fullName: "IEEE/IFIP International Conference on Dependable Systems and Networks",
        ccfLevel: "ccf-b",
        tags: ["其他", "可靠性"],
        deadlines: [
            {
                type: "Abstract",
                date: "2024-12-11",
                time: "23:59:59",
                timezone: "UTC-12"
            },
            {
                type: "Paper",
                date: "2024-12-18",
                time: "23:59:59",
                timezone: "UTC-12"
            }
        ],
        location: "Brisbane, Australia",
        conferenceDate: "June 23-26, 2025",
        website: "https://dsn2025.github.io/",
        note: "Dependable systems and networks"
    }
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

// 渲染会议列表
function renderConferences() {
    const grid = document.getElementById('conferences-grid');
    const filteredConferences = filterConferences();
    
    grid.innerHTML = '';
    
    filteredConferences.forEach(conference => {
        const card = createConferenceCard(conference);
        grid.appendChild(card);
    });
    
    updateConferenceCount(filteredConferences.length);
}

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

// 解析截止日期
function parseDeadlineDate(deadline) {
    const dateTimeStr = `${deadline.date}T${deadline.time}`;
    const date = new Date(dateTimeStr);
    
    // 处理时区转换
    const timezoneOffset = getTimezoneOffset(deadline.timezone);
    date.setMinutes(date.getMinutes() + timezoneOffset);
    
    return date;
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

// 更新倒计时
function updateCountdowns() {
    conferences.forEach(conference => {
        const countdownId = `countdown-${conference.name.replace(/\s+/g, '-')}`;
        const countdownElement = document.getElementById(countdownId);
        
        if (countdownElement) {
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
