## 文章未完成

最后更新时间：2024.5.7

未完成部分

- 完善工程结构
- 只反代了1个Github page的ip
- 适当的补图

## 工程结构

为了方便参考，这里列出我博客的工程目录

```txt
wolfydw.github.io
├─.github           # github配置
│  └─workflows      # 自动构建部署配置
│    └─deploy.yml   # 
├─.git              # 
│  └─...
├─docs              # 博客内容
│  ├─.vitepress    
│  │  ├─config.toml # vitepress配置
│  │  ├─cache       # 缓存文件，可忽略提交
│  │  ├─dist        # 构建包，可忽略提交
│  │  └─theme       # 样式和主题
│  ├─index.md       # 博客首页
│  ├─...            # 更多博客目录
│  └─public         # 博客使用的静态资源
├─node_modules      # 依赖目录，可忽略提交
├─.gitignore        # git提交忽略配置
├─package.json      # node.js配置
├─package-lock.json	#
├─generate-sidebar.js # 自动生成侧边栏
└─README.md         # 工程说明
```

目录中部分文件的作用会在下文中有描述。



## 发布网站

vitepress创建好之后，我们可以在本地先构建和预览，再部署到公网上

- 部署在vps上

  > 需要更高的技术能力

- 部署在GitHub page

  > 使用typora在本地编辑好md文件后，git push到远程仓库，利用action自动部署并发布到GitHub page

### 创建GitHub仓库

[参考教程](/使用git管理.html)

### 使用GitHub Actions进行自动构建和发布

GitHub Actions的环境中提供了很多预置的配置和工具，例如Node.js，pnpm等等，我们直接使用即可。如果你的工程目录和文中上述一致，那么直接复制配置文件内容到你的工程即可。

如果想了解更多，可以参考[GitHub Actions文档](https://link.juejin.cn?target=https%3A%2F%2Fdocs.github.com%2Fzh%2Factions)以及其他人的配置。

1. 创建`Actions`配置文件，位置`.github/workflows/deploy.yml`。

```yml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的工作流程
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消注释
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci # 或 pnpm install / yarn install / bun install
      - name: Add markdown-it-mathjax3 dependency # 支持LaTeX公式
        run: npm add -D markdown-it-mathjax3
      - name: Generate Sidebar # 自动侧边栏
        run: node generate-sidebar.js
      - name: Build with VitePress
        run: npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. 修改GitHub page配置，位置在`Settings -> Pages -> Build and deployment -> Source` ，选择`GitHub Actions`。

   

这样我们每次写完博客，将工程代码push到GitHub仓库之后（[如何push](/使用git管理.html#拉取远程仓库并修改)），GitHub会自动触发构建和发布流程，更新网站内容。我们通过`用户名.github.io`就可以访问。例如我的网站是`wolfydw.github.io`。

## 为GitHub page加速

因为不知名原因，GitHub page在国内访问总会出现各种各样的故障，我们可以利用带优化线路的海外vps对GitHub page进行反代加速

### 前期准备

- 一个域名
- 一个带优化线路的海外vps
- 一个脑子

### 操作步骤

1. 修改GitHub page默认域名，位置在`Settings -> Pages -> Build and deployment -> Custom domain`，填写你的域名，点`Save`保存。例如我的域名是`ydw.cool`
2. 域名DNS设置A记录，指向vps的ip
3. 在vps上搭建`nginx proxy manager`，将域名反代到`https://185.199.108.153:443`



## 参考资料

[使用VitePress和Github搭建个人博客网站，可以自动构建和发布 - 掘金 (juejin.cn)](https://juejin.cn/post/7235513984555384892)