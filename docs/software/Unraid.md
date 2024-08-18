## 背景

时间：2024年7月30日

目前mtphoto部署在macmini上，导致macmini的硬盘吃紧

而且quest2激活和使用需要一个旁路由来提供科学上网环境

所以打算布置一台小主机，来跑mtphoto和clash

### 小主机选择

通过查询benchmark分数：[PassMark - CPU Benchmarks - List of Benchmarked CPUs](https://www.cpubenchmark.net/cpu_list.php)

N100：5522

N305：10089

选择购买中柏N305

> [!NOTE]配置如下
>
> 内存：插槽一个，支持笔记本DDR4 3200
>
> 硬盘：两个插槽，分别支持M.2 nvme PCie3.0 SSD，或SATA 2.5寸 
>
> 接口：USB3.2×5/USB2.0×1/耳机接口×1/以太网卡x2/HDMIx 1/DPx 1/Type-Cx1/MicroSD读卡器x1

### 系统选择

Unraid

**官方版**

https://unraid.net

试用30天，购买正版可以使用65折扣码`大鹏YYDS`，

**开心版**

下载：[UNRAID 6.11.5 中文集成常用插件开心版 - 米多贝克&米多网络工程 (mi-d.cn)](https://mi-d.cn/4293)

> [!NOTE]开心版与官网版的区别
>
> 1.免费
>
> 2.替换了官方的NTP服务器为国内可正常访问的NTP服务器，默认时区也改为中国北京
>
> 3.默认简体中文界面，集成 English, 繁体中文, 简体中文 方便大陆和港澳台用户使用
>
> 4.集成大量常用插件上手更加简单

**闲鱼破解版**

自行搜索，参考价19.9元

## Unraid安装

### 参考教程

[系统安装，序列建立，共享设置——司波图 UNRAID 陪玩教程 01 (youtube.com)](https://www.youtube.com/watch?v=Y3rwrqzrYk0&list=PL1yJe5g-wSuFCRCVaD7FS8OvgOV7Yppxn&index=2)

### 系统安装

1. 准备一个启动U盘，用来安装unraid系统
2. 使用官方安装程序烧录启动U盘：https://unraid.net/getting-started
3. （开心版看下载链接里面的安装教程就可以）
4. 到bios里关闭fast boot相关的设置项
5. U盘尽量使用USB2接口，USB3容易发热，影响U盘稳定性

### 推荐的初始化设置

1. 安装完成后在浏览器输入ip或 http://tower.local 登陆到Unraid的图形管理界面
2. 进入网页GUI后，先设置NTP，系统时间不对无法申请到试用key
3. 到`APPS`里搜索`简体中文语言包`安装，切换为中文

> [!WARNING] 有关持久化数据
>
> 由于 Unraid 是运行在内存中的系统，只有存储盘和 U 盘能够持久化数据，因此，存放在系统其他位置（如 /etc、/tmp 等目录）的数据在系统重启后会被清空。
>
> unraid默认的docker持久化目录是/mnt/user/appdata/，建议为每一个docker容器、APP单独在appdata目录下建立一个子目录，例如clash容器的持久化数据可以放在/mnt/user/appdata/clash/下



## Unraid进阶使用

### 部署mtphoto系列容器

- mtphoto
- mtphoto ai
- mtphoto deepface

参考官方教程：https://mtmt.tech/docs/start/introduction



### 拉不下docker镜像怎么办？

2024年6月，国内陆续屏蔽了dockerhub和所有公开镜像站，此后，在国内使用docker也需要科学上网

有两个解决方案：

1. 有能开局域网共享的代理设备，修改`/etc/docker/daemon.json`文件，让docker走共享代理
2. 有自建的docker源，修改`/etc/docker/daemon.json`文件，让docker走自建源

> [!WARNING] 
>
> 因为daemon.josn文件在/etc中，重启后会被还原，需要重新设置代理。
>
> 如需要永久设置，可以修改`U盘/config/go`文件。

#### 方法一：设置docker pull走代理

当你有一个能提供局域网共享代理的设备时，可以采用此种方案，等clash docker安装以后就转为走本机的代理

1. 打开unraid的`terminal`粘贴以下代码，回车

   ```bash
   mkdir -p /etc/docker;
   tee /etc/docker/daemon.json <<- EOF
   {
     "proxies": {
       "http-proxy": "http://127.0.0.1:7890",
       "https-proxy": "http://127.0.0.1:7890",
       "no-proxy":  "localhost,127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"
     }
   }
   EOF
   ```

   其中`127.0.0.1`替换为提供局域网共享代理的设备ip
   此外，也可以手动编辑daemon.json文件 `nano /etc/docker/daemon.json`

2. 重启docker让设置生效

   ```bash
   /etc/rc.d/rc.docker restart
   ```

   也可以在设置中手动重启：SETTINGS(设置）=>Docker，先关闭再启用docker

3. 用`docker info`命令检查是否修改成功，如出现以下代码说明修改成功
   ```json
   HTTP Proxy: http://127.0.0.1:7890
   HTTPS Proxy: http://127.0.0.1:7890
   No Proxy: localhost,127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16
   ```

   

#### 方法二：使用docker镜像源

1. 自建docker镜像可参考：[GitHub - dqzboy/Docker-Proxy](https://github.com/dqzboy/Docker-Proxy?tab=readme-ov-file)

2. npm反向代理，我这里是`https://hub.ydw.cool`
   为确保代理依旧存活，可以在终端使用`curl -I https://hub.ydw.cool`进行检测
   出现以下代码表示代理正常

   ```bash
   HTTP/2 200 
   server: openresty
   date: Tue, 23 Jul 2024 03:51:50 GMT
   cache-control: no-cache
   x-served-by: hub.ydw.cool
   ```

3. 打开unraid的`terminal`粘贴以下代码，回车
   ```bash
   mkdir -p /etc/docker
   tee /etc/docker/daemon.json <<-'EOF'
   {
   "registry-mirrors": ["https://hub.ydw.cool"]
   }
   EOF
   ```

   第一行代码是创建一个 /etc/docker 目录
   添加一个 daemon.json 的文件并填写以下参数内容

4. 重启docker让设置生效

   ```bash
   /etc/rc.d/rc.docker restart
   ```

5. 用`docker info`命令检查是否修改成功，如出现以下代码说明修改成功
   ```bash
    Registry Mirrors:
     https://hub.ydw.cool/
   ```

> [!WARNING]
>
> 本方法下载小型镜像没有问题，当下载500M或以上镜像时，疑似会被限速，原因不明。所以推荐使用方法一为docker加速



### 让建立的docker容器走共享代理

在已经建立好clash代理之后，可以在容器的compose中加入http代理相关的环境变量，例如

```yaml
services:
  your-service:
    image: your-docker-image
    environment:
      - HTTP_PROXY=http://127.0.0.1:7890
      - HTTPS_PROXY=http://127.0.0.1:7890
```



### 安装clash docker

选择想要的clash版本，不同版本的config文件格式不一样

> [!important]clash版本区别
>
> 原版clash：开源内核，已删库
>
> Clash Premium：闭源内核，已删库
>
> Clash.Meta：基于开源项目 Clash 的二次开发版本，并增加了一些独有特性；Meta 核心支持所有原开源核心的全部特性，支持原 Clash Premium 核心部分特性。在一众clash陆续删库后，Clash.Meta 也于2023-11-06暂时归档了
>
> mihomo：2023-12-13， Clash.Meta 改名为 mihomo并恢复更新

> [!NOTE] clash-meta相关项目地址
>
> mihomo、metacubexd、Yacd-meta、ClashMetaForAndroid
>
> MetaCubeX的github：https://github.com/MetaCubeX
>
> mihomo docker：https://hub.docker.com/r/metacubex/mihomo

切换至`/mnt/user/appdata/clash/`

```bash
cd /mnt/user/appdata/clash/
```

下载`config.yaml` 

```bash
wget "机场给你的订阅链接" -O config.yaml
```

创建`docker-compose.yaml`

```bash
nano docker-compose.yaml
```

选择想要的clash版本并粘贴对应的compose内容

**clash**

```yaml
services:
  clash:
    image: centralx/clash:1.18.0
    container_name: clash
    ports:
      - "1234:80" # dashboard访问端口
      - "7890:7890"
      - "9090:9090"
    volumes:
      - "./config.yaml:/home/runner/.config/clash/config.yaml"
    restart: unless-stopped
    network_mode: bridge  # 明确指定使用桥接模式
```

> [!note]
>
> 本镜像封装了 Clash 及 Clash Dashboard
>
> 项目地址：https://hub.docker.com/r/centralx/clash



**mihomo**

```yaml
services:
  metacubexd:
    container_name: metacubexd
    image: ghcr.io/metacubex/metacubexd
    restart: unless-stopped
    ports:
      - '1234:80'
    network_mode: bridge

  # optional
  meta:
    container_name: meta
    image: docker.io/metacubex/mihomo:Alpha
    restart: unless-stopped
    pid: host
    ipc: host
    network_mode: host
    cap_add:
      - ALL
    volumes:
      - ./config.yaml:/root/.config/mihomo/config.yaml
      - /dev/net/tun:/dev/net/tun
```

> [!note]
>
> 项目地址：https://github.com/MetaCubeX/metacubexd
>
> compose文件根据项目介绍中的进行了一些改动

> [!important]
>
> 因为compose使用的网络模式是host，所以当容器启动后，整个unraid的网络都会被mihomo接管，unraid上所有的docker都会获得代理网络。
>
> 虚拟机因为有虚拟网卡，分配到了独立的内网ip，所以还需要单独配置代理。

#### 使用curl测试代理服务器正常工作

例如局域网内ip为192.168.0.105的设备开启了局域网共享，端口为7890，可以在终端输入

```bash
curl -I -x http://192.168.0.105:7890 https://www.google.com
```

正常情况下应该输出以下内容

```bash
root@Tower:/mnt/user/appdata/clash# curl -I -x http://192.168.0.105:7890 https://www.google.com
HTTP/1.1 200 Connection established # 表示代理服务器已经成功建立了与目标服务器（Google）的连接

HTTP/2 200 # 表示 Google 服务器返回了一个成功的响应
# 以下为响应头：包含了 Google 服务器的各种 HTTP 头信息，如内容类型、缓存控制、cookie 等
content-type: text/html; charset=ISO-8859-1
content-security-policy-report-only: object-src 'none';base-uri 'self';script-src 'nonce-f5kB2uTcj6CJo5V5__HT6Q' 'strict-dynamic' 'report-sample' 'unsafe-eval' 'unsafe-inline' https: http:;report-uri https://csp.withgoogle.com/csp/gws/other-hp
p3p: CP="This is not a P3P policy! See g.co/p3phelp for more info."
date: Sat, 17 Aug 2024 08:06:45 GMT
server: gws
x-xss-protection: 0
x-frame-options: SAMEORIGIN
expires: Sat, 17 Aug 2024 08:06:45 GMT
cache-control: private
set-cookie: AEC=AVYB7cpQtK041cvCB3caIuUEDoisY7wkJCxFNNxoZpQ8mB1D_0xe0M0Atyk; expires=Thu, 13-Feb-2025 08:06:45 GMT; path=/; domain=.google.com; Secure; HttpOnly; SameSite=lax
set-cookie: NID=516=LRiJLF_TJtC32nHSTGBkUdwHo3QG7oSfGDXlrk1fkBd8X7ZN98qlfPRR_AVDcCVfEXavwPVUkhkhZD5meUxhaLX_xMCVxS0iviJW39YCcZrj9tZfIU9ain7xzMHNzKLYt4zgT2cr10QEQVoK-6b_0pr_G0iOH9s-glD5YDrNIdsKwmw3loGGrg; expires=Sun, 16-Feb-2025 08:06:45 GMT; path=/; domain=.google.com; HttpOnly
alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
```



### 支持NTFS和exFAT

安装`Unassigned Devices` 和 `Unassigned Devices Plus`插件

> 参考资料
>
> [unraid docker加速-修改unraid docker的镜像源（含国内网易等镜像源） - UnRaid - 我爱帮助网 (52help.net)](https://www.52help.net/unraid/251.mhtml)

### 创建虚拟浏览器

虚拟浏览器有很多，例如neko等等

#### neko

Neko不只是一个简单的私密浏览器，它的独特之处在于：

1. **多用户体验**：支持多人同时在线，无论是家人还是同事，都可以在同一平台上共享和协作。
2. **丰富应用支持**：除了浏览器，还可以运行如VLC等多种Linux应用，满足娱乐和工作的需求。
3. **社交和互动**：提供实时交流和协作功能，创造了一种新型的线上社交体验。
4. **隐私和安全**：所有操作都在安全的容器内完成，保护你的数据和隐私。
5. **个性化定制**：用户可以根据个人需要定制Neko，适用于个人娱乐、团队协作或教育培训等多种场景。
6. **文件传输**: 你可以在和好友家人互动的同时，实现文件互传

项目地址：https://github.com/m1k1o/neko

使用docker compose进行安装

```
services:
  neko:
    image: "m1k1o/neko:firefox"
    restart: "unless-stopped"
    shm_size: "2gb"
    ports:
      - "38080:8080"  # 端口可以根据需要更改
      - "52000-52100:52000-52100/udp"
    environment:
      NEKO_SCREEN: 1920x1080@30  # 或选择 "1280x720@30" 更低分辨率
      NEKO_PASSWORD: 1234  # 密码，根据需要更改
      NEKO_PASSWORD_ADMIN: 12345  # 管理员密码，根据需要更改
      NEKO_EPR: 52000-52100
      NEKO_FILE_TRANSFER_ENABLED: true  # 是否开启文件传输，根据需要更改
      NEKO_ICELITE: 1
      NEKO_NAT1TO1: 192.168.0.100  # 内网ip，根据实际网络配置更改
```

> [!note]配置讲解
>
> webserver 的port 部分： 可以改为其他端口号 如"`38080:8080`" ，`不要修改后面`的8080
>
> NEKO_SCREEN： 配置neko的分辨率，`更高则要更好的配置`
>
> NEKO_PASSWORD： 访客登录密码
>
> NEKO_PASSWORD_ADMIN： 管理员登录密码
>
> NEKO_FILE_TRANSFER_ENABLED：是否开启文件传输
>
> NEKO_NAT1TO1： 配置为你当前内网ip
>
> 官方的完整参数列表：https://neko.m1k1o.net/#/getting-started/configuration



### 创建win10虚拟机

可以实现的用途

1. 通过todesk、向日葵等远控软件实现远程访问
2. 跑一些需要长时间运行的软件，例如抢票软件bypass
3. 访问和管理一些内网服务，例如tower.local

创建过程很简单，和其他虚拟机的创建方法基本相同，这里记录一些常见问题

#### 网络模式如何选择

unraid6.12.11提供5种网络模式，建议选择virtio-net

> [!note]各网络模式详解
>
> **virtio-net** - 这是一种为虚拟化环境优化的网络适配器，提供高效率的网络性能，常用于 KVM/QEMU 虚拟机。
>
> **e1000** - 模拟 Intel e1000 网络卡的适配器，被广泛支持，适用于兼容性较高的场合，但性能通常不如专门为虚拟化优化的适配器。
>
> **rtl8139** - 模拟 Realtek 8139 网络卡的适配器，适合旧操作系统或特定兼容性需求，性能较低。
>
> **vmxnet3** - 由 VMware 提供，专为 VMware 虚拟环境优化的网络适配器，提供高性能和低主机 CPU 使用率。

#### 选择virtio-net，开机后没有网络

因为没有安装虚拟网卡驱动，操作步骤

1. 右键此电脑 - 管理 - 设备管理器
2. 右侧找到其他设备 - 右键以太网控制器 - 更新驱动程序 - 浏览我的电脑以查找驱动程序
3. 浏览 - 选择 virtio-win-0.1.248/NetKVM/w10/ - 确定
4. 勾选包括子文件夹 - 下一步
5. 等待安装完成

#### 访问共享文件夹

创建好win10虚拟机后，在网络中可以发现TOWER，但是无法打开，提示`Windows无法访问\\TOWER`。

在`组策略`中启用`启用不安全的来宾登录`，即可正常访问，操作方法如下：

1. 按`window+R` 输入 `gpedit.msc` 来启动本地组策略编辑器
2. 依次点击计算机配置 - 管理模板 - 网络 - Lanman工作站
3. 在右侧找到“启用不安全的来宾登录”，双击“启用不安全的来宾登录”，将其状态修改为“已启用”并确定



### 软路由

网卡直通

[OpenWrt Wiki](https://openwrt.org/start)
