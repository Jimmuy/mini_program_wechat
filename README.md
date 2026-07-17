# 嘎嘣脆糖 · 微信小程序个人作品集

一个基于微信小程序原生能力开发的个人作品集，用于展示个人介绍、摄影作品、设备与经历信息。项目采用深色视觉风格，通过自定义 TabBar 串联首页、摄影集和简历三个主要页面。

## 功能概览

- **首页**：展示个人定位、常用设备、旅行足迹，并提供摄影集入口。
- **摄影集**：按地点组织照片，支持列表、图集详情和灯箱浏览，并展示相机、镜头、光圈、快门等 EXIF 信息。
- **简历**：展示个人简介、技能、工作经历和个人项目，支持查看经历详情。
- **自定义导航**：使用自定义 TabBar 在首页、摄影集和简历之间切换。
- **分享能力**：首页、摄影集和简历页面均提供微信分享配置。

## 页面与路由

| 页面 | 路由 | 说明 |
| --- | --- | --- |
| 首页 | `pages/index/index` | 个人介绍、设备展示、旅行足迹与摄影集入口 |
| 摄影集 | `pages/gallery/index` | 摄影分组、照片详情、灯箱浏览与 EXIF 信息 |
| 简历 | `pages/resume/index` | 技能、工作经历、个人项目与经历详情弹窗 |
| 简历详情 | `pages/resume/details/index` | 已注册的独立详情页面，可供后续导航扩展 |

前三个页面同时是自定义 TabBar 的一级入口。调整它们的路径或顺序时，应同步检查 `app.json` 与 `custom-tab-bar/data.js`。

## 技术栈

- 微信小程序原生框架：JavaScript、WXML、WXSS、JSON
- [TDesign MiniProgram](https://tdesign.tencent.com/miniprogram/overview)
- 页面本地状态：`Page.data`、`setData`
- 静态内容模型：`model/resume.js`、`model/gallery.js`
- 代码规范：ESLint、Prettier、Commitlint

项目不依赖服务端接口，当前展示内容随小程序代码一同发布。

## 目录结构

```text
.
├── app.js                     # 小程序入口与更新管理
├── app.json                   # 页面路由、TabBar 和全局窗口配置
├── app.wxss                   # 全局样式
├── assets/                    # 本地图片与 TabBar 资源
├── common/                    # 通用平台能力
├── custom-tab-bar/            # 自定义底部导航
├── model/
│   ├── gallery.js             # 摄影分组、图片及 EXIF 数据
│   └── resume.js              # 首页、简历与设备数据
├── pages/
│   ├── index/                 # 首页
│   ├── gallery/               # 摄影集列表、详情和灯箱
│   └── resume/
│       ├── index.*            # 简历主页
│       └── details/           # 简历详情页
├── project.config.json        # 微信开发者工具项目配置
└── package.json               # npm 依赖与开发命令
```

## 本地运行

### 环境要求

- Node.js 与 npm
- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 可用于本地调试的小程序 AppID 或测试号

### 启动步骤

1. 安装依赖：

   ```bash
   npm install
   ```

2. 打开微信开发者工具，导入仓库根目录。
3. 在开发者工具中选择“工具 → 构建 npm”，生成小程序可用的 npm 依赖。
4. 编译项目，依次检查首页、摄影集和简历页面。

摄影图片和部分设备图片来自外部 URL。真机预览或正式发布前，需要在微信公众平台配置对应的 `downloadFile` 合法域名，并验证图片加载失败时的页面表现。

## 内容维护

| 内容 | 维护位置 |
| --- | --- |
| 姓名、角色、技能、工作经历和个人项目 | `model/resume.js` |
| 首页设备卡片 | `model/resume.js` 中的 `GEAR_DATA` |
| 摄影分组、照片地址和 EXIF 信息 | `model/gallery.js` |
| 首页旅行足迹 | `pages/index/index.js` 中的 `mapData` |
| 底部导航项 | `app.json` 与 `custom-tab-bar/data.js` |

新增页面时，需要同步完成以下配置：

1. 在 `pages/` 下创建对应的 `.js`、`.wxml`、`.wxss` 和 `.json` 文件。
2. 在 `app.json` 的 `pages` 数组中注册页面。
3. 如果页面属于底部导航，同时更新 `app.json.tabBar.list` 和 `custom-tab-bar/data.js`。

## 开发与检查

```bash
# 检查并自动修复 JavaScript 代码风格
npm run lint

# 检查已暂存的 JavaScript/TypeScript 文件
npm run check
```

当前仓库尚未配置自动化测试，`npm test` 仍是占位命令。提交功能变更前，除静态检查外，还应在微信开发者工具或真机中完成交互验证。

## 发布前检查

- 确认 `app.json.pages`、`app.json.tabBar.list` 与 `custom-tab-bar/data.js` 中的页面路径一致。
- 在微信开发者工具中重新构建 npm，并确认 TDesign 组件可以正常加载。
- 依次验证首页跳转、摄影集列表/详情/灯箱、简历访问提示与经历详情交互。
- 检查外部图片域名已加入小程序合法域名配置，并验证弱网和加载失败场景。
- 检查 `model/` 中不包含密码、访问令牌、隐私信息或其他不应随客户端发布的数据。
- 分别完成开发者工具预览和至少一次真机验证，再上传体验版或提交审核。

## 数据与安全说明

简历页的访问提示和本地校验仅用于界面展示，不构成真正的访问控制。`model/` 中的数据会被打包进客户端，不能用于保存密码、密钥、隐私数据或其他需要保密的内容。如需保护数据，应改由可信服务端完成身份验证和授权，并仅向已授权用户返回内容。

## 相关文档

- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [TDesign MiniProgram 组件文档](https://tdesign.tencent.com/miniprogram/overview)
