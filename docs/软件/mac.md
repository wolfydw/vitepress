# MAC上的好用工具

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
