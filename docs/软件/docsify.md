# docsify文档生成利器
## 背景
这几天一直想找一个轻量美观、且能本地化部署的开源wiki程序，尝试了非常多网友的推荐，都没有得到满意的效果。
- 语雀，分享要收费。
- 思源，功能太强悍，学习成本过高，并且侧重本地化，也不能方便的分享。
- 我来，分享功能要收费，不方便

## 入门基础
### 官方文档
具体的一些基本操作它的官方文档上面都已经写得很明白了，我就不再赘述了，官方文档地址：https://docsify.js.org/#/zh-cn/
官方文档本身就是用docsify写的，让使用者第一眼就能感受到docsify生成文档的效果。

这里只复制安装流程供取用

### 安装
以下操作均在debian11系统

#### 安装npm
```
apt install npm -y
```

#### 全局安装docsify-cli
全局安装意味着你可以在计算机的任何位置运行`docsify-cli`命令，而不仅限于某个项目目录。
```
npm i docsify-cli -g
```
出现如下提示说明安装成功
```
root@debian:~# npm i docsify-cli -g
changed 205 packages, and audited 206 packages in 8s
17 packages are looking for funding
  run `npm fund` for details
8 vulnerabilities (7 moderate, 1 high)
To address all issues, run:
  npm audit fix
Run `npm audit` for details.
```
这是npm安装操作完成后的输出。它提供了关于安装过程的一些反馈，包括：
- 安装或更新了205个包，总共检查了206个包。
- 有17个包寻求资金支持。
- 发现了8个安全漏洞，其中7个为中等严重性，1个为高严重性。
- 建议运行`npm audit fix`来自动修复这些安全问题，以及`npm audit`以获取更多详细信息。

#### 初始化
在你想要存文档的目录下运行，命令会创建文档目录并初始化
```
docsify init ./docs
```
初始化成功后，可以看到 `./docs` 目录下创建的几个文件
- `index.html` 入口文件，可以对页面总体布局进行设置。
- `README.md` 为主页内容渲染，直接编辑 `docs/README.md` 就能更新文档内容。
- `.nojekyll` 用于阻止 GitHub Pages 忽略掉下划线开头的文件
直接编辑 `docs/README.md` 就能更新文档内容，当然也可以[添加更多页面](https://docsify.js.org/#/zh-cn/more-pages)。

#### 运行服务
```
docsify serve docs
```
默认访问地址：`ip:3000`
因为docsify采用了vue.js，因此整个网站的内容都会随着文件的修改而实时更新，说实话还挺好用的

#### 使用pm2持续运行
**安装pm2**
```
npm install pm2 -g
```
**使用pm2启动docsify**
```
pm2 start "docsify serve docs" --name docsify-app --cwd /root/data/
```
通过`--cwd`选项指定工作目录
**检查应用状态**：
执行以下命令来检查你的`docsify`应用的状态：
```
pm2 status
```
**配置`pm2`自启动**：

如果还没有配置`pm2`的自启动脚本，可以使用以下命令生成并配置：

```
pm2 startup
```

然后按照终端输出的指示操作，以确保在服务器重启后，你的`docsify`服务也能自动启动。

**保存`pm2`配置**：

为了在重启服务器后恢复当前的`pm2`配置，执行以下命令：

```
pm2 save
```

这样，你就可以确保`docsify`服务在指定的目录(`/root/data/`)下运行，并且配置了自动重启和系统重启后自动启动。

### 定制功能
因为整个项目本身就是以源码的形式发布的，所以给了用户较大的定制空间

#### 代码框修改间距
只需要在`<head>` `</head>`之间添加以下代码即可
```
  <style>
    .markdown-section pre>code{
      padding: 1.2em 5px;
    }
  </style>
```
教程参考：

[使用 docsify 并定制以使它更强大 - 掘金 (juejin.cn)](https://juejin.cn/post/7112247501167525919#heading-0)
[Docsifyb文档搭建记录 | 肆零肆 (xmq.plus)](https://xmq.plus/posts/1654.html#toc-heading-1)

### git 同步
#### 首次操作
1. 在GitHub上创建一个新的仓库，并获取仓库的URL，看起来像这样：https://github.com/yourusername/your-repo-name.git。
2. 转到设置（Settings）> 开发者设置（Developer settings）> 个人访问令牌（Personal access tokens）
3. 点击“生成新令牌”（Generate new token），选择所需的权限（对于推送操作，确保选中了repo），然后生成令牌。令牌只会显示一次，一定要妥善保存
4. 回到vps进行操作
```
# 安装git
apt install git
# 转到docs目录并初始化仓库
cd /root/data/docs
git init
# 将/docs/内所有文件添加到仓库中
git add .
# 使用GitHub提供的仓库URL将远程仓库添加为origin
git remote add origin https://github.com/yourusername/your-repo-name.git
# 推送本地更改到GitHub
git push -u origin main
```
注意，推送时需要账号和PAT令牌，而不是密码哦

#### 拉取操作
```
cd /root/data/docs
```
```
git pull origin main
```

### 疑难杂症
#### 一直卡Laoding
docsify的css和js都是从cdn.jsdelivr.net所导入的，但是国内访问jsdelivr的速度就很。。。所以就造成了一直在Loading

解决方法有2种，分别是
- 将文件从本地引入
- 改成其它域名引入

为了方便采用第二种方法，把cdn改成了fastly，问题解决



