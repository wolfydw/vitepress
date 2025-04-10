最后更新时间：2025年4月8日

当前最新版为：0.61.2

等待补充的内容

- frp各种配置方式

## 简介

最好的内网穿透工具，没什么好解释的了

github：https://github.com/fatedier/frp

中文文档：https://gofrp.org/zh-cn/

dockerhub：https://hub.docker.com/r/snowdreamtech/frpc



## 下载FRP程序

1. 下载符合操作系统 / 硬件架构的 frp 文件版本

   解压后将 frps 复制到服务器，将 frpc 复制到客户端

```
wget https://github.com/fatedier/frp/releases/download/v0.60.0/frp_0.60.0_linux_amd64.tar.gz
tar -xzvf frp_0.60.0_linux_amd64.tar.gz
```

> [!important]
>
> **如何选择文件版本？**
>
> frp文件名结构为 `程序名称_版本号_操作系统_硬件架构` ，例如你有一台运行在arm64架构的安卓系统，则应该下载 frp_0.60.0_android_arm64.tar.gz
>
> 我们可以使用 `uname` 查询当前设备的操作系统，使用 `uname -m` 查询当前设备的硬件架构，例如
>
> ```
> root@Tower:~# uname
> Linux
> root@Tower:~# uname -m
> x86_64
> ```
>
> 根据输出结果，我这台机器应该使用 frp_0.60.0_linux_amd64.tar.gz

> [!tip]
>
> **无法访问GitHub时，可以通过国内版gitee拉取frp**
>
> 项目地址：https://gitee.com/deng-meiqing/frp/releases/

2. 编写配置文件（具体见后文）

3. 给运行权限
   ````
   chmod +x ./frps
   chmod +x ./frpc
   ````



官方教程：https://gofrp.org/zh-cn/docs/setup/



## 编辑配置文件

目前支持的配置文件格式包括 TOML / YAML / JSON，旧的 INI 格式仍然支持，但已经不再推荐。

### 简易配置

```
# frps.toml 简易配置
bindPort = 7000 
vhostHTTPPort = 8080
```

> [!note]
>
> **服务器端配置解释**
>
> **bindPort** ：这个端口用于 FRP 服务器端和客户端之间的通信。
>
> **vhostHTTPPort** ：这个端口用于处理所有通过 HTTP 协议转发的请求。如果您在 FRP 客户端配置中使用了 `type` 为 `"http"` 的代理，并设置了 `customDomains`，这些 HTTP 请求将通过此端口进行路由。

```
# frpc.toml 简易配置
serverAddr = "x.x.x.x" # 服务器ip
serverPort = 7000 # 与frps.toml中的bindPort保持一致

[[proxies]]
name = "web"
type = "http"
localPort = 8063
customDomains = ["www.yourdomain.com"] # DNS解析至服务器ip

[[proxies]]
name = "web2"
type = "tcp"
localPort = 8063
remotePort = 9001  # 指定远程端口，客户端连接此端口将被转发到 localPort
```

采用以上配置实现了http和tcp转发

将`www.yourdomain.com`域名的DNS解析至frps所在服务器后，当你访问`www.yourdomain.com:8080`，会转发至客户端的8063端口；

访问`www.yourdomain.com:9091`，会转发至客户端的8063端口。



### 开启网页管理面板

```
# frps.toml 开启网页管理面板
webServer.addr = "0.0.0.0"
webServer.port = 7500
webServer.user = "user"
webServer.password = "password"
```



### 开启 token 验证

```
# frps.toml 开启token验证
auth.method = "token"
auth.token = "xxxxxxxxxx"
```



想学习更多配置方案，可以参考官方完整配置文件：https://github.com/fatedier/frp?tab=readme-ov-file#configuration-files



## 启动FRP

### 常见的几种启动方式对比

| **启动方式**   | **特点描述**                                                 |
| -------------- | ------------------------------------------------------------ |
| ./frpc         | **前台启动**，终端关闭或中断（Ctrl+C）后程序会退出           |
| nohup ./frpc & | **后台启动**，终端关闭后程序继续运行，不受挂起影响           |
| screen / tmux  | **伪终端启动**，可进入/退出后台运行环境，适合长时间运行调试  |
| Systemd 服务   | **系统服务启动**，可配置开机自启、失败重启（Unraid 不支持 systemd） |
| Docker 运行    | **容器启动**，可自动管理、隔离运行环境，推荐用于 Unraid      |

### 前台启动

````
./frps -c ./frps.toml
./frpc -c ./frpc.toml
````

### 后台启动（可用于unraid）

```
nohup ./frpc -c ./frpc.toml > frpc.log 2>&1 &
```

log 文件默认保存在当前目录下

### 后台启动管理脚本

