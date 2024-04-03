import{_ as a,c as s,o as e,a4 as n}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"docsify文档生成利器","description":"","frontmatter":{},"headers":[],"relativePath":"软件/docsify.md","filePath":"软件/docsify.md","lastUpdated":1712116768000}'),i={name:"软件/docsify.md"},p=n(`<h1 id="docsify文档生成利器" tabindex="-1">docsify文档生成利器 <a class="header-anchor" href="#docsify文档生成利器" aria-label="Permalink to &quot;docsify文档生成利器&quot;">​</a></h1><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>这几天一直想找一个轻量美观、且能本地化部署的开源wiki程序，尝试了非常多网友的推荐，都没有得到满意的效果。</p><ul><li>语雀，分享要收费。</li><li>思源，功能太强悍，学习成本过高，并且侧重本地化，也不能方便的分享。</li><li>我来，分享功能要收费，不方便</li></ul><h2 id="入门基础" tabindex="-1">入门基础 <a class="header-anchor" href="#入门基础" aria-label="Permalink to &quot;入门基础&quot;">​</a></h2><h3 id="官方文档" tabindex="-1">官方文档 <a class="header-anchor" href="#官方文档" aria-label="Permalink to &quot;官方文档&quot;">​</a></h3><p>具体的一些基本操作它的官方文档上面都已经写得很明白了，我就不再赘述了，官方文档地址：<a href="https://docsify.js.org/#/zh-cn/" target="_blank" rel="noreferrer">https://docsify.js.org/#/zh-cn/</a> 官方文档本身就是用docsify写的，让使用者第一眼就能感受到docsify生成文档的效果。</p><p>这里只复制安装流程供取用</p><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><p>以下操作均在debian11系统</p><h4 id="安装npm" tabindex="-1">安装npm <a class="header-anchor" href="#安装npm" aria-label="Permalink to &quot;安装npm&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>apt install npm -y</span></span></code></pre></div><h4 id="全局安装docsify-cli" tabindex="-1">全局安装docsify-cli <a class="header-anchor" href="#全局安装docsify-cli" aria-label="Permalink to &quot;全局安装docsify-cli&quot;">​</a></h4><p>全局安装意味着你可以在计算机的任何位置运行<code>docsify-cli</code>命令，而不仅限于某个项目目录。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm i docsify-cli -g</span></span></code></pre></div><p>出现如下提示说明安装成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>root@debian:~# npm i docsify-cli -g</span></span>
<span class="line"><span>changed 205 packages, and audited 206 packages in 8s</span></span>
<span class="line"><span>17 packages are looking for funding</span></span>
<span class="line"><span>  run \`npm fund\` for details</span></span>
<span class="line"><span>8 vulnerabilities (7 moderate, 1 high)</span></span>
<span class="line"><span>To address all issues, run:</span></span>
<span class="line"><span>  npm audit fix</span></span>
<span class="line"><span>Run \`npm audit\` for details.</span></span></code></pre></div><p>这是npm安装操作完成后的输出。它提供了关于安装过程的一些反馈，包括：</p><ul><li>安装或更新了205个包，总共检查了206个包。</li><li>有17个包寻求资金支持。</li><li>发现了8个安全漏洞，其中7个为中等严重性，1个为高严重性。</li><li>建议运行<code>npm audit fix</code>来自动修复这些安全问题，以及<code>npm audit</code>以获取更多详细信息。</li></ul><h4 id="初始化" tabindex="-1">初始化 <a class="header-anchor" href="#初始化" aria-label="Permalink to &quot;初始化&quot;">​</a></h4><p>在你想要存文档的目录下运行，命令会创建文档目录并初始化</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docsify init ./docs</span></span></code></pre></div><p>初始化成功后，可以看到 <code>./docs</code> 目录下创建的几个文件</p><ul><li><code>index.html</code> 入口文件，可以对页面总体布局进行设置。</li><li><code>README.md</code> 为主页内容渲染，直接编辑 <code>docs/README.md</code> 就能更新文档内容。</li><li><code>.nojekyll</code> 用于阻止 GitHub Pages 忽略掉下划线开头的文件 直接编辑 <code>docs/README.md</code> 就能更新文档内容，当然也可以<a href="https://docsify.js.org/#/zh-cn/more-pages" target="_blank" rel="noreferrer">添加更多页面</a>。</li></ul><h4 id="运行服务" tabindex="-1">运行服务 <a class="header-anchor" href="#运行服务" aria-label="Permalink to &quot;运行服务&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docsify serve docs</span></span></code></pre></div><p>默认访问地址：<code>ip:3000</code> 因为docsify采用了vue.js，因此整个网站的内容都会随着文件的修改而实时更新，说实话还挺好用的</p><h4 id="使用pm2持续运行" tabindex="-1">使用pm2持续运行 <a class="header-anchor" href="#使用pm2持续运行" aria-label="Permalink to &quot;使用pm2持续运行&quot;">​</a></h4><p><strong>安装pm2</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm install pm2 -g</span></span></code></pre></div><p><strong>使用pm2启动docsify</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pm2 start &quot;docsify serve docs&quot; --name docsify-app --cwd /root/data/</span></span></code></pre></div><p>通过<code>--cwd</code>选项指定工作目录 <strong>检查应用状态</strong>： 执行以下命令来检查你的<code>docsify</code>应用的状态：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pm2 status</span></span></code></pre></div><p><strong>配置<code>pm2</code>自启动</strong>：</p><p>如果还没有配置<code>pm2</code>的自启动脚本，可以使用以下命令生成并配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pm2 startup</span></span></code></pre></div><p>然后按照终端输出的指示操作，以确保在服务器重启后，你的<code>docsify</code>服务也能自动启动。</p><p><strong>保存<code>pm2</code>配置</strong>：</p><p>为了在重启服务器后恢复当前的<code>pm2</code>配置，执行以下命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pm2 save</span></span></code></pre></div><p>这样，你就可以确保<code>docsify</code>服务在指定的目录(<code>/root/data/</code>)下运行，并且配置了自动重启和系统重启后自动启动。</p><h3 id="定制功能" tabindex="-1">定制功能 <a class="header-anchor" href="#定制功能" aria-label="Permalink to &quot;定制功能&quot;">​</a></h3><p>因为整个项目本身就是以源码的形式发布的，所以给了用户较大的定制空间</p><h4 id="代码框修改间距" tabindex="-1">代码框修改间距 <a class="header-anchor" href="#代码框修改间距" aria-label="Permalink to &quot;代码框修改间距&quot;">​</a></h4><p>只需要在<code>&lt;head&gt;</code> <code>&lt;/head&gt;</code>之间添加以下代码即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  &lt;style&gt;</span></span>
<span class="line"><span>    .markdown-section pre&gt;code{</span></span>
<span class="line"><span>      padding: 1.2em 5px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  &lt;/style&gt;</span></span></code></pre></div><p>教程参考：</p><p><a href="https://juejin.cn/post/7112247501167525919#heading-0" target="_blank" rel="noreferrer">使用 docsify 并定制以使它更强大 - 掘金 (juejin.cn)</a><a href="https://xmq.plus/posts/1654.html#toc-heading-1" target="_blank" rel="noreferrer">Docsifyb文档搭建记录 | 肆零肆 (xmq.plus)</a></p><h3 id="git-同步" tabindex="-1">git 同步 <a class="header-anchor" href="#git-同步" aria-label="Permalink to &quot;git 同步&quot;">​</a></h3><h4 id="首次操作" tabindex="-1">首次操作 <a class="header-anchor" href="#首次操作" aria-label="Permalink to &quot;首次操作&quot;">​</a></h4><ol><li>在GitHub上创建一个新的仓库，并获取仓库的URL，看起来像这样：<a href="https://github.com/yourusername/your-repo-name.git%E3%80%82" target="_blank" rel="noreferrer">https://github.com/yourusername/your-repo-name.git。</a></li><li>转到设置（Settings）&gt; 开发者设置（Developer settings）&gt; 个人访问令牌（Personal access tokens）</li><li>点击“生成新令牌”（Generate new token），选择所需的权限（对于推送操作，确保选中了repo），然后生成令牌。令牌只会显示一次，一定要妥善保存</li><li>回到vps进行操作</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 安装git</span></span>
<span class="line"><span>apt install git</span></span>
<span class="line"><span># 转到docs目录并初始化仓库</span></span>
<span class="line"><span>cd /root/data/docs</span></span>
<span class="line"><span>git init</span></span>
<span class="line"><span># 将/docs/内所有文件添加到仓库中</span></span>
<span class="line"><span>git add .</span></span>
<span class="line"><span># 使用GitHub提供的仓库URL将远程仓库添加为origin</span></span>
<span class="line"><span>git remote add origin https://github.com/yourusername/your-repo-name.git</span></span>
<span class="line"><span># 推送本地更改到GitHub</span></span>
<span class="line"><span>git push -u origin main</span></span></code></pre></div><p>注意，推送时需要账号和PAT令牌，而不是密码哦</p><h4 id="拉取操作" tabindex="-1">拉取操作 <a class="header-anchor" href="#拉取操作" aria-label="Permalink to &quot;拉取操作&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>cd /root/data/docs</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git pull origin main</span></span></code></pre></div><h3 id="疑难杂症" tabindex="-1">疑难杂症 <a class="header-anchor" href="#疑难杂症" aria-label="Permalink to &quot;疑难杂症&quot;">​</a></h3><h4 id="一直卡laoding" tabindex="-1">一直卡Laoding <a class="header-anchor" href="#一直卡laoding" aria-label="Permalink to &quot;一直卡Laoding&quot;">​</a></h4><p>docsify的css和js都是从cdn.jsdelivr.net所导入的，但是国内访问jsdelivr的速度就很。。。所以就造成了一直在Loading</p><p>解决方法有2种，分别是</p><ul><li>将文件从本地引入</li><li>改成其它域名引入</li></ul><p>为了方便采用第二种方法，把cdn改成了fastly，问题解决</p>`,63),t=[p];function o(l,c,d,r,h,u){return e(),s("div",null,t)}const b=a(i,[["render",o]]);export{m as __pageData,b as default};
