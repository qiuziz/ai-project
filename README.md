# AI编程工具集合

这是一个完全由AI编程实现的小工具集合项目，使用React + TypeScript + Vite构建。

## 项目介绍

本项目旨在提供一个轻量级的工具集合平台，目前已实现代码运行器功能，支持JavaScript和TypeScript代码的在线执行。

## 主要功能

### 代码运行器
- 支持JavaScript和TypeScript代码的在线执行
- 自动检测代码类型（无需手动选择）
- Chrome DevTools风格的日志输出（支持log/warn/error不同颜色区分）
- Tab键缩进支持
- Enter键快捷运行代码

## 技术栈

- React 19
- TypeScript 5.9
- Vite 4.5
- React Router v7
- esbuild-wasm (用于TypeScript编译)

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── ToolCard.tsx    # 工具卡片组件
│   └── Icon.tsx        # 图标组件
├── pages/              # 页面目录
│   ├── Home.tsx        # 首页
│   └── CodeRunner.tsx  # 代码运行器页面
├── icons/              # 图标目录
│   └── CodeIcon.tsx    # 代码图标
├── App.tsx             # 应用入口组件
├── main.tsx            # 渲染入口
├── App.css             # 应用样式
└── index.css           # 全局样式
```

## 安装与运行

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 生产构建

```bash
pnpm build
```

### 插件模式构建

```bash
pnpm build:plugin
```

## 使用说明

1. 在首页点击「代码运行器」进入工具页面
2. 在代码编辑区输入JavaScript或TypeScript代码
3. 可以使用Tab键进行缩进
4. 按下Enter键或点击「运行代码」按钮执行代码
5. 在输出结果区查看运行结果

## AI编程说明

本项目的所有代码均由AI（GitHub Copilot）生成和维护。AI编程带来了以下优势：

- 提高开发效率，减少重复劳动
- 提供一致的代码风格和质量
- 快速实现功能原型
- 自动生成文档和注释

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License

## 链接

- [GitHub仓库](https://github.com/qiuziz/ai-project.git)
- [中文说明](https://github.com/qiuziz/ai-project.git#ai%E7%BC%96%E7%A8%8B%E5%B7%A5%E5%85%B7%E9%9B%86%E5%90%88)
