import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.4aTu-Nia.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vitepress搭建/index.md","filePath":"vitepress搭建/index.md","lastUpdated":1712116768000}'),p={name:"vitepress搭建/index.md"},i=e(`<h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>2024.4.1</p><p>前段时间尝试了使用docsify搭建知识分享站，朴素但是好用的界面深受我的喜欢，但是一些细节方面总觉的不是很完美，遂决定尝试一下更新更流行的vitepress</p><h2 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h2><p>官方文档：<a href="https://v1.vuepress.vuejs.org/zh/guide/getting-started.html" target="_blank" rel="noreferrer">https://v1.vuepress.vuejs.org/zh/guide/getting-started.html</a></p><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><ol><li><p>准备Node.js 18及以上版本，<a href="https://nodejs.org/en/download/package-manager" target="_blank" rel="noreferrer">官方文档</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># installs NVM (Node Version Manager)</span></span>
<span class="line"><span>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 重启终端后再进行以下流程</span></span>
<span class="line"><span></span></span>
<span class="line"><span># download and install Node.js</span></span>
<span class="line"><span>nvm install 21</span></span>
<span class="line"><span></span></span>
<span class="line"><span># verifies the right Node.js version is in the environment</span></span>
<span class="line"><span>node -v # should print \`v21.7.1\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span># verifies the right NPM version is in the environment</span></span>
<span class="line"><span>npm -v # should print \`10.5.0\`</span></span></code></pre></div></li><li><p>创建并进入一个新目录</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress</span></span></code></pre></div></li><li><p>使用npm进行安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm add -D vitepress</span></span></code></pre></div></li><li><p>运行命令行向导</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npx vitepress init</span></span></code></pre></div><p>需要回答几个简单的问题：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>┌  Welcome to VitePress!</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>◇  Where should VitePress initialize the config?</span></span>
<span class="line"><span>│  ./docs</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>◇  Site title:</span></span>
<span class="line"><span>│  My Awesome Project</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>◇  Site description:</span></span>
<span class="line"><span>│  A VitePress Site</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>◆  Theme:</span></span>
<span class="line"><span>│  ● Default Theme (Out of the box, good-looking docs)</span></span>
<span class="line"><span>│  ○ Default Theme + Customization</span></span>
<span class="line"><span>│  ○ Custom Theme</span></span>
<span class="line"><span>└</span></span></code></pre></div></li></ol><h3 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h3><p>搭建成功后的目录结构如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>├─ docs</span></span>
<span class="line"><span>│  ├─ .vitepress</span></span>
<span class="line"><span>│  │  └─ config.js</span></span>
<span class="line"><span>│  ├─ api-examples.md</span></span>
<span class="line"><span>│  ├─ markdown-examples.md</span></span>
<span class="line"><span>│  └─ index.md</span></span>
<span class="line"><span>└─ package.json</span></span></code></pre></div><h3 id="启动" tabindex="-1">启动 <a class="header-anchor" href="#启动" aria-label="Permalink to &quot;启动&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm run docs:dev # 开发模式，支持热更新</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm run docs:build # 构建，生成静态文件</span></span>
<span class="line"><span>npm run docs:preview # 正式发布</span></span></code></pre></div><p>配置文件：<code>./package.json</code></p>`,14),l=[i];function t(o,c,d,h,r,g){return n(),a("div",null,l)}const m=s(p,[["render",t]]);export{v as __pageData,m as default};
