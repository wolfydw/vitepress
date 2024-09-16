# ddns-go介绍

自动获得你的公网 IPv4 或 IPv6 地址，并解析到对应的域名服务。

github：https://github.com/jeessy2/ddns-go

# MacOS中搭建

1. 从 [Releases](https://github.com/jeessy2/ddns-go/releases) 下载并解压，将其中的ddns-go文件放入`~/data`目录。
   一键命令如下

   ```
   wget https://github.com/jeessy2/ddns-go/releases/download/v6.7.0/ddns-go_6.7.0_linux_x86_64.tar.gz
   tar -xzvf ddns-go_6.7.0_linux_x86_64.tar.gz
   ```
2. 进入安装目录

   ```
   cd ~/data
   ```

3. 安装服务

   ```
   sudo ./ddns-go -s install
   ```

4. 进入web配置页面：http://127.0.0.1:9876
5. 卸载服务

   ```
   sudo ./ddns-go -s uninstall