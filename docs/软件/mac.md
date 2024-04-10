# MAC上的好用工具

## 分享一些不错的Mac破解软件网站软件分享

- [MacWk - 精品mac软件下载](https://macwk.cn/)  第一个当属 macwk，经历过闭站后浴火重生，现在资源还比较少，但是质量都很高网站无需登录也没有登录。基本上提供夸克云盘下载
- 佛系软件 资源很多，大部分来自 TNT team。下载无需登录，提供百度云盘和夸克云盘下载
- macked 资源很多，也有原创一手破解。无需登录，提供 123 云盘和百度网盘下载。登录网站可以直链下载，速度挺快，并且有问题在评论留言站长也会回复，非常不错
- xmac  资源很多，大部分来自 TNT team。无需登录，提供直链和 IPFS 下载
- appstorrent  俄罗斯的网站，资源很多，更新也很快。无需登录，直链下载。有些热门软件会受版权影响则不提供下载，但是可以去其他地方找~
- macserialiunkie 8国外的论坛，时常会有一手破解资源。非常不错，可以作为兜底去逛逛。上面这些网站有些可能得挂梯子才能访问，还有一些更新速度慢，吃相难看的网站就不分享了~



## brew
必备了，不解释

## [MessAuto](https://github.com/LeeeSe/MessAuto)
MessAuto 是一款 macOS 平台自动提取**短信**和**邮箱**验证码的软件，由 Rust 开发，适用于任何 App

安装 [Cargo](https://rustwiki.org/zh-CN/cargo/getting-started/installation.html)，注意开代理
```
curl -sSf https://static.rust-lang.org/rustup.sh | sh
```
自行编译安装messauto
```
# 下载源码
git clone https://github.com/LeeeSe/MessAuto.git
cd MessAuto

# 编译运行（非必需，仅用于开发测试）
cargo run

# 安装 cargo-bundle
cargo install cargo-bundle
# 打包应用
cargo bundle --release
```
生成的 MessAuto 应用位于`target/release/bundle/osx/MessAuto.app`。
移动 MessAuto.app 到 `/Applications` 文件夹下
