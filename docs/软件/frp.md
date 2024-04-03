## 简介
最好的内网穿透工具，没什么好解释的了

github：https://github.com/fatedier/frp

中文文档：https://gofrp.org/zh-cn/

## 安装frps
克隆源码并给权限
```
chmod +x ./frps
```

**安装systemd**
```
apt install systemd
```

**在 /etc/systemd/system/ 创建 frps.service 文件**
```
nano /etc/systemd/system/frps.service
```
**写入以下内容**
```
[Unit]
# 服务名称，可自定义
Description = frp server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /path/to/frps -c /path/to/frps.toml

[Install]
WantedBy = multi-user.target
```

**使用 systemd 命令管理 frps 服务**
```
# 启动frp
sudo systemctl start frps
# 停止frp
sudo systemctl stop frps
# 重启frp
sudo systemctl restart frps
# 查看frp状态
sudo systemctl status frps
```

**设置 frps 开机自启动**
```
sudo systemctl enable frps
```

## 安装frpc
**下载 frpc 和 frpc.toml，并给权限**
```
chmod +x ./frpc
```
**编辑 frpc.toml**
```
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "web"
type = "http"
localPort = 80
customDomains = ["www.yourdomain.com"]

[[proxies]]
name = "web2"
type = "http"
localPort = 8080
customDomains = ["www.yourdomain2.com"]
```
**运行frpc**
```
./frpc -c frpc.toml  
```

## 出错的解决方案
### 排查流程
1. systemctl status frps，查看 frps 服务的状态信息，包括是否正在运行、启动日志等
2. netstat -tuln | grep 7000，检查7000端口是否被监听

### exec format error
这个错误意味着你尝试运行的二进制文件不兼容你的操作系统架构，重新下载正确的版本就可以，一般来说小鸡都是linxu amd64构架，M系列的mac是darwin构架
