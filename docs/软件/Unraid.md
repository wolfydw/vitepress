## 背景

目前mtphoto部署在macmini上，导致macmini的硬盘吃紧

quest2激活和使用需要科学上网环境，需要一个旁路由

所以打算布置一台小主机

## 解决方案

### CPU选择

通过查询benchmark分数：[PassMark - CPU Benchmarks - List of Benchmarked CPUs](https://www.cpubenchmark.net/cpu_list.php)

N100：5522

N305：10089

选择购买中柏N305

> 配置如下
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

试用30天，正版折扣码 大鹏YYDS

**开心版**

下载：[UNRAID 6.11.5 中文集成常用插件开心版 - 米多贝克&米多网络工程 (mi-d.cn)](https://mi-d.cn/4293)

> 官网版本相比区别
>
> 1. 免费
> 2. 替换了官方的NTP服务器为国内可正常访问的NTP服务器，默认时区也改为中国北京
> 3. 默认简体中文界面，集成 English, 繁体中文, 简体中文 方便大陆和港澳台用户使用
> 4. 集成大量常用插件上手更加简单

**闲鱼破解版**

自行搜索，参考价19.9元



## Unraid初始化设置

### 参考教程

[系统安装，序列建立，共享设置——司波图 UNRAID 陪玩教程 01 (youtube.com)](https://www.youtube.com/watch?v=Y3rwrqzrYk0&list=PL1yJe5g-wSuFCRCVaD7FS8OvgOV7Yppxn&index=2)

### 系统安装

1. Unraid是U盘启动，参考官方版或者开心版里面的安装教程就可以
2. 到bios里关闭fast boot相关的设置项
3. U盘尽量使用USB2接口，USB3容易发热，影响U盘稳定性
4. 进入网页GUI后，先设置NTP，系统时间不对无法申请到试用key
5. 到`APPS`里搜索`简体中文语言包`安装，

### 系统使用

安装完成后在浏览器输入ip，或 http://tower.local 登陆到Unraid的图形界面管理



> [!WARNING]持久化数据
>
> 由于 Unraid 是运行在内存中的系统，只有存储盘和 U 盘能够持久化数据，因此，存放在系统其他位置（如 /etc、/tmp 等目录）的数据在系统重启后会被清空。
>
> unraid默认的docker持久化目录是/mnt/user/appdata/



## Unraid推荐安装

### 部署mtphoto系列容器

- mtphoto
- mtphoto ai
- mtphoto deepface

参考官方教程



### 安装clash

下载config.yaml到持久化目录

```
wget "机场给你的订阅链接" -O config.yaml
```



项目地址：

```
version: '3'

services:
  # Clash
  clash:
    image: dreamacro/clash:latest
    container_name: clash
    volumes:
      - ./config.yaml:/root/.config/clash/config.yaml
    ports:
      - "7890:7890/tcp"
      - "7890:7890/udp"
      - "9090:9090"
    restart: always

  yacd:
    image: ghcr.io/haishanh/yacd:master
    container_name: yacd
    ports:
      - "1234:80"
    restart: always
```







本镜像封装了 Clash 及 Clash Dashboard

项目地址：https://hub.docker.com/r/centralx/clash

缺点：Clash Dashboard不支持添加/修改订阅

```
version: '3.8'

services:
  clash:
    image: centralx/clash:1.18.0
    container_name: clash
    ports:
      - "1234:80"
      - "7890:7890"
    volumes:
      - "./config.yaml:/home/runner/.config/clash/config.yaml"
    restart: unless-stopped
```



#### 使用curl测试代理服务器正常工作

```
curl -I -x http://192.168.0.105:7890 https://www.google.com
```
正常情况下应该输出
1.	HTTP/1.1 200 Connection established：
这个表示代理服务器已经成功建立了与目标服务器（Google）的连接。
2.	HTTP/2 200：
表示 Google 服务器返回了一个成功的响应。
3.	响应头：
包含了 Google 服务器的各种 HTTP 头信息，如内容类型、缓存控制、cookie 等。



### 拉不下docker怎么办？

#### 方法一：设置docker pull走代理

1. 打开终端输入以下命令，也可以手动 `nano /etc/docker/daemon.json`

	```
	mkdir -p /etc/docker;
	tee /etc/docker/daemon.json <<- EOF
	{
	  "proxies": {
	    "http-proxy": "http://192.168.0.105:7890",
	    "https-proxy": "http://192.168.0.105:7890",
	    "no-proxy": "localhost,127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"
	  }
	}
	```

2. 重启docker让设置生效

	```
	/etc/rc.d/rc.docker restart
	```

3. 用`docker info`命令检查是否修改成功，如出现以下代码说明修改成功
   ```
   HTTP Proxy: http://192.168.0.105:7890
   HTTPS Proxy: http://192.168.0.105:7890
   No Proxy: localhost,127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16
   ```

   

#### 方法二：使用docker镜像源

国内屏蔽docker.hub，需要自建镜像

1. 自建docker镜像：[GitHub - dqzboy/Docker-Proxy](https://github.com/dqzboy/Docker-Proxy?tab=readme-ov-file)

2. npm反向代理，我这里是`https://hub.ydw.cool`
   为确保代理依旧存活，可以在终端使用`curl -I https://hub.ydw.cool`进行检测
   出现以下代码表示代理正常

   ```
   HTTP/2 200 
   server: openresty
   date: Tue, 23 Jul 2024 03:51:50 GMT
   cache-control: no-cache
   x-served-by: hub.ydw.cool
   ```

3. 打开unraid的`terminal`粘贴以下代码，回车
   ```
   mkdir -p /etc/docker
   tee /etc/docker/daemon.json <<-'EOF'
   {
   "registry-mirrors": ["https://hub.ydw.cool"]
   }
   EOF
   ```

    1）第一行代码是创建一个 /etc/docker 目录
    2）添加一个 daemon.json 的文件并填写以下参数内容

4. 重启docker让设置生效

   ```
   /etc/rc.d/rc.docker restart
   ```

   也可以在设置中手动重启：
   在SETTINGS(设置）=>Docker，先关闭docker，然后再启用docker，即先将docker 设置为 no, apply ,再设置 为yes, apply

5. 用`docker info`命令检查是否修改成功，如出现以下代码说明修改成功
   ```
    Registry Mirrors:
     https://hub.ydw.cool/
   ```

### 让建立的docker容器走代理

```
version: '3'
services:
  your-service:
    image: your-docker-image
    environment:
      - HTTP_PROXY=http://192.168.0.105:7890
      - HTTPS_PROXY=http://192.168.0.105:7890
```



### 支持NTFS和exFAT

安装`Unassigned Devices` 和 `Unassigned Devices Plus`插件

> 参考资料
>
> [unraid docker加速-修改unraid docker的镜像源（含国内网易等镜像源） - UnRaid - 我爱帮助网 (52help.net)](https://www.52help.net/unraid/251.mhtml)



### win10虚拟机访问共享文件夹

创建好win10虚拟机后，在网络中可以发现TOWER，但是无法打开，提示`Windows无法访问\\TOWER`。

在`组策略`中启用`启用不安全的来宾登录`，即可正常访问，操作方法如下：

按`window+R` 输入 `gpedit.msc` 来启动本地组策略编辑器。依次点击计算机配置-管理模板-网络-Lanman工作站，在右侧找到“启用不安全的来宾登录”，双击“启用不安全的来宾登录”，将其状态修改为“已启用”并确定。

### 软路由

网卡直通

[OpenWrt Wiki](https://openwrt.org/start)
