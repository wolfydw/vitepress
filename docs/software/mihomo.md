# Linux配置mihomo代理并开启TUN模式

原文链接：https://zfxt.top/posts/70b7a805/index.html

先介绍一下什么是`mihomo`:

> `Mihomo`原名`Clash Meta`，是基于广受欢迎的开源网络代理工具Clash开发的增强网络代理工具。它不仅继承了Clash的核心功能，还增加了一些独特的特性，如支持更多的出站传输协议和复杂的规则控制等。在2023年经历了Clash for Windows删库事件之后，原Clash项目删库停止更新，于是开发者将Clash Meta改名为Mihomo，继续进行维护和更新。

所以，曾经使用过clash的应该可以很快上手。

[mihomo项目地址](https://github.com/MetaCubeX/mihomo)

在本篇文章中，将会使用`mihomo`内核来进行代理，同时还会打开`TUN模式`实现透明代理。如有需要请接着往下看吧。

## mihomo安装和配置

### 下载mihomo内核

1. 进入[mihomo内核下载地址](https://github.com/MetaCubeX/mihomo/releases)去下载对应架构版本的文件。比如`mihomo-linux-amd64-alpha-b3db113.gz`，解压后将`mihomo-linux-amd64`上传到 linux 上，同时重命名为`mihomo`。

2. 给 mihomo 增加执行权限：

   ```
   chmod +x mihomo
   ```

3. 将`mihomo`移动到`/usr/local/bin/`目录

   ```
   cp mihomo /usr/local/bin
   ```

4. 创建运行目录

   ```
   mkdir /etc/mihomo -p
   ```



### 配置运行环境

将以下文件放到`/etc/mihomo`的目录下

配置文件config.yaml

....



## 将mihomo注册为service

1. 在将`mihomo`添加到系统服务之前，最好手动运行一次观察是否正常。

   ```
   /usr/local/bin/mihomo -d /etc/mihomo
   ```

2. 如果启动成功，没出现错误信息，那就可以创建 mihomo 服务：

   ```
   nano /etc/systemd/system/mihomo.service
   ```

3. 粘贴以下内容

   ```
   ini
   
   [Unit]
   Description=mihomo Daemon, Another Clash Kernel.
   After=network.target NetworkManager.service systemd-networkd.service iwd.service
   
   [Service]
   Type=simple
   LimitNPROC=500
   LimitNOFILE=1000000
   CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE CAP_SYS_TIME CAP_SYS_PTRACE CAP_DAC_READ_SEARCH
   AmbientCapabilities=CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE CAP_SYS_TIME CAP_SYS_PTRACE CAP_DAC_READ_SEARCH
   Restart=always
   ExecStartPre=/usr/bin/sleep 1s
   ExecStart=/usr/local/bin/mihomo -d /etc/mihomo
   ExecReload=/bin/kill -HUP $MAINPID
   
   [Install]
   WantedBy=multi-user.target
   ```

4. 重载`systemd`并启动`mihomo`服务

   ```
   systemctl daemon-reload # 重载 systemd
   systemctl enable mihomo # 允许服务自启动
   systemctl start mihomo # 启动服务
   ```

接下来访问对应的ip的控制面板`http://xxx.xxx.xxx.xxx/ui:9090`就可以控制你的`mihomo`代理了。



## 配置TUN模式

> [!note]
>
> TUN 模式是 Windows 系统中的一种虚拟网络接口模式,全称为”TUNnel”模式。
>
> TUN 模式会创建一个虚拟的点对点网络连接,这个连接会显得像一个真实的物理网络接口一样。它常用于创建 VPN(虚拟私有网络)连接。
>
> TUN是三层设备 ，模拟一个网络层设备，操作第三层数据包比如 IP 数据包，TUN 虚拟网卡实现 IP 层隧道
> Tun 模式通过新建一个 Tun 虚拟网卡接受操作系统的三层浏览流量，从而拓展 Clash 入口（inbound）转发能力，Tun 模式可以提升 Clash 处理 UDP 流量的能力，可以劫持任何三层流量，实现 DNS 劫持也是轻而易举，并且它与部分操作系统的网络栈结合也非常好，可以提升利用 iptables 等组件的能力

相比于普通的全局代理模式(即配置http_proxy之类，详见我曾经的某篇文章[clash快速开启和关闭代理模式](https://zfxt.top/posts/9ff5edc2/?highlight=clash))

TUN模式会从网络层，将所有的数据都进行转发。(解决了一些：docker必须单独配置主动代理，docker内容器无法走代理以及一些系统层面不走普通代理的问题) 这种模式在我平常玩路由器配置`openclash`的时候，一般都称之为`透明代理`。而这才是我最需要的功能。

**开启流量转发**

1. 编辑`/etc/sysctl.conf`文件

   ```
   shell
   vim /etc/sysctl.conf
   ```

2. 将以下代码取消注释

   ```
   shell
   net.ipv4.ip_forward=1
   net.ipv6.conf.all.forwarding=1
   ```

3. 加载内核参数

   ```
   shell
   sysctl -p
   ```

具体的TUN配置已经在上面的`config.yaml`中配置完了。所以到这里为止。我们就可以愉快的玩耍了！
(声明，我并没有使用fake-ip模式。考虑原因的话，我觉得我不是特别需要很好的性能，相对而言可以直观的看到ping通的信号更加方便)