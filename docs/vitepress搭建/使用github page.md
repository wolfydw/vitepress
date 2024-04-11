## 文章未完成

最后更新时间：2024.4.11

预计完成时间：2024.5.11



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

目录中部分文件的作用会在下面描述。



## 构建和发布博客网站

当构建好博客之后，我们现在本地进行构建和预览。命令在上面的[安装过程](#安装过程)一节中有描述。

### 创建GitHub仓库

创建仓库后，将我们刚刚创建的博客工程上传到GitHub仓库中。注意并不是所有文件都需要上传，因此我们先需要在工程根目录创建`.gitignore`，写入我们要忽略提交的文件，再进行上传。

```bash
node_modules
docs/.vitepress/cache
docs/.vitepress/dist
**/.DS_Store # **是一个通配符，表示任意多层子目录
```

上传工程代码的命令：

```shell
git add .
git commit -m "创建博客工程"
git push
```

如果`.DS_Store`文件已经被提交并推送到了远程仓库中，你可以使用以下命令来查找并删除所有的`.DS_Store`文件

```
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```

这个命令会查找当前目录及其子目录中的所有`.DS_Store`文件，并使用`git rm`命令将它们从Git中删除。

提交并推送

```
git commit -m "Remove .DS_Store files"
```

```
git push origin main
```

### 构建和上传dist

上一步我们上传的仅仅是工程的源代码。还需要上传构建成果，才能发布博客网站。我们在工程根目录创建文件`bin/autoDeploy.bat`，这是一个Windows系统下使用的脚本文件。

```shell
call pnpm docs:build
cd docs/.vitepress/dist

git init
git add -A
git commit -m "auto construct blog"

git push -f https://github.com/jzplp/jzplp.github.io.git master:gh-pages
```

注意里面的push地址需要改成你自己的。

文件内容即是我们的构建和发布流程：

1. 构建工程，生成dist，并进入dist目录。
2. 将dist目录中的内容上传至`gh-pages`分支中。

如果使用非Windows系统，对该脚本文件后缀名和内容进行适当修改即可。

我们在`package.json`的`scripts`中增加一条命令：

```json
"deploy:win": "powershell bin/autoDeploy.bat"
```

此时可以执行这条命令，即可完成dist构建包的上传。

```shell
pnpm deploy:win
```

### 发布博客网站

我们进入你创建的GitHub仓库的配置，具体位置在`Settings -> Pages -> Build and deployment -> Source`。来源选择`Deploy from a branch`，即选择一个分支。

选择我们刚刚上传的`gh-pages`分支，根目录，然后保存。

配图

然后就可以进入我们的博客网站查看效果啦。网站地址即是我们刚刚建立的仓库名称，即是`用户名.github.io`。例如我的网站是`jzplp.github.io`。

## 使用GitHub Actions进行自动构建和发布

使用上面描述的方法，我们每次写完博客，提交工程代码后，还需要手动构建，更新分支并发布。构建过程在本地电脑上。

那么有没有方法让每次提交工程代码后，自动构建并发布呢？我们使用GitHub Actions就能做到这一点。而且GitHub还提供了服务器，我们可以把构建过程放到服务器中进行。

首先创建配置文件，位置`.github/workflows/deploy.yml`。

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

GitHub Actions的环境中提供了很多预置的配置和工具，例如Node.js，pnpm等等，我们直接使用即可。如果你的工程目录和文中上述一致，那么直接复制该文件内容到你的工程即可。之后上传到工程代码GitHub仓库中。如果想了解更多，可以参考[GitHub Actions文档](https://link.juejin.cn?target=https%3A%2F%2Fdocs.github.com%2Fzh%2Factions)以及其他人的配置。

然后打开GitHub配置，位置依旧在`Settings -> Pages -> Build and deployment -> Source`。将之前设置的`Deploy from a branch`，修改为`GitHub Actions`。

配图

这时候我们每次写完博客，将工程代码push到GitHub仓库之后，GitHub会自动触发构建和发布流程，更新博客网站。上一节中的手动[构建和上传dist](#构建和上传dist)步骤就不需要执行了。

截止到这里，我们的博客就完成啦。





## 参考资料

[使用VitePress和Github搭建个人博客网站，可以自动构建和发布 - 掘金 (juejin.cn)](https://juejin.cn/post/7235513984555384892)