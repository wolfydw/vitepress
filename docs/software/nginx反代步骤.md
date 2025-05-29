## 反代 alist.xinshikong.org 步骤

1. 安装nginx

```
apt update
apt install nginx -y
```

2. 创建 Nginx 配置文件：

```
nano /etc/nginx/sites-available/alist
```

3. 添加以下配置：

```
server {
    listen 80;
    server_name alist.xinshikong.org;

    location / {
        proxy_pass http://localhost:5244;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

4. 启用站点并重启 Nginx：

```
ln -s /etc/nginx/sites-available/alist /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

5. 如需 HTTPS，可安装 Certbot：

```
apt install certbot python3-certbot-nginx
certbot --nginx -d alist.xinshikong.org
```



---

Requesting a certificate for alist.xinshikong.org

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/alist.xinshikong.org/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/alist.xinshikong.org/privkey.pem
This certificate expires on 2025-08-26.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for alist.xinshikong.org to /etc/nginx/sites-enabled/alist
Congratulations! You have successfully enabled HTTPS on https://alist.xinshikong.org

---

certbot 注册成功后会输出这一段



## 卸载

1. 删除 Nginx 配置文件

```bash
rm /etc/nginx/sites-enabled/alist
rm /etc/nginx/sites-available/alist
```

2. 删除 SSL 证书（如果已安装）

```bash
certbot delete --cert-name alist.xinshikong.org
```