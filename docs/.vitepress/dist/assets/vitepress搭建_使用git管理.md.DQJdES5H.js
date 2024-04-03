import{_ as e,c as t,o as a,a4 as s}from"./chunks/framework.4aTu-Nia.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vitepress搭建/使用git管理.md","filePath":"vitepress搭建/使用git管理.md","lastUpdated":1712122684000}'),i={name:"vitepress搭建/使用git管理.md"},o=s(`<h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>为了方便多端编辑与同步，这里采用git进行管理</p><h2 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h2><h3 id="创建远程仓库" tabindex="-1">创建远程仓库 <a class="header-anchor" href="#创建远程仓库" aria-label="Permalink to &quot;创建远程仓库&quot;">​</a></h3><p><strong>在GitHub创建一个新的仓库</strong>：</p><p>登录您的GitHub账号，然后在GitHub上创建一个新的仓库。创建仓库时，GitHub会提供一个仓库的URL，看起来像这样：<code>https://github.com/yourusername/your-repo-name.git</code>。</p><p><strong>生成个人访问令牌（PAT）</strong>：</p><ul><li>登录你的GitHub账号。</li><li>转到设置（Settings）&gt; 开发者设置（Developer settings）&gt; 个人访问令牌（Personal access tokens）。</li><li>点击“生成新令牌”（Generate new token），选择所需的权限（对于推送操作，确保选中了<code>repo</code>），然后生成令牌。</li></ul><p><strong>使用PAT代替密码</strong>：</p><ul><li>当命令行提示你输入用户名和密码时，用户名仍然是你的GitHub用户名，但密码处输入你刚刚生成的个人访问令牌。</li></ul><h3 id="创建本地仓库" tabindex="-1">创建本地仓库 <a class="header-anchor" href="#创建本地仓库" aria-label="Permalink to &quot;创建本地仓库&quot;">​</a></h3><p><strong>初始化Git仓库</strong>：在项目目录中，运行<code>git init</code>命令来初始化一个新的Git仓库。这会创建一个名为<code>.git</code>的隐藏目录，其中包含了所有必要的Git仓库文件，但不会影响其他文件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git init</span></span></code></pre></div><p><strong>创建.gitignore文件</strong>：使用<code>touch .gitignore</code>（Mac）或<code>nano .gitignore</code>（Unix-like）命令创建<code>.gitignore</code>文件，在文件内容中添加规则：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>*.DS_Store # 忽略所有.DS_Store文件</span></span>
<span class="line"><span>temp/ # 忽略所有名为temp的文件夹</span></span></code></pre></div><p><strong>添加文件到暂存区</strong>：使用<code>git add</code>命令来添加文件到Git暂存区。如果你想添加当前目录下的所有文件（不包括.gitignore中指定的文件），可以使用<code>.</code>代表当前目录：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git add .</span></span></code></pre></div><p>这一步将当前目录下的所有文件和子目录添加到暂存区，准备进行提交。</p><p><strong>提交文件到仓库</strong>：使用<code>git commit</code>命令来将暂存区的文件提交到仓库。你需要提供一个提交消息，描述这次提交的内容。这可以通过<code>-m</code>选项后面跟上消息内容来实现：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git commit -m &quot;Initial commit&quot;</span></span></code></pre></div><p>这一步将暂存区的更改永久记录到Git历史中。</p><p><strong>将远程仓库添加到您的本地仓库</strong>：</p><p>使用GitHub提供的仓库URL将远程仓库添加为<code>origin</code>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git remote add origin https://github.com/yourusername/your-repo-name.git</span></span></code></pre></div><p><strong>推送本地更改到GitHub</strong>：</p><p>将您的更改推送到GitHub仓库：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git push -u origin main</span></span></code></pre></div><p>系统会提示你输入账号和PAT</p><h3 id="拉取远程仓库并修改" tabindex="-1">拉取远程仓库并修改 <a class="header-anchor" href="#拉取远程仓库并修改" aria-label="Permalink to &quot;拉取远程仓库并修改&quot;">​</a></h3><p><code>cd</code>到本地仓库根目录，然后运行以下命令以从GitHub拉取最新更改：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git pull origin master</span></span></code></pre></div><p>本地修改完毕后</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git add -A</span></span>
<span class="line"><span>git commit -m &quot;Update existing files with modifications&quot;</span></span></code></pre></div><p>推送到远程仓库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git push origin main</span></span></code></pre></div>`,35),n=[o];function p(c,l,d,r,g,h){return a(),t("div",null,n)}const m=e(i,[["render",p]]);export{b as __pageData,m as default};
