## 背景

目前mtphoto部署在macmini上，导致macmini的硬盘吃紧

quest2激活需要科学上网环境，需要一个openwrt

所以打算布置一台小主机

## 解决方案

### CPU选择

通过查询benchmark分数：[PassMark - CPU Benchmarks - List of Benchmarked CPUs](https://www.cpubenchmark.net/cpu_list.php)

N100：5522

N305：10089

选择购买中柏N305

内存：插槽一个，支持笔记本DDR4 3200

硬盘：两个插槽，分别支持M.2 nvme PCie3.0 SSD，或SATA 2.5寸 

接口：USB3.2×5/USB2.0×1/耳机接口×1/以太网卡x2/HDMIx 1/DPx 1/Type-Cx1/MicroSD读卡器x1



### 系统选择

Unraid

**官方版**

https://unraid.net

试用30天 正版折扣码 大鹏YYDS



**开心版**

官网版本相比区别

1. 免费
2. 替换了官方的NTP服务器为国内可正常访问的NTP服务器，默认时区也改为中国北京
3. 默认简体中文界面，集成 English, 繁体中文, 简体中文 方便大陆和港澳台用户使用
4. 集成大量常用插件上手更加简单

下载：[UNRAID 6.11.5 中文集成常用插件开心版 - 米多贝克&米多网络工程 (mi-d.cn)](https://mi-d.cn/4293)



### 部署容器

- mtphoto
- mtphoto ai
- mtphoto deepface



## Unraid教程

### 参考教程

[系统安装，序列建立，共享设置——司波图 UNRAID 陪玩教程 01 (youtube.com)](https://www.youtube.com/watch?v=Y3rwrqzrYk0&list=PL1yJe5g-wSuFCRCVaD7FS8OvgOV7Yppxn&index=2)

### 系统安装

1. Unraid是U盘启动，参考官方版或者开心版里面的安装教程就可以
2. 到bios里关闭fast boot相关的设置项
3. U盘尽量使用USB2接口，USB3容易发热，影响U盘稳定性
4. 进入网页GUI后，先设置NTP，系统时间不对无法申请到试用key
5. 到`APPS`里搜索`简体中文语言包`安装，

### 系统使用

安装完成后在浏览器输入ip，或 http://tower.loacl 登陆到Unraid的图形界面管理

### docker代理

国内屏蔽docker.hub，需要自建代理

1. 自建docker镜像：[GitHub - dqzboy/Docker-Proxy](https://github.com/dqzboy/Docker-Proxy?tab=readme-ov-file)

2. npm反向代理，我这里是`https://hub.ydw.cool`
   为确保代理依旧存活，可以在终端使用`crul -I https://hub.ydw.cool`进行检测
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

4. 重启docker让设置生效。在SETTINGS(设置）=>Docker，先关闭docker，然后再启用docker，即先将docker 设置为 no, apply ,再设置 为yes, apply

5. 用`docker info`命令检查是否修改成功，如出现以下代码说明修改成功
   ```
    Registry Mirrors:
     https://hub.ydw.cool/
   ```

   

### 支持NTFS和exFAT

安装`Unassigned Devices` 和 `Unassigned Devices Plus`插件

> 参考资料
>
> [unraid docker加速-修改unraid docker的镜像源（含国内网易等镜像源） - UnRaid - 我爱帮助网 (52help.net)](https://www.52help.net/unraid/251.mhtml)
>
> 

### 软路由

网卡直通

[OpenWrt Wiki](https://openwrt.org/start)
