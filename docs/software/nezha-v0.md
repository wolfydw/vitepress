# 哪吒面板 v0

## 安装面板（dashboard）

使用dockercompose安装

1. 确定面板服务器，将探针域名解析过去，例如 https://tz.ydw.cool

2. 创建 GitHub OAuth app： https://github.com/settings/developers

   点击 New OAuth App ，填入以下信息，点击 Register application

   ```
   Application name：探针
   Homepage URL：https://tz.ydw.cool（探针所用的域名）
   Application description：留空或者随意填写
   Authorization callback URL：https://tz.ydw.cool/oauth2/callback（探针所用的域名/oauth2/callback）
   ```

   记录 Client ID 和 Client Secret

3. 创建 `/root/data/dockercompose/nezha/docker-compose.yaml`

   ```
   services:
     dashboard:
       image: ghcr.io/naiba/nezha-dashboard:v0.20.13
       restart: always
       volumes:
         - ./data:/dashboard/data
         - ./static-custom/static:/dashboard/resource/static/custom:ro
         - ./theme-custom/template:/dashboard/resource/template/theme-custom:ro
         - ./dashboard-custom/template:/dashboard/resource/template/dashboard-custom:ro
       ports:
         - 80:80
         - 5555:5555
   ```

4. 创建`/root/data/dockercompose/nezha/data/config.yaml`

   ```
   oauth2:
     type: "github"
     admin: "你的GitHub用户名"
     clientid: "你的GitHub OAuth应用的Client ID"
     clientsecret: "你的GitHub OAuth应用的Client Secret"
   site:
     brand: "哪吒面板"
     cookiename: "nezha-dashboard"
     theme: "default"
   ```



## 安装客户端（agent）

哪吒面板端新建一个服务器，方便起见就填名字就行，然后用一键命令正常安装 agent



## 关闭SSH和自动更新

```
# 编辑 agent 服务文件
nano /etc/systemd/system/nezha-agent.service

# 在`ExecStart=`这一栏最后加入
--disable-command-execute --disable-auto-update --disable-force-update

# 重新加载 systemd 管理器配置文件
systemctl daemon-reload

# 重启 agent 服务
systemctl restart nezha-agent
```

然后你就已经关闭了哪吒探针的 SSH 和更新



一键命令

```
sed -i 's|^ExecStart=.*|& --disable-command-execute --disable-auto-update --disable-force-update|' /etc/systemd/system/nezha-agent.service && systemctl daemon-reload && systemctl restart nezha-agent
```



## 账单信息展示

在线生成JSON，粘贴到公开备注中使用

https://nezhainfojson.pages.dev/



## 美化面板

https://github.com/hamster1963/nezha-dash



## 参考

https://blog.rstary.com/tz
