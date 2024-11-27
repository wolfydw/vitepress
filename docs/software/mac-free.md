# MAC免费软件

最后更新时间：2024年11月27日

## Mac破解软件下载站

- [Macked](https://macked.app/ ) 资源很多，也有原创一手破解。需登录，登录后提供直链下载，速度挺快
- [appstorrent](https://appstorrent.org/) 俄罗斯的网站，资源很多，更新也很快。无需登录，直链下载。
- [XMac.App](https://xmac.app/)  资源很多，大部分来自 TNT team。无需登录，提供 OneDrive 或 IPFS 下载。部分资源安装后无破解效果
- [苹果软件盒子](https://www.macappbox.com/) 无需登录，提供百度网盘下载，部分软件只提供正版下载
- [MacWk - 精品mac软件下载](https://macwk.cn/)  网站无需登录也没有登录。基本上提供夸克云盘下载，部分软件只提供正版下载
- 佛系软件 资源很多，大部分来自 TNT team。下载无需登录，提供百度云盘和夸克云盘下载
- macserialiunkie 8国外的论坛，时常会有一手破解资源。非常不错，可以作为兜底去逛逛。上面这些网站有些可能得挂梯子才能访问，还有一些更新速度慢，吃相难看的网站就不分享了~



## Adobe系列

最新破解是由sice发布的Adobe 2024 Patcher，分为No Account Patcher离线补丁和With Account Patcher在线补丁，在 https://foxirj.com/adobe-patcher.html 可以下载



## Homebrew

`Homebrew`是一款包管理工具，目前支持`macOS`和`Linux`系统。主要有四个部分组成: `brew`、`homebrew-core` 、`homebrew-cask`、`homebrew-bottles`。

| 名称             | 说明                                  |
| ---------------- | ------------------------------------- |
| brew             | Homebrew 源代码仓库                   |
| homebrew-core    | Homebrew 核心源                       |
| homebrew-cask    | 提供 macOS 应用和大型二进制文件的安装 |
| homebrew-bottles | 预编译二进制软件包                    |

可以在官网 https://brew.sh/zh-cn/ 搜索有哪些应用程序

### 命令行操作

#### 安装 & 卸载 Homebrew

安装脚本——GitHub

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装脚本——国内镜像

```zsh
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

卸载脚本——国内镜像

```zsh
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

#### 相关命令

```zsh
brew update # 更新 brew 和 所有软件包
brew search package-name # 搜索软件包
brew install package-name # 安装软件包
brew uninstall package-name # 卸载软件包
brew list # 查看已安装软件包列表
brew cheanup # 清理过期的软件包和库文件
brew --version # 查看homebrew的版本信息
```

### 切换国内源

切换镜像源有三个库要切换：

- brew.git
- homebrew-core.git
- homebrew-bottles

1. 中科大源

```shell
# 替换brew.git:
$ cd "$(brew --repo)"
$ git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

# 替换homebrew-core.git:
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
$ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

# 替换homebrew-bottles:
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile

# 应用生效:
$ brew update
```

2. 清华大学源

```shell
# 替换brew.git:
$ cd "$(brew --repo)"
$ git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

# 替换homebrew-core.git:
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
$ git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

# 替换homebrew-bottles:
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile

# 应用生效:
$ brew update
```



### 第三方GUI

Applite： [Homebrew](https://brew.sh/) GUI，免费的开源项目。

已经安装的brew应用，都将出现在 Applite 中。手动安装的其他应用程序（例如从 DMG 或 PKG 文件安装），可以通过强制重新安装将它们添加到 Applite 中。

项目地址：https://aerolite.dev/applite



安装包安装或一键安装

```
brew install --cask applite
```



## 软件推荐

- 最好的播放器：IINA，https://iina.io/
  
  > command + i 更换默认播放器
- 系统监视器：stats，https://github.com/exelban/stats
- 解压缩工具：the unarchiver，App Store下载
- 软件管理：latest，https://max.codes
- 软件管理：macupdater，https://www.corecode.io/macupdater/#download
- 自动验证码：messauto，https://github.com/LeeeSe/MessAuto
- 截图软件：longshot，支持截图ocr
