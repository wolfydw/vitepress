## 3x-ui

项目地址：https://github.com/MHSanaei/3x-ui

### 安装 & 升级

```bash
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)
```

按脚本提示输入初始化信息

``` 
Install/update finished! For security it's recommended to modify panel settings 
Would you like to customize the panel settings? (If not, random settings will be applied) [y/n]: y # 输入y自定义面板设置
Please set up your username: # 输入用户名
Please set up your password: # 输入密码
Please set up the panel port: 54321 # 输入面板端口
Please set up the web base path (ip:port/webbasepath/): a # 输入面板路径
```

如果你是按以上内容进行的设置，那么安装完成后，在浏览器中访问 `http://你的VPS_IP:54321/a`，使用刚录入的用户名和密码进行登录

### 开启BBRv3加速

```bash
bash <(curl -s https://raw.githubusercontent.com/opiran-club/VPS-Optimizer/main/bbrv3.sh --ipv4)
```

一路按 Y 确认，直到重启服务器

> [!note]什么是BBRv3？
>
> BBRv3 是一种由谷歌开发的 TCP 拥塞控制算法，用于提高网络传输效率和降低延迟。相较于之前的版本，BBRv3 在处理丢包和拥塞方面有更好的表现，能够在网络条件不佳时仍然保持较高的传输速度。