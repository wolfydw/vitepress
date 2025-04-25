## 背景

更新时间：2025.04.10

自己教学相关的一些内容也同步到了GitHub上，感觉有被盗用的风险，所以动了自建git的念头



## Git 程序选择

1. gitlab：功能全面，但是非常重量级，系统占用大，适合团队使用
2. gitea：轻量，适宜个人



## Gitea 使用记录

### 通过docker compose安装

1. 创建 docker-compose.yaml 文件，如不需要action可以注释掉 runner 部分

```
services:
  gitea:
    image: gitea/gitea:latest
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - GITEA__database__DB_TYPE=sqlite3
      # 可选：配置邮件服务器、域名等其他环境变量
      - GITEA__markup.markdown__ENABLE_MATH=true
      # 可选：启用 KaTeX 支持
    volumes:
      - ./data:/data
      - ./config:/etc/gitea
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "8180:3000"  # Web界面
      - "8122:22"     # SSH端口，用于Git操作
    restart: unless-stopped
    networks:
      - gitea

  runner:
    image: gitea/act_runner:latest
    container_name: gitea-runner
    restart: always
    depends_on:
      - gitea
    environment:
      # 连接到gitea容器
      GITEA_INSTANCE_URL: "https://gitea.ydw.cool/"
      # 下面的令牌需要在Gitea UI中生成后填入
      GITEA_RUNNER_REGISTRATION_TOKEN: "FZz4CIPachYbOToHAUXMIZv6pDJEpJPLuemOWAka"
      # 配置Runner标签
      GITEA_RUNNER_LABELS: "ubuntu-latest:docker://node:20"

    volumes:
      - ./runner:/data
      # 挂载Docker socket以允许在runner中使用Docker
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - gitea

networks:
  gitea:
    external: false
```

2. 在Gitea Web界面创建Runner注册令牌：

- 登录Gitea管理员账户
- 进入 **网站管理** > **Actions** > **Runners**
- 点击"创建新Runner"获取注册令牌

3. 设置环境变量并启动完整服务：

```
# 创建一个.env文件存储令牌
echo "GITEA_RUNNER_TOKEN=你的注册令牌" > .env

# 启动完整服务
docker-compose up -d
```

### 将项目从 GitHub 迁移到 Gitea

 以迁移 VitePress 项目为例要，将项目从 GitHub 迁移到自建的 Gitea，需要执行以下步骤：

1. **添加 Gitea 仓库作为新的远程仓库**

首先，在您的本地项目目录中，添加 Gitea 仓库作为新的默认远程仓库：

```
# 进入项目目录
cd your-vitepress-project

# 查看当前的远程仓库列表
git remote -v

# 添加 Gitea 仓库作为远程仓库
git remote add gitea https://your-gitea-instance.com/username/repository.git

# 重命名原有的 GitHub 远程仓库（备份）
git remote rename origin github

# 将 Gitea 设为默认（命名为 origin）
git remote rename gitea origin

# 查看远程仓库列表确认添加成功
git remote -v
```



2. **将代码推送到 Gitea**

   提交本地更改

```
git add .
git commit -m "准备迁移到 Gitea"
```

推送 main 分支到 Gitea (步骤1中已经将 gitea 设置为 origin)

```
git push -u origin main
```

> `-u` 参数会同时设置跟踪关系，这样一次性解决两个问题:
>
> - 将代码推送到 Gitea
>
> - 设置 main 分支跟踪 origin/main

再次验证分支跟踪状态

```
(base) yangdawei@ydw vitepress % git branch -vv
* main 3baa04d [origin/main] 准备迁移到 Gitea
```

今后如果想推送到 GitHub，需要明确指定

```
git push github main
```



3. 待补充，迁移 workflow 相关内容



