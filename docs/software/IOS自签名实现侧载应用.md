最后更新时间：2024.12.09

## 什么是侧载

iOS侧载是指通过非官方途径将应用程序安装到 iPhone 或 iPad 上（苹果官方渠道有App Store 和 TestFlight）

iOS侧载的常见方式有：

1. 自签名证书
2. 第三方应用商店，例如爱思助手，其本质也是自签名证书
3. 巨魔
4. 越狱



做为一个普通用户，如果既要享受最新版的系统又要安装商店没有的应用。只有`自签名证书`和`第三方应用商店`这两个选择。

`第三方应用商店`的操作比较简单，这里不做介绍，我们讲解一下`自签名证书`



## 自签名证书

通俗的来说，苹果证书是用来给应用“盖章”的，主要用两种：

### 一、个人 Apple ID 自签名——7天有效

特点：免费，但是每7天要续签一次，适合新手自己玩玩

**使用方法**

- 使用`AltStore`或者`sidestore`，参考官网
  AltStore wiki：https://faq.altstore.io/getting-started/how-to-install-altstore-macos
  sidestore：https://sidestore.io/

  **注：每7天要开电脑连wifi续签一次**

- ~~使用[scarlet(猩红)](https://usescarlet.com/)可以安装任意ipa
  猩红本质上是一个自带企业签名证书的app，只要运营方一直续费企业证书，就可以无期限使用~~
  试用第二天就掉签，不推荐



### 二、个人开发者计划证书（Apple Developer Program）——1年有效

特点：每年交99美元，可以注册最多100台设备，所以存在倒卖的可能性，我们可以将自己的设备注册在别的开发者账号下，从而获取侧载权限。



**购买渠道**

- AppleHub & 心动源 TG：https://t.me/IPA520 （68一年包售后，经常会有半价活动，可以提前买了存着）

**使用方法**

购买证书后会得到 `.mobileprovision` 和 `.p12` 两个文件和对应的`证书密码`，使用`全能签`对`ipa`进行签名并安装



## 软件源

IOS破解软件分享：https://t.me/gekuGou

秋名山巨魔俱乐部：https://t.me/ae86_ios



## 值得侧载的app

- 微信
  - 修改不同的`Bundle Identifier`就可以实现多开
    - 自用`Bundle Identifier`登记：十三（com.tencent.xinshisan），招聘（com.tencent.xinzhaopin）
  - 签名时要勾选`移除设备跳转`，这样在多开时不会影响支付跳转功能
- 香色闺阁
  - 传说中最强的阅读类软件，最后版本：2.56.1
  - 因为软件作者弃坑，相关书源都属于无人维护的状态，书源推荐：公众号搜索`柠檬工会`



