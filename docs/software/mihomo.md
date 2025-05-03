先介绍一下什么是`mihomo`:

> `Mihomo`原名`Clash Meta`，是基于广受欢迎的开源网络代理工具Clash开发的增强网络代理工具。它不仅继承了Clash的核心功能，还增加了一些独特的特性，如支持更多的出站传输协议和复杂的规则控制等。在2023年经历了Clash for Windows删库事件之后，原Clash项目删库停止更新，于是开发者将Clash Meta改名为Mihomo，继续进行维护和更新。

所以，曾经使用过clash的应该可以很快上手。

[mihomo项目地址](https://github.com/MetaCubeX/mihomo)

在本篇文章中，将会使用`mihomo`内核来进行代理，同时还会打开`TUN模式`实现透明代理。如有需要请接着往下看吧。

# mihomo安装和配置

## 下载mihomo内核

1. 进入[mihomo内核下载地址](https://github.com/MetaCubeX/mihomo/releases)去下载对应架构版本的文件。比如`mihomo-linux-amd64-alpha-b3db113.gz`，解压后将`mihomo-linux-amd64`上传到虚拟机上，同时重命名为`mihomo`。

   > 如果访问不到github的话，这里提供一个[mihomo-linux-amd64-go120-v1.19.1.gz](https://alist.zfxt.top/d/蓝凑云/共享/mihomo/mihomo-linux-amd64-go120-v1.19.1.gz?sign=H0VObVi3hBJmGZswu0tiuFIVWTA3GhIAyBtP_VSffWU=:0)

2. 给 mihomo 增加执行权限：

   ```
   shell
   sudo chmod +x mihomo
   ```

3. 将`mihomo`移动到`/usr/local/bin/`目录

   ```
   shell
   sudo cp mihomo /usr/local/bin
   ```

4. 创建运行目录

   ```
   shell
   sudo mkdir /etc/mihomo -p
   ```

## 配置运行环境

将下面的一键压缩包解压到`/etc/mihomo`的目录下