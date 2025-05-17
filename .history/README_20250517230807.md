# AI Tools Resource Site

一个现代化的AI工具资源导航网站，使用Vue.js构建。

## 功能特点

- 分类展示各类AI工具资源
- 支持搜索和过滤功能
- 响应式设计，适配各种设备
- 美观的UI界面和流畅的用户体验
- 支持子分类导航和热门推荐
- 自定义滚动条样式

## 项目结构

```
frontend/
  ├── src/
  │   ├── assets/        # 静态资源
  │   ├── components/    # Vue组件
  │   ├── App.vue        # 主应用组件
  │   └── main.js        # 入口文件
  ├── public/            # 公共资源
  └── package.json       # 项目依赖

backend/                 # 后端服务（开发中）
```

## 开发环境设置

1. 安装依赖：
```bash
cd frontend
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 技术栈

- Vue 3
- Vite
- Node.js
- Express (后端)
- MongoDB (计划中)

## 版本控制

项目使用Git进行版本控制，主要分支：

- `main`: 主分支，用于生产环境
- `develop`: 开发分支，用于功能开发

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情 