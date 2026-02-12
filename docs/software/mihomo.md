# mihomo家族

最后更新时间：2026年2月12日

## 内核演变史

- 原版开源clash：作者Dreamacro，已删库（时间2023.11.03）

- Clash Premium：闭源的clash高级版，和开源clash同作者，已删库，最终版本2023.08.17
  备份下载地址：https://downloads.clash.wiki/ClashPremium

- Clash.Meta：基于开源项目 Clash 的二次开发版本，并增加了一些独有特性；Meta 核心支持clash开源核心的全部特性和 Clash Premium 核心部分特性。在一众clash陆续删库后，Clash.Meta 也于2023-11-06暂时归档了

- mihomo：2023-12-13， Clash.Meta 改名为 mihomo并恢复更新
  项目地址：https://github.com/MetaCubeX/mihomo



目前仍在维护的只有mihomo，不推荐使用其他版本的clash

> [!NOTE] 
>
> **mihomo相关项目地址**
>
> mihomo、metacubexd、Yacd-meta、ClashMetaForAndroid
>
> MetaCubeX的github：https://github.com/MetaCubeX
>
> mihomo docker：https://hub.docker.com/r/metacubex/mihomo



## 套壳工具

|       软件        | Windows | macOS | Linux | Android |  最后更新  | 最终版本 | 作者        |
| :---------------: | :-----: | :---: | :---: | :-----: | :--------: | :------: | ----------- |
|      FlClash      |         |       |   ✅   |    ✅    |  正常更新  |          |             |
|    clash-party    |    ✅    |   ✅   |   ✅   |         |  正常更新  |          |             |
|  Clash Verge Rev  |    ✅    |   ✅   |   ✅   |         |  正常更新  |          |             |
|    Clash Verge    |    ✅    |   ✅   |       |         | 2023.11.03 |  1.3.8   |             |
| clash for windows |    ✅    |   ✅   |       |         | 2023.11.02 | 0.20.39  | Fndroid     |
|  ClashForAndroid  |         |       |       |    ✅    |            |          | Kr328       |
|      ClashX       |         |   ✅   |       |         |            | 1.118.1  | yichengchen |
|    ClashX pro     |         |   ✅   |       |         |            |          |             |

- Clash Verge Rev：Clash Verge的延续，正常更新

  项目地址：https://github.com/clash-verge-rev/clash-verge-rev

- clash-party：正常更新
  项目地址：https://github.com/mihomo-party-org/mihomo-party

- FlClash：正常更新
  项目地址：https://github.com/chen08209/FlClash



## 面板

面板都是纯基于clash的API，所以只能提供基本的配置展示和切换等功能

- Clash Dashboard：作者Dreamacro，已删库
- Yacd：2022年11月停更，最终版本0.38
  项目地址：https://github.com/haishanh/yacd
- Metacubed：正常更新
  项目地址：https://github.com/MetaCubeX/metacubexd



## 插件

openclash：openwrt上的插件，通过web操作，可以增删订阅链接，功能上更加接近桌面客户端

openwrt-Mihomo：

ShellCrash：命令行界面的客户端，https://github.com/juewuy/ShellCrash



## Linux裸核使用

1. 下载并解压内核https://github.com/MetaCubeX/mihomo/releases

   ```
   wget https://github.com/MetaCubeX/mihomo/releases/download/v1.19.20/mihomo-linux-amd64-v1-v1.19.20.gz
   gunzip mihomo-linux-amd64-v1-v1.19.20.gz
   ```

2. 将内核移动到`/usr/local/bin/`并重命名为`mihomo`，给执行权限

   ```
   mv mihomo-linux-amd64-v1-v1.19.20 /usr/local/bin/mihomo
   chmod +x /usr/local/bin/mihomo
   ```

3. 创建存放配置文件`config.yaml`的目录，把配置文件放进去。

   **注意：只能是config.yaml这个文件名，不支持其他名字**

   ```
   mkdir -p ~/data/mihomo
   ```

   配置文件中打开`TUN模式`相关配置

   ```
   tun:
     enable: true
     stack: mixed
     # mtu: 9000
     dns-hijack:
       - "any:53"
       - "tcp://any:53"
     auto-route: true
     auto-redirect: true
     auto-detect-interface: true
     # 排除docker0网卡，避免docker访问流量被tun接管，需要在compose中声明network_mode: bridge
     exclude-interface:
       - "docker0"
   ```

