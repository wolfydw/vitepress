import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"软件/frp.md","filePath":"软件/frp.md","lastUpdated":1712116768000}'),e={name:"软件/frp.md"},t=p(`<h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>最好的内网穿透工具，没什么好解释的了</p><p>github：<a href="https://github.com/fatedier/frp" target="_blank" rel="noreferrer">https://github.com/fatedier/frp</a></p><p>中文文档：<a href="https://gofrp.org/zh-cn/" target="_blank" rel="noreferrer">https://gofrp.org/zh-cn/</a></p><h2 id="安装frps" tabindex="-1">安装frps <a class="header-anchor" href="#安装frps" aria-label="Permalink to &quot;安装frps&quot;">​</a></h2><p>克隆源码并给权限</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>chmod +x ./frps</span></span></code></pre></div><p><strong>安装systemd</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>apt install systemd</span></span></code></pre></div><p><strong>在 /etc/systemd/system/ 创建 frps.service 文件</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>nano /etc/systemd/system/frps.service</span></span></code></pre></div><p><strong>写入以下内容</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[Unit]</span></span>
<span class="line"><span># 服务名称，可自定义</span></span>
<span class="line"><span>Description = frp server</span></span>
<span class="line"><span>After = network.target syslog.target</span></span>
<span class="line"><span>Wants = network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type = simple</span></span>
<span class="line"><span># 启动frps的命令，需修改为您的frps的安装路径</span></span>
<span class="line"><span>ExecStart = /path/to/frps -c /path/to/frps.toml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy = multi-user.target</span></span></code></pre></div><p><strong>使用 systemd 命令管理 frps 服务</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 启动frp</span></span>
<span class="line"><span>sudo systemctl start frps</span></span>
<span class="line"><span># 停止frp</span></span>
<span class="line"><span>sudo systemctl stop frps</span></span>
<span class="line"><span># 重启frp</span></span>
<span class="line"><span>sudo systemctl restart frps</span></span>
<span class="line"><span># 查看frp状态</span></span>
<span class="line"><span>sudo systemctl status frps</span></span></code></pre></div><p><strong>设置 frps 开机自启动</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo systemctl enable frps</span></span></code></pre></div><h2 id="安装frpc" tabindex="-1">安装frpc <a class="header-anchor" href="#安装frpc" aria-label="Permalink to &quot;安装frpc&quot;">​</a></h2><p><strong>下载 frpc 和 frpc.toml，并给权限</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>chmod +x ./frpc</span></span></code></pre></div><p><strong>编辑 frpc.toml</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>serverAddr = &quot;x.x.x.x&quot;</span></span>
<span class="line"><span>serverPort = 7000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[[proxies]]</span></span>
<span class="line"><span>name = &quot;web&quot;</span></span>
<span class="line"><span>type = &quot;http&quot;</span></span>
<span class="line"><span>localPort = 80</span></span>
<span class="line"><span>customDomains = [&quot;www.yourdomain.com&quot;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[[proxies]]</span></span>
<span class="line"><span>name = &quot;web2&quot;</span></span>
<span class="line"><span>type = &quot;http&quot;</span></span>
<span class="line"><span>localPort = 8080</span></span>
<span class="line"><span>customDomains = [&quot;www.yourdomain2.com&quot;]</span></span></code></pre></div><p><strong>运行frpc</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>./frpc -c frpc.toml</span></span></code></pre></div><h2 id="出错的解决方案" tabindex="-1">出错的解决方案 <a class="header-anchor" href="#出错的解决方案" aria-label="Permalink to &quot;出错的解决方案&quot;">​</a></h2><h3 id="排查流程" tabindex="-1">排查流程 <a class="header-anchor" href="#排查流程" aria-label="Permalink to &quot;排查流程&quot;">​</a></h3><ol><li>systemctl status frps，查看 frps 服务的状态信息，包括是否正在运行、启动日志等</li><li>netstat -tuln | grep 7000，检查7000端口是否被监听</li></ol><h3 id="exec-format-error" tabindex="-1">exec format error <a class="header-anchor" href="#exec-format-error" aria-label="Permalink to &quot;exec format error&quot;">​</a></h3><p>这个错误意味着你尝试运行的二进制文件不兼容你的操作系统架构，重新下载正确的版本就可以，一般来说小鸡都是linxu amd64构架，M系列的mac是darwin构架</p>`,29),l=[t];function i(o,r,c,d,h,u){return n(),a("div",null,l)}const f=s(e,[["render",i]]);export{m as __pageData,f as default};
