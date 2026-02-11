# Clash生态解析

最后更新时间：2024年11月24日

## Clash相关项目汇总

**内核**

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



**套壳工具**

- ClashX：MAC平台，作者yichengchen，已删库，最终版本1.118.1

- ClashX pro：MAC平台，已删库

- ClashForAndroid：作者Kr328，已删库

- clash for windows：闭源软件，作者Fndroid，已删库（时间2023.11.02），最终版本 0.20.39

  备份下载地址：https://archive.org/download/clash_for_windows_pkg

- Clash Verge：已归档（时间2023.11.03），最终版本1.3.8
  项目地址：https://github.com/zzzgydi/clash-verge

- Clash Verge Rev：Clash Verge的延续，正常更新
  
  项目地址：https://github.com/clash-verge-rev/clash-verge-rev
  
- mihomo-party：正常更新
  项目地址：https://github.com/mihomo-party-org/mihomo-party

**面板**

面板都是纯基于clash的API，所以只能提供基本的配置展示和切换等功能

- Clash Dashboard：作者Dreamacro，已删库
- Yacd：2022年11月停更，最终版本0.38
  项目地址：https://github.com/haishanh/yacd
- Metacubed：正常更新
  项目地址：https://github.com/MetaCubeX/metacubexd

**插件**

openclash：openwrt上的插件，通过web操作，可以增删订阅链接，功能上更加接近桌面客户端

openwrt-Mihomo：

ShellCrash：命令行界面的客户端，https://github.com/juewuy/ShellCrash



参考资料：[翻墙用户必看：2024年利器 Clash 生态圈全解析 (youtube.com)](https://www.youtube.com/watch?v=tmSsPuylqB0)



## Clash Meta

参考文章：[Clash Meta：Clash 核心继任者-Clash 爱好者 (clashios.com)](https://clashios.com/clash-meta-clash-core/)

### Clash Meta 核心主要特点

**代理模块：**

- 支持出站传输协议 VLESS XTLS / Trojan XTLS
- 支持出站传输协议 Hysteria
- 支持PASS ( 跳过 ) 规则
- 主动健康检测 urltest/fallback（基于 tcp 握手，限定时间内多次失败会主动触发健康检测使用节点）
- 支持策略组正则筛选
- 允许 Provider 请求过 Clash
- Proxy-Providers 支持直接使用 V2rayN 等客户端的普通订阅
- Relay 代理链支持 UDP over TCP
- TCP 连接并发

**规则模块：**

- 支持规则 GEOSITE
- 支持入站类型规则 IN-TYPE
- 支持规则集 RULE-SET
- 支持规则 SRC-PORT 和 DST-PORT 的多端口条件
- 支持规则对TCP / UDP 分别管控
- 支持 Network 规则，支持匹配网络类型 ( TCP / UDP )
- 支持逻辑判断规则 ( NOT / OR / AND )
- 支持子规则集
- 支持所有规则的源 IPCIDR 条件，只需附加到末尾即可
- 支持 GEODATA MODE 切换，mmdb / dat
- 支持切换 GEODATA LOADER 模式切换 ， 普通 / 小内存模式
- 支持 GeoSite 延迟加载 （无 Geosite 规则，getsite.dat 不下载）
- GEOIP / GEOSITE 数据库基于 Loyalsoldier/v2ray-rules-dat

**DNS 模块：**

- 支持 Sniffer 域名嗅探器
- 支持 Fallback-Filter 使用 Geosite
- 恢复 Redir-Host 远程解析
- 支持使用代理解析 ip
- 支持使用 HTTP/3
- 支持DNS over QUIC

**TUN 模块：**

- 支持 macOS、Linux 和 Windows
- 内置 iptables，无需手动配置
- 内置 Wintun 驱动程序
- 支持 gVisor / System 堆栈

### Clash Meta 优点

相比于 Clash Premium 核心优点

- 支持原 Clash Premium 核心大部分特性
- 开源更放心
- 支持更多新协议



### Clash Meta协议

参考文章：[Clash切换内核增加自建协议 - Yaxin Dong (董亚鑫) - Homepage (10181128.xyz)](https://10181128.xyz/2023/02/22/Clash切换内核，增加多种自建协议/)

参考文章：[Clash Verge 替换最新 Clash.Meta 内核 - Yaxin Dong (董亚鑫) - Homepage (10181128.xyz)](https://10181128.xyz/2023/11/17/ClashVerge替换最新Clash.Meta内核/)

  Clash For Windows 、OpenClash 切换内核！支持 Xray、VLESS、Hysteria、XTLS 等自建协议！自建协议 VLESS、XTLS、Hysteria 的 Clash 规则。

  从 V2ray Core 4.33.0 的版本移除 XTLS 以后，[RPRX](https://github.com/XTLS/Xray-core) 就和其他的拥护者们创建了 Project X 项目，然后取名于 XTLS 的 X 和 V2ray 的 ray，从而也就诞生了 Xray。

  大部分人喜欢使用 Clash，由于是集成 Clash Core ，所以并不支持 Xray 的一些协议，于是衍生出了 Clash.Meta 内核。

  这个内核支持常用的 VLESS XTLS、Trojan XTLS 、Hysteria 等流行的一些自建协议，而且专属规则里面还支持 Proxy – Providers 直接使用 V2rayN 等客户端的普通订阅进行节点订阅。



**准备工作**：

1. VPS 一台，搭建好自己所需规则的服务
2. [Clash for Windows 下载](https://github.com/Fndroid/clash_for_windows_pkg/releases) (根据 OS 下载对应版本，如 WinOS: **Clash.for.Windows.Setup.0.20.33.exe**)
3. [Clash.Meta Alpha 内核下载](https://github.com/MetaCubeX/Clash.Meta/releases) (根据 OS 下载对应版本，如 WinOS: **clash.meta-windows-amd64-alpha-xxx.zip**，如果是ARM则是 **clash.meta-windows-arm64-alpha-xxx.zip**)



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

   配置文件中必须有`TUN模式`相关配置

   ```
   tun:
     enable: true
     stack: system
     auto-route: true
     auto-detect-interface: true
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
   
   

## 规则转换

### 推荐使用substore

*这里摘取官方仓库的介绍*：

> Advanced Subscription Manager for QX, Loon, Surge, Stash and Shadowrocket.

项目地址：https://github.com/sub-store-org/Sub-Store

官方教程：[Sub-Store 相关教程 (notion.site)](https://xream.notion.site/Sub-Store-abe6a96944724dc6a36833d5c9ab7c87)

Docker compose.yml

```
version: '3.8'
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

## 四、Clash规则写法规则

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

## 五、范例YAML文件




https://github.com/blackmatrix7/ios_rule_script/issues/1268

去除了IP-ASN后的blackmatrix7规则：https://github.com/ericz15/ios_rule_script