4. 创建`systemd`配置文件，配置开机自启动

   ```
   nano /etc/systemd/system/mihomo.service
   ```

   ```
   [Unit]
   Description=mihomo Daemon, Another Clash Kernel.
   After=network.target NetworkManager.service systemd-networkd.service iwd.service
   [Service]
   Type=simple
   LimitNPROC=500
   LimitNOFILE=1000000
   CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE CAP_SYS_TIME CAP_SYS_PTRACE CAP_DAC_READ_SEARCH CAP_DAC_OVERRIDE
   AmbientCapabilities=CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE CAP_SYS_TIME CAP_SYS_PTRACE CAP_DAC_READ_SEARCH CAP_DAC_OVERRIDE
   Restart=always
   ExecStartPre=/usr/bin/sleep 1s
   ExecStart=/usr/local/bin/mihomo -d ~/data/mihomo
   # ExecStart=[核心目录]/mihomo -d [配置文件目录]
   ExecReload=/bin/kill -HUP $MAINPID
   [Install]
   WantedBy=multi-user.target
   ```

5. 启动`mihomo`服务

   ```
   systemctl daemon-reload # 重载 systemd
   systemctl enable mihomo # 允许 mihomo 开机自启动
   systemctl start mihomo # 立即启动 mihomo
   systemctl status mihomo # 检查 mihomo 的运行状况
   systemctl disable mihomo # 取消 mihomo 开机自启动
   systemctl stop mihomo # 停止 mihomo
   journalctl -u mihomo -f #检查 mihomo 的运行日志
   ```

6. 启用IP转发

   **一键设置**

   ```
   sed -i '/net.ipv4.ip_forward/s/^#//;/net.ipv6.conf.all.forwarding/s/^#//' /etc/sysctl.conf && sysctl -p && systemctl restart networking
   ```

   **手动设置**

   编辑`nano /etc/sysctl.conf`，把下面两个前面的注释去掉，使其生效。

   ```
   net.ipv4.ip_forward=1
   net.ipv6.conf.all.forwarding=1
   ```

   应用更改

   ```
   sysctl -p
   ```

   重启网络

   ```
   systemctl restart networking
   ```
   
7. 到这里就大功告成了，后续可以通过`<ip>:<port>/ui`进入面板来管理订阅和分流



### 为什么要开IP转发

TUN模型下，系统会创建一个虚拟网卡，宿主机的所有网络请求会如下：应用进程 → 宿主路由表 → TUN 接口 → 物理网卡 → 外部网络，从而访问到数据。

而在docker容器中，宿主机会被认为是一个虚拟网卡，也就是：容器进程 → 容器路由表 → 容器虚拟网卡（veth）→ 宿主机网桥（docker0）→ 宿主路由表 → TUN 接口 → 物理网卡 → 外部网络。

如果没有打开ip转发，内核禁止跨接口转发(从docker0->tun0)。所以无法正确访问。

要解决这个问题，要么直接为docker配置系统代理，要么打开ip转发。

### TUN模式导致外网无法访问docker容器服务的方案

故障描述：开启mihomo的tun模式后，无法在外网使用`[公网IP]:[端口]`的方法访问服务器的docker服务

GPT分析：mihomo 开启后改写了路由/iptables（TUN 自动路由），导致回包被送进 tun0 或被 rp_filter 拒收，所以外网 ping 不通、 docker服务也访问失败。

处理方法：

1. 在`config.yaml`中添加如下配置

   ```
   tun:
   	exclude-interface:
    	 - "docker0"
    	 - "br-3136ba4567c"
   ```

2. 在使用 `docker run`，以及在 `compose.yml` 文件中声明了 `network_mode: bridge` 时，容器会连接到 `docker0` 网络

3. 当未声明 `network_mode: bridge` 时，Docker Compose 会为项目自动创建一个默认网络，例如 `br-3136ba4567c`

4. 可以使用`ip addr show`查看本机所有网卡，或使用` docker inspect <container_id> `查看容器正在使用的网络



## 规则转换

