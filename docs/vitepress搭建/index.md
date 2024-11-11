更新时间：2024.11.1

## 背景

2024.4.1

前段时间尝试了使用docsify搭建知识分享站，朴素但是好用的界面深受我的喜欢，但是一些细节方面总觉的不是很完美，遂决定尝试一下更新更流行的vitepress

## 快速上手

官方文档：https://vitepress.dev/zh/guide/getting-started

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

### 编辑配置文件

```
# 以下是宝宝的配置文件
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "宝宝的成长记录",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '成长记录', link: '/index' }
    ],

    lastUpdated: true, 

    outline: 'deep',
    outlineTitle: '目录',

    search: {provider: 'local'}, // 全局搜索

    sidebar: [
      {
        text: '0岁',
        items: [
          { text: '2024年3月', link: '/202403' },
          { text: '2024年6月', link: '/202406' },
          { text: '2024年7月', link: '/202407' },
          { text: '2024年8月', link: '/202408' },
          { text: '2024年9月', link: '/202409' },
          { text: '2024年10月', link: '/202410' }
        ]
      }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 - 情歌'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
```

## 部署

### vitepress 在本地构建和部署

```
npm run docs:dev # 开发模式，支持热更新
```

```
npm run docs:build # 构建，生成静态文件
npm run docs:preview # 正式发布
```

构建后，生成的静态文件默认在`.vitepress/dist`目录中

发布后，将会在 `http://localhost:8080` 启动服务。

### vitepress在本地构建，在服务器上部署

1. 本地构建，生成静态文件
   ```
   npm run docs:build
   ```

2. 将本地静态文件复制到服务器上，例如我是将本地`.vitepress/dist`目录下的所有静态文件复制到了服务器的`/root/yangbaobao`目录下

3. 创建一个`nginx`的`docker-compose.yml`并启动
   ```
   version: '3'
   
   services:
     vitepress-server:
       image: nginx:latest
       volumes:
         - /root/yangbaobao:/usr/share/nginx/html
       ports:
         - '5173:80'
       restart: always
   ```

4. 域名DNS解析值服务器，并设置反代和SSL

**本地更新后，如何同步到服务器？**

两个方法，一是将`.vitepress/dist`目录重新上传，二是使用`rsync`进行增量备份

1. 在 macOS 和 VPS 上同时安装`rsync`，macOS是默认自带`rsync`的
   ```
   rsync --version # 查询版本
   ```

   ```
   apt install rsync -y
   ```

2. 进入`.vitepress/dist`所在目录
   ```
   cd /path/.vitepress/dist
   ```

3. 进行增量备份

   ```
   rsync -avz -e "ssh -p 远程端口" --delete ./ vps_user@vps_ip:/远程目录/
   ```
