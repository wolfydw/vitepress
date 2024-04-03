

## 背景

2024.4.1

前段时间尝试了使用docsify搭建知识分享站，朴素但是好用的界面深受我的喜欢，但是一些细节方面总觉的不是很完美，遂决定尝试一下更新更流行的vitepress

## 快速上手

官方文档：https://v1.vuepress.vuejs.org/zh/guide/getting-started.html

### 安装

1. 准备Node.js 18及以上版本，[官方文档](https://nodejs.org/en/download/package-manager)

   ```
   # installs NVM (Node Version Manager)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   
   # 重启终端后再进行以下流程
   
   # download and install Node.js
   nvm install 21
   
   # verifies the right Node.js version is in the environment
   node -v # should print `v21.7.1`
   
   # verifies the right NPM version is in the environment
   npm -v # should print `10.5.0`
   ```

2. 创建并进入一个新目录

   ```bash
   mkdir vitepress && cd vitepress
   ```

3. 使用npm进行安装

   ```
   npm add -D vitepress
   ```

4. 运行命令行向导

   ```
   npx vitepress init
   ```


   需要回答几个简单的问题：

   ```
   ┌  Welcome to VitePress!
   │
   ◇  Where should VitePress initialize the config?
   │  ./docs
   │
   ◇  Site title:
   │  My Awesome Project
   │
   ◇  Site description:
   │  A VitePress Site
   │
   ◆  Theme:
   │  ● Default Theme (Out of the box, good-looking docs)
   │  ○ Default Theme + Customization
   │  ○ Custom Theme
   └
   ```

### 目录结构

搭建成功后的目录结构如下

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

### 启动

```
npm run docs:dev # 开发模式，支持热更新
```

```
npm run docs:build # 构建，生成静态文件
npm run docs:preview # 正式发布
```

配置文件：`./package.json`