# 个人向 CCF-RC 会议截止日期统计

个人向会议截稿统计工具，参考 [ccfddl.com](https://ccfddl.com/) 设计。

## ✨ 特性

- 📅 **实时倒计时** - 精确显示截止时间
- 🔍 **智能过滤** - 支持全部时间轴视图和按CCF等级筛选
- 🏷️ **分类标签** - A/B/C类及领域标签
- 📱 **响应式设计** - 1-4栏自适应布局
- ⚡ **智能排序** - 紧急会议优先显示
- 🌍 **统一显示** - 页面统一按北京时间(UTC+8)展示截止时间
- 🖼️ **自定义背景** - 支持上传个人背景图片
- 🎨 **双视图布局** - 全部视图为时间轴，其余筛选为卡片布局
- 🖼️ **默认背景** - 首屏默认加载 `assets/eva-3.png`
- 🔄 **背景切换** - 点击“切换壁纸”可在内置背景图中轮换

## 📊 会议统计

**CCF A类(1)**  
CCS...

**CCF B类(1+...)**  
IMC...

**CCF C类(0)**  
当前列表暂无...

**其他重要(1)**  
FOCI...

## 🚀 快速开始

### 本地运行
```bash
git clone git@github.com:lz0o0/CCF-RC.git
cd CCF-RC
# 直接打开 CCF-RC.html 或使用本地服务器
python -m http.server 8000
# 访问 http://localhost:8000/CCF-RC.html
```

### GitHub Pages 部署
1. Fork 此仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源
4. 访问 `https://lz0o0.github.io/CCF-RC/CCF-RC.html`

## 🛠️ 技术架构

- **前端**: HTML5 + CSS3 + JavaScript
- **数据源**: `data/conferences.json`
- **布局**: 时间轴 + CSS Grid 响应式卡片
- **样式**: 毛玻璃效果 + 固定默认背景
- **字体**: Inter 字体系列
- **存储**: localStorage(背景设置)
- **响应式**: 移动端完全适配

## 📖 使用说明

1. 打开 `CCF-RC.html` 查看网站
2. 默认进入“全部”视图，按未来 6 个月时间轴浏览会议
3. 点击顶部按钮可切换到 CCF A/B/C 或非 CCF 卡片视图
4. 右上角"自定义背景"上传个人图片
5. 点击"切换壁纸"可在仓库自带背景图之间切换
6. 会议卡片包含：
   - 可点击会议名(访问官网)
   - CCF等级 + 研究领域标签
   - 倒计时 + 北京时间截止时间
   - 会议时间地点
7. “全部”视图按月份分组展示未来 6 个月内的会议
8. 响应式布局：大屏4栏，中屏3/2栏，小屏1栏

## 排序规则

- 全部视图：仅展示未来 6 个月内的会议，并按月份、截止时间升序排列
- 未截止 > 已截止
- 未截止：时间紧急优先
- 已截止：时间倒序

## 📁 文件结构

```
CCF_RC/
├── CCF-RC.html     # 主页面
├── styles.css      # 样式文件
├── script.js       # 功能逻辑
├── data/
│   ├── conferences.json         # 会议数据源
│   └── conference.template.json # 新增会议模板
├── scripts/
│   └── prune_conferences.py     # 自动清理过期会议
├── README.md       # 项目文档
├── LICENSE         # 开源协议
└── .gitignore      # Git忽略文件
```

## 📝 数据格式

会议数据存储在 `data/conferences.json` 中，单条记录格式如下：

```json
{
    name: "会议简称",
    fullName: "会议全称", 
    ccfLevel: "ccf-a|ccf-b|ccf-c|non-ccf",
    tags: ["领域标签"],
    deadlines: [{
        type: "截止类型",
        date: "YYYY-MM-DD",
        time: "HH:MM:SS", 
        timezone: "UTC+X"
    }],
    location: "地点",
    conferenceDate: "会议日期",
    website: "官网",
    note: "备注(可选)"
}
```

## 🔧 维护说明

- **数据存储**：`data/conferences.json` 中的会议数组
- **添加会议**：参考 `data/conference.template.json` 新增条目，再追加到 `data/conferences.json`
- **保留原则**：默认仅保留当前仍有未来投稿窗口的会议，已完全过期的会议会移除
- **自动清理**：可运行 `python3 scripts/prune_conferences.py --dry-run` 预览，再运行 `python3 scripts/prune_conferences.py` 正式清理
- **时间展示**：数据可按原始投稿时区录入，页面统一转换为北京时间显示
- **背景资源**：仓库内置背景图由 `script.js` 中的 `BUILTIN_BACKGROUNDS` 控制，新增图片后记得同步加入列表
- **运行方式**：由于页面会通过 `fetch` 读取 JSON，请优先使用本地服务器访问，不建议直接双击 HTML
- **背景设置**：通过localStorage持久化保存
- **布局优化**：卡片高度自适应，避免内容截断
- **链接验证**：定期检查官网链接有效性
- **时间更新**：及时更新截止日期和会议信息

## 🧰 维护脚本

```bash
# 仅预览哪些会议会被删除
python3 scripts/prune_conferences.py --dry-run

# 按当前时间正式删除所有已完全过期的会议
python3 scripts/prune_conferences.py

# 用指定时间点模拟清理结果
python3 scripts/prune_conferences.py --dry-run --today 2026-06-01T00:00:00+08:00
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## ⚠️ 免责声明

本网站提供的数据仅供参考，请以官方网站信息为准。如需添加或修改会议信息，请提交 Issue 或 Pull Request。

---

⭐ 如果这个项目对您有帮助，请给个 Star！
