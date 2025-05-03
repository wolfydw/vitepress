# 自建RustDesk远程控制服务器

## Docker compose 安装

官方教程：https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-oss/install/

docker-compose.yaml

```
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped

```





https://www.voidking.com/dev-docker-install-rustdesk-server/

https://iswbm.com/zh/2024/06/30/how-to-deploy-self-hosted-rustdesk-service-for-zero-cost-remote-controlr/

