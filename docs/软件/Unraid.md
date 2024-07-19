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

Unraid是U盘启动，参考开心版里面的教程就可以

### 系统使用

安装完成后在浏览器输入ip登陆到Unraid的图形界面管理

### 软路由

网卡直通

[OpenWrt Wiki](https://openwrt.org/start)