### 推荐使用substore

*这里摘取官方仓库的介绍*：

> Advanced Subscription Manager for QX, Loon, Surge, Stash and Shadowrocket.

项目地址：https://github.com/sub-store-org/Sub-Store

官方教程：[Sub-Store 相关教程 (notion.site)](https://xream.notion.site/Sub-Store-abe6a96944724dc6a36833d5c9ab7c87)

Docker compose.yml

```
services:
  sub-store:
    image: xream/sub-store
    container_name: sub-store
    restart: always
    volumes:
      - ./data:/opt/app/data
    environment:
      - SUB_STORE_CRON=0 0 * * *
      - SUB_STORE_FRONTEND_BACKEND_PATH=/2cXaAxRGfddmGz2yx1wA⁠
    ports:
      - "3001:3001"
    stdin_open: true
    tty: true
```

> [important] 使用说明
>
> 通过前端地址 + 后端地址来快速访问面板：http://127.0.0.1:3001?api=http://127.0.0.1:3001/2cXaAxRGfddmGz2yx1wA⁠
>
> 意思是 后端地址为 http://127.0.0.1:3001/2cXaAxRGfddmGz2yx1wA
>
> 简单验证一下 http://127.0.0.1:3001/2cXaAxRGfddmGz2yx1wA/api/utils/env 可以看到版本信息，同样此 URL 也可以作为健康检查的 URL
>
> PS：如果设置了反代，那前后端都要用https



## Clash规则写法规则

1. Vless 规则 (**Meta 内核**) - 包含 TCP(XTLS) 、WS和gRPC 的三种协议。

   ```
   - name: "vless-tcp"
     type: vless
     server: a.xyz
     port: port
     uuid: uuid
     network: tcp
     servername: a.xyz
       
   - name: "vless-ws"
     type: vless
     server: a.xyz
     port: port
     uuid: uuid
     udp: true
     tls: true
     network: ws
     servername: a.xyz
     ws-opts:
       path: /dyxws
       headers:
         Host: a.xyz
   
   - name: "vless-gRPC"
     type: vless
     server: a.xyz
     port: port
     uuid: uuid
     network: grpc
     udp: true
     tls: true
     servername: a.xyz
     grpc-opts:
       grpc-service-name: "dyxgrpc"
     client-fingerprint: chrome
     
   - name: "Vless_TCP/TLS_Vision"
     type: vless
     server: a.xyz
     port: port
     uuid: uuid
     network: tcp
     udp: true
     tls: true
     flow: xtls-rprx-vision
     client-fingerprint: chrome
     
   - name: "Vless_Reality_Vision"
     type: vless
     server: a.xyz
     port: port
     uuid: uuid
     network: tcp
     servername: a.xyz
     flow: xtls-rprx-vision
     udp: true
     tls: true
     reality-opts:
       public-key: publicKey
       short-id: shortid
     client-fingerprint: chrome
     skip-cert-verify: true
   
   - name: "Vless_Reality_gRPC"
     type: vless
     server: a.xyz
     port: port
     uuid: uuid
     network: grpc
     servername: a.xyz
     udp: true
     tls: true
     reality-opts:
       public-key: publicKey
       short-id: shortid
     client-fingerprint: chrome
     skip-cert-verify: true
     grpc-opts:
       grpc-service-name: grpc
   ```

2. Hysteria 规则 (**Meta 内核**)

   ```
   - name: Hysteria
     type: hysteria
     server: a.xyz
     port: port
     auth_str: auth_str
     alpn:
     	- h3
     protocol: udp
     up: '50 Mbps'
     down: '100 Mbps'
   
   - name: Hysteria2
     type: hysteria2
     server: a.xyz
     port: port       # 节点端口，目前暂不支持端口跳跃
     password: password
     sni: a.xyz       # 必应自签证书域名(www.bing.com)或 CA 证书域名
     insecure: false  # 使用自签证书请保持此处为 true，如为 CA 证书建议修改为 false
   ```

3. Tuic 规则 (**Meta 内核**)

   ```
   - name: "Vless_Reality_Tuic"
     type: tuic
     server: a.xyz
     port: port
     uuid: uuid
     password: password
     alpn: 
       - h3
     congestion_controller: bbr
     disable-sni: true
     reduce-rtt: true
     sni: dyx-singbox_tuic
   ```

4. Vmess 规则 - 加密支持auto/aes-128-gcm/chacha20-poly1305/none

   ```
   - name: "vmess"
     type: vmess
     server: a.xyz
     port: port
     uuid: uuid
     alterId: 32
     cipher: auto
   
   - name: "Vmess-ws"
     server: a.xyz
     port: port
     type: vmess
     uuid: uuid
     alterId: 0
     cipher: auto
     udp: true
     tls: true
     skip-cert-verify: true
     servername: "a.xyz"
     network: ws
     ws-opts: 
       path: /dyxvws
       headers: 
         Host: a.xyz
   
   - name: "vmess-h2"
     type: vmess
     server: a.xyz
     port: port
     uuid: uuid
     alterId: 32
     cipher: auto
     network: h2
     tls: true
     h2-opts:
       host:
         - http.example.com
         - http-alt.example.com
       path: /path
     
   - name: "vmess-http"
     type: vmess
     server: a.xyz
     port: port
     uuid: uuid
     alterId: 32
     cipher: auto
    
   - name: "vmess-gRPC"
     server: a.xyz
     port: port
     type: vmess
     uuid: uuid
     alterId: 32
     cipher: auto
     network: grpc
     tls: true
     servername: a.xyz
     grpc-opts:
       grpc-service-name: "example"
   ```

5. Trojan 规则

   ```
   - name: "trojan"
     type: trojan
     server: a.xyz
     port: port
     password: password
     udp: true
     sni:a.xyz
     alpn:
     	- http/1.1
     skip-cert-verfy: true
    
   - name: "trojan-gRPC"
     server: a.xyz
     port: port
     type: trojan
     password: password
     network: grpc
     sni: a.xyz
     udp: true
     grpc-opts:
       grpc-service-name: "dyxtrojangrpc"
    
   - name: "trojan-ws"
     server: a.xyz
     port: port
     type: trojan
     password: password
     network: ws
     sni: a.xyz
     udp: true
     ws-opts:
       path: /path
       headers:
         Host: a.xyz
   ```

6. Shadowsocks 规则

   ```
   # 加密支持:
   #   aes-128-gcm aes-192-gcm aes-256-gcm
   #   aes-128-cfb aes-192-cfb aes-256-cfb
   #   aes-128-ctr aes-192-ctr aes-256-ctr
   #   rc4-md5 chacha20-ietf xchacha20
   #   chacha20-ietf-poly1305 xchacha20-ietf-poly1305
   # 【Meta专属】支持SS2022加密：
   #   2022-blake3-aes-128-gcm
   #   2022-blake3-aes-256-gcm
   #   2022-blake3-chacha20-poly1305
   
   - name: "ss1"
     type: ss
     server: a.xyz
     port: port
     cipher: chacha20-ietf-poly1305
     password: "password"
    
   - name: "ss2"
     type: ss
     server: a.xyz
     port: port
     cipher: chacha20-ietf-poly1305
     password: "password"
     plugin: obfs
     plugin-opts:
       mode: tls # or http
       # host: bing.com
    
   - name: "ss3"
     type: ss
     server: a.xyz
     port: port
     cipher: chacha20-ietf-poly1305
     password: "password"
     plugin: v2ray-plugin
     plugin-opts:
   ```

7. socks5 规则

   ```
   - name: "socks"
     type: socks5
     server: a.xyz
     port: port
   ```

8. HTTP 规则

   ```
   - name: "http"
     type: http
     server: a.xyz
     port: port
     # headers:         #【Meta专属】
     #   X-T5-Auth: "1962xxxxx709"
     #   User-Agent: "okhttp/3.11.0 Dalvik/2.1.0 ...... "
   ```

9. Snell 规则

   ```
   - name: "snell"      # 不支持UDP
     type: snell
     server: a.xyz
     port: port
     psk: psk
     # version: 2
     # obfs-opts:
       # mode: http # or tls
       # host: bing.com
   ```

## 范例YAML文件




https://github.com/blackmatrix7/ios_rule_script/issues/1268

去除了IP-ASN后的blackmatrix7规则：https://github.com/ericz15/ios_rule_script