要学习更详细的docker知识：https://docker.easydoc.net/doc/81170005/cCewZWoN/lTKfePfP



## Docker Compose一键安装脚本

国外（官方脚本）

```
curl -sSL https://get.docker.com/ | sh
```

国内（ [轩辕脚本](https://docker.xuanyuan.me)）

```
bash <(wget -qO- https://xuanyuan.cloud/docker.sh)
```



## Docker桌面版

### mac安装docker

进入[docker官网](https://www.docker.com)，点击`Download for Mac - Apple Chip`

安装下载到的DMG文件，因为`docker for macos`自带了`docker compose`，所以不用另外安装compose

安装完毕后需要设置一下`环境变量`，打开`终端`，输入`open .bash_profile`，编辑进以下内容

```
export 	PATH=$JAVA_HOME:/usr/local/bin:$PATH
source /etc/profile
```



## 换阿里源

修改`/etc/docker/daemon.json`

```
nano /etc/docker/daemon.json
```

```
{
  "registry-mirrors": [ "https://registry.cn-hangzhou.aliyuncs.com"],
  "dns": ["119.29.29.29", "114.114.114.114"]
}
```

重启docker

```
systemctl daemon-reload
systemctl restart docker
```

## Docker小技巧

### dockercompose容器更新

```
docker compose pull
docker compose up -d
```

### 一键更新

```
bash <(curl -s https://raw.githubusercontent.com/wolfydw/ziyong/refs/heads/main/compose/auto-update.sh)
```

### 进入容器命令行

```
dokcer exec -it xxx sh
```

### 查看容器占用多少内存（实时）

```
docker stats
```

### 拷贝容器内文件到宿主机

```
docker cp mycontainer:/opt/testnew/file.txt /opt/test/
```

如需覆盖可以加上`--force`

```
docker cp --force mycontainer:/opt/testnew/file.txt /opt/test/
```

### 容器不重启

在dockercompose中加入`restart: always`即可

### 容器内中文乱码

添加环境变量，将宿主机的fronts文件映射到容器内，

```
    volumes:
      - "/usr/share/fonts:/usr/share/fonts"
```