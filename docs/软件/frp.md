## 简介
最好的内网穿透工具，没什么好解释的了

github：https://github.com/fatedier/frp

中文文档：https://gofrp.org/zh-cn/

## 安装frps
克隆源码并给权限
```
chmod +x ./frps
```

**编辑frps.toml，写入以下内容**

```
bindPort = 7000 # 与frpc.toml中的serverPort保持一致
vhostHTTPPort = 8080
```

> 服务器端配置解释：
>
> 1. **bindPort (7000)**: 这个端口用于 FRP 服务器端和客户端之间的通信。也就是说，FRP 客户端需要将其 `serverPort` 设置为此端口来连接到 FRP 服务器。
>
> 2. **vhostHTTPPort (8080)**: 这个端口用于处理所有通过 HTTP 协议转发的请求。如果您在 FRP 客户端配置中使用了 `type` 为 `"http"` 的代理，并设置了 `customDomains`，这些 HTTP 请求将通过此端口进行路由。

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
type = "tcp"
localPort = 8063
remotePort = 9001  # 指定远程端口，客户端连接此端口将被转发到 localPort
```
**运行frpc**
```
./frpc -c frpc.toml  
```

## 如何在 FRP 中为 TCP 代理启用 TLS

FRP 支持通过 TLS 加密 TCP 连接，这可以在 FRP 配置文件中设置。以下是如何在 FRP 客户端和服务器端配置 TLS 的基本步骤：

**服务器端配置**

在 FRP 服务器配置文件（通常是 `frps.ini`）中，您需要启用 TLS 支持并提供 TLS 相关的配置。这通常包括指定证书文件和密钥文件的路径：

```
bind_port = 7000
vhostHTTPPort = 8080
# 启用 TLS 加密
tls_enable = true
# 指定 TLS 证书和密钥
tls_cert_file = /path/to/cert.pem
tls_key_file = /path/to/key.pem
```

**客户端配置**

在 FRP 客户端配置文件（通常是 `frpc.ini`）中，您同样需要指出连接应使用 TLS：

```
server_addr = "xx.xx.xx.xx"
server_port = 7000
# 启用 TLS 连接
tls_enable = true

[[proxies]]
name = "web"
type = "tcp"
local_port = 8063
remote_port = 9001
```

**注意事项**

1. **证书和密钥**：确保您已经在服务器上配置了有效的 TLS 证书和私钥。这些证书可以是自签名的，也可以是由证书颁发机构 (CA) 颁发的。对于生产环境，推荐使用由可信 CA 颁发的证书。
2. **端口配置**：TLS 加密不改变端口的使用方式，所以您在 `remote_port` 中指定的端口应确保在服务器上是开放的，并适当配置了防火墙规则。
3. **性能考虑**：TLS 加密会稍微增加 CPU 负载，因为加解密操作需要额外的计算资源。确保服务器有足够的资源来处理加密的通信。

通过以上设置，您可以安全地通过公共网络传输 TCP 流量，确保数据的安全性和完整性。如果您有更高的安全要求，确保 FRP 的最新版本支持您需要的所有 TLS 特性，并持续关注安全更新和修补程序。



## 出错的解决方案

### 排查流程
1. systemctl status frps，查看 frps 服务的状态信息，包括是否正在运行、启动日志等
2. netstat -tuln | grep 7000，检查7000端口是否被监听

### exec format error
这个错误意味着你尝试运行的二进制文件不兼容你的操作系统架构，重新下载正确的版本就可以，一般来说小鸡都是linxu amd64构架，M系列的mac是darwin构架
