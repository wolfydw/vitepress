最后更新时间：2024.12.02

## 什么是侧载

在 iOS / iPadOS 设备上安装软件的主要途径如下：

- App Store 官方应用商店
- TestFlight 官方测试平台
- 自签名证书
- 第三方应用商店，例如爱思助手，其本质也是自签名证书
- 越狱



做为一个普通用户，如果既要享受最新版的系统又要安装商店没有的应用。只有`第三方应用商店`和`自签名证书`这两个选择。

`第三方应用商店`的操作比较简单，这里不做介绍，我们讲解一下`自签名证书`



## 自签名证书

通俗的来说，苹果证书是用来给应用“盖章”的，主要用两种：

**个人 Apple ID 自签名——7天有效**

- 免费，但是每7天要续签一次，适合新手自己玩玩

**个人开发者计划证书（Apple Developer Program）——1年有效**

- 每年交99美元，可以注册最多100台设备



### Apple ID 自签名方法

- 使用`AltStore`或者`sidestore`，参考官网
  AltStore wiki：https://faq.altstore.io/getting-started/how-to-install-altstore-macos
  sidestore：https://sidestore.io/
  
  **注：每7天要开电脑连wifi续签一次**
- ~~使用[scarlet(猩红)](https://usescarlet.com/)可以安装任意ipa
  猩红本质上是一个自带企业签名证书的app，只要运营方一直续费企业证书，就可以无期限使用~~
  试用第二天就掉签，不推荐



### 开发者证书签名方法

**购买渠道**

- AppleHub & 心动源 TG：https://t.me/IPA520 （68一年包售后，经常会有半价活动，可以提前买了存着）

**使用方法**

购买证书后会得到 `.mobileprovision` 和 `.p12` 两个文件和对应的`证书密码`，



## 软件源

IOS破解软件分享：https://t.me/gekuGou

秋名山巨魔俱乐部：https://t.me/ae86_ios



## 值得侧载的app

- 微信
- 香色闺阁
  传说中最强的阅读类软件，但是因为已经被下架，所以相关书源都属于无人维护的状态
  最后版本：2.56.1
  书源推荐：公众号搜索`柠檬工会`
- 轻松签
  一款免费签名软件，需要自己有p12证书
  tg频道：https://t.me/tgqsw