**脚本运行预览**

```
========= frpc 管理菜单 =========
当前配置: frpc-miao
1) 启动 frpc
2) 停止 frpc
3) 重启 frpc
4) 查看 frpc 状态
5) 查看 frpc 日志
6) 切换配置文件
7) 设置开机自启
8) 退出
================================
```



**脚本使用说明**

1. `nano frpc-manager.sh` ，粘贴以下内容

```
#!/bin/bash

# FRP路径，FRP程序、toml配置、log文件均保存在这里
FRP_DIR="/mnt/user/appdata/frp"
FRPC_BIN="$FRP_DIR/frpc"
# 将configs定义为全局变量
configs=()
CONFIG_FILE=""
CONFIG_NAME=""
LOG_FILE=""
PID_FILE=""

# 检查frpc程序是否存在
function check_frpc() {
    if [ ! -f "$FRPC_BIN" ]; then
        echo "错误: frpc可执行文件不存在于 $FRPC_BIN"
        exit 1
    fi
}

function list_configs() {
    echo "可用配置文件："
    
    # 检查是否存在toml配置文件
    if [ ! "$(ls $FRP_DIR/*.toml 2>/dev/null)" ]; then
        echo "未找到配置文件，请确保$FRP_DIR目录下有.toml配置文件"
        return 1
    fi
    
    configs=($FRP_DIR/*.toml)
    for i in "${!configs[@]}"; do
        echo "$((i+1))) $(basename "${configs[$i]}")"
    done
    return 0
}

function select_config() {
    if ! list_configs; then
        return 1
    fi
    
    read -p "请输入要操作的配置文件序号: " index
    
    # 检查输入是否为数字
    if ! [[ "$index" =~ ^[0-9]+$ ]]; then
        echo "错误: 请输入数字"
        return 1
    fi
    
    # 检查范围
    if [ "$index" -lt 1 ] || [ "$index" -gt "${#configs[@]}" ]; then
        echo "错误: 请输入1到${#configs[@]}之间的数字"
        return 1
    fi
    
    CONFIG_FILE="${configs[$((index-1))]}"
    CONFIG_NAME=$(basename "$CONFIG_FILE" .toml)
    LOG_FILE="$FRP_DIR/${CONFIG_NAME}.log"
    PID_FILE="/tmp/frpc_${CONFIG_NAME}.pid"
    echo "已选择: $CONFIG_NAME"
    return 0
}

function switch_config() {
    echo "当前配置: $CONFIG_NAME"
    if select_config; then
        echo "已切换到配置: $CONFIG_NAME"
    fi
}

function start_frpc() {
    if [ -z "$CONFIG_FILE" ]; then
        echo "错误: 未选择配置文件"
        return 1
    fi
    
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo "frpc 已在运行，PID: $(cat $PID_FILE)"
        return 0
    fi
    
    echo "正在启动 frpc..."
    nohup "$FRPC_BIN" -c "$CONFIG_FILE" > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    echo "frpc 已启动，使用配置文件 $CONFIG_NAME.toml，PID: $(cat $PID_FILE)"
}

function stop_frpc() {
    if [ -z "$CONFIG_FILE" ]; then
        echo "错误: 未选择配置文件"
        return 1
    fi
    
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 "$PID" 2>/dev/null; then
            kill "$PID"
            echo "已停止 frpc ($PID)"
        else
            echo "进程已不存在"
        fi
        rm -f "$PID_FILE"
    else
        echo "未找到 PID 文件，frpc 未运行或异常退出"
    fi
}

function restart_frpc() {
    if [ -z "$CONFIG_FILE" ]; then
        echo "错误: 未选择配置文件"
        return 1
    fi
    
    echo "重启 frpc..."
    
    # 停止当前选择的配置
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 "$PID" 2>/dev/null; then
            kill "$PID"
            echo "已停止 frpc ($PID)"
        fi
        rm -f "$PID_FILE"
    fi
    
    # 等待进程结束
    sleep 1
    
    # 使用相同的配置启动
    echo "正在启动 frpc..."
    nohup "$FRPC_BIN" -c "$CONFIG_FILE" > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    echo "frpc 已重启，使用配置文件 $CONFIG_NAME.toml，PID: $(cat $PID_FILE)"
}

function status_frpc() {
    if [ -z "$CONFIG_FILE" ]; then
        echo "错误: 未选择配置文件"
        return 1
    fi
    
    echo "当前配置: $CONFIG_NAME"
    
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo "frpc 正在运行，PID: $(cat $PID_FILE)"
        echo "配置文件: $CONFIG_FILE"
        echo "日志文件: $LOG_FILE"
    else
        echo "frpc 未运行"
    fi
}

function view_log() {
    if [ -z "$CONFIG_FILE" ]; then
        echo "错误: 未选择配置文件"
        return 1
    fi
    
    if [ ! -f "$LOG_FILE" ]; then
        echo "日志文件不存在: $LOG_FILE"
        return 1
    fi
    
    echo "正在显示日志文件：$LOG_FILE (最后20行，按Ctrl+C退出)"
    echo "-----------------------------"
    tail -n 20 -f "$LOG_FILE"
    # 注意：tail -f 会阻塞，用户需要按Ctrl+C退出
}

function enable_autostart() {
    echo "在 Unraid 上启用自启可通过 User Scripts 插件添加此脚本到启动项。"
    echo "建议步骤："
    echo "1. 安装 User Scripts 插件"
    echo "2. 在插件中创建新脚本"
    echo "3. 粘贴以下内容到脚本中 (自动启动所有配置):"
    echo ""
    echo "#!/bin/bash"
    echo "FRP_DIR=\"/mnt/user/appdata/frp\""
    echo "FRPC_BIN=\"\$FRP_DIR/frpc\""
    echo "for config in \$FRP_DIR/*.toml; do"
    echo "  name=\$(basename \"\$config\" .toml)"
    echo "  nohup \"\$FRPC_BIN\" -c \"\$config\" > \"\$FRP_DIR/\$name.log\" 2>&1 &"
    echo "  echo \$! > \"/tmp/frpc_\$name.pid\""
    echo "  echo \"已启动 frpc: \$name\""
    echo "done"
    echo ""
    echo "4. 将脚本设置为在系统启动时运行"
}

# 主菜单
function main_menu() {
    # 检查frpc程序是否存在
    check_frpc
    
    # 在脚本开始时选择配置文件
    select_config || exit 1
    
    while true; do
        echo ""
        echo "========= frpc 管理菜单 ========="
        echo "当前配置: $CONFIG_NAME"
        echo "1) 启动 frpc"
        echo "2) 停止 frpc"
        echo "3) 重启 frpc"
        echo "4) 查看 frpc 状态"
        echo "5) 查看 frpc 日志"
        echo "6) 切换配置文件"
        echo "7) 设置开机自启"
        echo "8) 退出"
        echo "================================"
        read -p "请选择操作: " choice

        case $choice in
            1) start_frpc ;;
            2) stop_frpc ;;
            3) restart_frpc ;;
            4) status_frpc ;;
            5) view_log ;;
            6) switch_config ;;
            7) enable_autostart ;;
            8) echo "退出脚本"; exit 0 ;;
            *) echo "无效选择，请重新输入" ;;
        esac
    done
}

# 启动主菜单
main_menu
```

