# CCF-RC 会议截止日期统计

计算机会议截止日期统计工具，涵盖安全、网络、数据挖掘、AI等领域，参考 [ccfddl.com](https://ccfddl.com/) 设计。

[![Demo](https://img.shields.io/badge/Demo-Live-green)](https://lz0o0.github.io/CCF-RC/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#)

## ✨ 特性

- 📅 **实时倒计时** - 精确显示截止时间
- 🔍 **智能过滤** - 按CCF等级筛选
- 🏷️ **分类标签** - A/B/C类及领域标签
- 📱 **响应式设计** - 1-4栏自适应布局
- ⚡ **智能排序** - 紧急会议优先显示
- 🌍 **时区统一** - 北京时间(UTC+8)
- 🖼️ **自定义背景** - 支持上传个人背景图片
- 🎨 **优化布局** - 横向卡片设计，内容完整显示

## 📊 会议统计

**CCF A类(11个)**  
CCS, S&P, USENIX Security, NDSS, SIGCOMM, INFOCOM, TMC, TON, NSDI, TIFS, WWW

**CCF B类(10个)**  
ESORICS, ACSAC, RAID, IMC, SIGMETRICS, IWQoS, ICNP, CIKM, ECML-PKDD, DSN

**CCF C类(8个)**  
AsiaCCS, SecureComm, ACNS, PAM, DFRWS, PETS, PAKDD, IJCNN

**其他重要(2个)**  
FC, CT-RSA

## 🚀 快速开始

### 本地运行
```bash
git clone https://github.com/lz0o0/CCF-RC.git
cd CCF-RC
# 直接打开 CCF-RC.html 或使用本地服务器
python -m http.server 8000
# 访问 http://localhost:8000/CCF-RC.html
```

### GitHub Pages 部署
1. Fork 此仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源
4. 访问 `https://lz0o0/CCF-RC/CCF-RC.html`

## 🛠️ 技术架构

- **前端**: HTML5 + CSS3 + JavaScript
- **布局**: CSS Grid响应式(1-4栏自适应)
- **样式**: 毛玻璃效果 + 渐变背景
- **字体**: Inter 字体系列
- **存储**: localStorage(背景设置)
- **响应式**: 移动端完全适配

## 📖 使用说明

1. 打开 `CCF-RC.html` 查看网站
2. 顶部按钮筛选CCF等级(默认CCF A类)
3. 右上角"自定义背景"上传个人图片
4. 会议卡片包含：
   - 可点击会议名(访问官网)
   - CCF等级 + 研究领域标签
   - 倒计时 + 截止时间
   - 会议时间地点
5. 响应式布局：大屏4栏，中屏3/2栏，小屏1栏

## 排序规则

- 未截止 > 已截止
- 未截止：时间紧急优先
- 已截止：时间倒序

## 📁 文件结构

```
CCF_RC/
├── CCF-RC.html     # 主页面
├── styles.css      # 样式文件
├── script.js       # 功能逻辑
├── README.md       # 项目文档
├── LICENSE         # 开源协议
└── .gitignore      # Git忽略文件
```

## 📝 数据格式

会议数据存储在 `script.js` 中，格式如下：

```javascript
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

- **数据存储**：`script.js` 中的 `conferences` 数组
- **添加会议**：按上述格式添加到数组
- **背景设置**：通过localStorage持久化保存
- **布局优化**：卡片高度自适应，避免内容截断
- **链接验证**：定期检查官网链接有效性
- **时间更新**：及时更新截止日期和会议信息

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📊 更新日志

- **v2.0** - 新增自定义背景功能，优化响应式布局
- **v1.5** - 完善排序算法，增加31个重要会议
- **v1.0** - 基础功能实现

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## ⚠️ 免责声明

本网站提供的数据仅供参考，请以官方网站信息为准。如需添加或修改会议信息，请提交 Issue 或 Pull Request。

---

⭐ 如果这个项目对您有帮助，请给个 Star！
