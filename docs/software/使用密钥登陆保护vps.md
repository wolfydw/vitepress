# 使用密钥登陆保护vps

## 如何生成密钥

```zsh
# 生成ED25519密钥对，-C 为密钥加一个注释，注释会出现在公钥的末尾
root@macOS ~ % ssh-keygen -t ed25519 -C "ssh"    
Generating public/private ed25519 key pair.
# 自定义密钥文件名“ssh”，而不是用默认路径（id_ed25519）
Enter file in which to save the key (/Users/yangdawei/.ssh/id_ed25519): ssh
# 设置密码短语，每次用这把私钥登录时，会要求你输入密码短语；可以结合 ssh-agent（密钥代理），只在首次输入，后续自动解锁，不影响频繁使用
Enter passphrase for "ssh" (empty for no passphrase): 
Enter same passphrase again: 
# 生成成功，私钥文件：ssh，公钥文件：ssh.pub
Your identification has been saved in ssh
Your public key has been saved in ssh.pub
# 公钥指纹和Randomart图像
The key fingerprint is:
SHA256:k21dcVScE0Kn//qRF1+qatGS8LhKXIOT4jmMLZJKHuY ssh
The key's randomart image is:
+--[ED25519 256]--+
|            .o.=B|
|              +=.|
|             .. .|
|       o.o . ..  |
|    . + S+oo.  o.|
| . = + o.+= .  .*|
|o+o * o  . o  .o+|
|*... o  . .  . .o|
|.E    .. .... ...|
+----[SHA256]-----+
```



## 在DD时使用生成的密钥

```bash
bash <(curl -L https://raw.githubusercontent.com/bin456789/reinstall/main/reinstall.sh) debian 12 --ssh-key "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINg9SM/YUEa969I7Hgo8GnrBePXCkImKUpZTwpj7uICh" --ssh-port 22222
```