2. 给执行权限

```
chmod +x frpc-manager.sh
```

3. 运行脚本

```
./frpc-manager.sh
```



## 高级使用技巧

### 使用 systemd 开机自启动

> 在 Linux 系统下，使用 `systemd` 可以方便地控制 frps 服务端的启动、停止、配置后台运行以及开机自启动

**安装 systemd**

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
# 当服务因非正常退出时，自动尝试重启服务
Restart = on-failure
RestartSec=3

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

**也可以使用 systemd 管理 frpc 服务，设置方法同上**



### 设置 BasicAuth 鉴权

由于所有客户端共用一个 frps 的 HTTP 服务端口，任何知道你的域名和 URL 的人都能访问到你部署在内网的服务，但是在某些场景下需要确保只有限定的用户才能访问。

frp 支持通过 HTTP Basic Auth 来保护你的 web 服务，使用户需要通过用户名和密码才能访问到你的服务。

该功能目前仅限于 HTTP 类型的代理，需要在 frpc 的代理配置中添加用户名和密码的设置。

```
# frpc.toml

[[proxies]]
name = "web"
type = "http"
localPort = 80
customDomains = ["test.yourdomain.com"]
httpUser = "abc"
httpPassword = "abc"
```

通过浏览器访问 `http://test.yourdomain.com`，需要输入配置的用户名和密码才能访问。



### 如何在 FRP 中为 TCP 代理启用 TLS

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

1. 确认 frpc 和 frps 的版本是否一致
   **Docker**

   ```
   docker exec -it <容器号> frpc -v
   ```

2. 检查日志
   **Docker**

   ```
   docker logs <容器号>
   ```

   **systemd 服务**

   ```
   journalctl -u frps -f
   ```

3. systemctl status frps，查看 frps 服务的状态信息，包括是否正在运行、启动日志等

4. netstat -tuln | grep 7000，检查7000端口是否被监听

### exec format error
这个错误意味着你尝试运行的二进制文件不兼容你的操作系统架构，重新下载正确的版本就可以，一般来说小鸡都是linxu amd64构架，M系列的mac是darwin构架
