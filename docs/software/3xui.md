最后更新时间：2024年10月15日

## 3x-ui

项目地址：https://github.com/MHSanaei/3x-ui/blob/main/README.zh_CN.md

### 安装 & 升级

```bash
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)
```

按脚本提示输入初始化信息

``` bash
Install/update finished! For security it's recommended to modify panel settings 
Would you like to customize the panel settings? (If not, random settings will be applied) [y/n]: y # 输入y自定义面板设置
Please set up your username: # 输入用户名
Please set up your password: # 输入密码
Please set up the panel port: 54321 # 输入面板端口
Please set up the web base path (ip:port/webbasepath/): a # 输入面板路径
```

如果你是按以上内容进行的设置，那么安装完成后，在浏览器中访问 `http://你的VPS_IP:54321/a`，使用刚录入的用户名和密码进行登录

### 面板设置（非必要步骤）

准备一个解析到服务器的域名，和域名对应的证书

主要设置如下：

```
面板监听端口：54321
面板证书公钥文件路径：/root/data/ssh/cert2.pem
面板证书密钥文件路径：/root/data/ssh/privkey2.pem
面板url根路径：/a/
```

如果配置和上面一样，以后就是通过 https://ip/a/:54321 访问面板

### 设置节点

**vless+ws+tls**

主机和SNI填一个解析到服务器的域名，路径填 /ws ，数字证书填证书绝对路径，删除所有ALPN预设（ALPN处留空）



## 参考资料

https://www.youtube.com/watch?v=MfvNiI3xXb8
https://naiyous.com/8689.html