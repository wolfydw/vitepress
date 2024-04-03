## 背景

为了方便多端编辑与同步，这里采用git进行管理



## 快速上手

### 创建远程仓库

**在GitHub创建一个新的仓库**：

登录您的GitHub账号，然后在GitHub上创建一个新的仓库。创建仓库时，GitHub会提供一个仓库的URL，看起来像这样：`https://github.com/yourusername/your-repo-name.git`。

**生成个人访问令牌（PAT）**：

- 登录你的GitHub账号。
- 转到设置（Settings）> 开发者设置（Developer settings）> 个人访问令牌（Personal access tokens）。
- 点击“生成新令牌”（Generate new token），选择所需的权限（对于推送操作，确保选中了`repo`），然后生成令牌。

**使用PAT代替密码**：

- 当命令行提示你输入用户名和密码时，用户名仍然是你的GitHub用户名，但密码处输入你刚刚生成的个人访问令牌。

### 创建本地仓库

**初始化Git仓库**：在项目目录中，运行`git init`命令来初始化一个新的Git仓库。这会创建一个名为`.git`的隐藏目录，其中包含了所有必要的Git仓库文件，但不会影响其他文件。

```
git init
```

**创建.gitignore文件**：使用`touch .gitignore`（Mac）或`nano .gitignore`（Unix-like）命令创建`.gitignore`文件，在文件内容中添加规则：

```
*.DS_Store # 忽略所有.DS_Store文件
temp/ # 忽略所有名为temp的文件夹
```

**添加文件到暂存区**：使用`git add`命令来添加文件到Git暂存区。如果你想添加当前目录下的所有文件（不包括.gitignore中指定的文件），可以使用`.`代表当前目录：

```
git add .
```

这一步将当前目录下的所有文件和子目录添加到暂存区，准备进行提交。

**提交文件到仓库**：使用`git commit`命令来将暂存区的文件提交到仓库。你需要提供一个提交消息，描述这次提交的内容。这可以通过`-m`选项后面跟上消息内容来实现：

```
git commit -m "Initial commit"
```

这一步将暂存区的更改永久记录到Git历史中。

**将远程仓库添加到您的本地仓库**：

使用GitHub提供的仓库URL将远程仓库添加为`origin`：

```
git remote add origin https://github.com/yourusername/your-repo-name.git
```

**推送本地更改到GitHub**：

将您的更改推送到GitHub仓库：

```
git push -u origin main
```

系统会提示你输入账号和PAT

### 拉取远程仓库并修改

`cd`到本地仓库根目录，然后运行以下命令以从GitHub拉取最新更改：

```
git pull origin master
```

本地修改完毕后

```
git add -A
git commit -m "Update existing files with modifications"
```

推送到远程仓库

```
git push origin main
```