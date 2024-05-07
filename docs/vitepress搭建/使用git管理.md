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
node_modules
docs/.vitepress/cache
docs/.vitepress/dist
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
git commit -m "Update"
```

推送到远程仓库

```
git push origin main
```

## 疑难杂症

### 出现`.DS_Store`文件怎么办

如果`.DS_Store`文件已经被提交并推送到了远程仓库中，你可以使用以下命令来查找并删除所有的`.DS_Store`文件

```
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```

这个命令会查找当前目录及其子目录中的所有`.DS_Store`文件，并使用`git rm`命令将它们从Git中删除。

提交并推送

```
git commit -m "Remove .DS_Store files"
```

```
git push origin main
```

### git出现分支怎么办？

**方案一：合并（Merge）**

合并是将远程分支的更改和你的本地分支更改合并在一起的方法。它会创建一个新的“合并提交”来表示这个合并。如果你想使用合并，可以设置 Git 以合并模式拉取：

```
git config pull.rebase false
git pull origin main
```

这将会创建一个合并提交，如果有冲突，你需要手动解决它们。

**方案二：变基（Rebase）**

变基是另一种解决分叉的方法，它会把你本地分支上的提交重新应用到远程分支的最新提交之上。这样做的好处是可以保持项目历史更线性。

```
git config pull.rebase true
git pull origin main
```

如果在变基过程中遇到冲突，你需要解决这些冲突，并继续变基过程。

### 每个目录下都有.DS_Store文件

`.DS_Store`文件是macOS特有的一个文件，它存储了其所在文件夹的自定义属性，如文件夹视图选项、图标位置以及其他视觉信息。`.DS_Store`是“Desktop Services Store”的缩写，反映了它的用途。这个文件由Finder应用程序在每个文件夹中创建和维护，其功能类似于Windows系统中的`desktop.ini`文件 。

为了防止这些文件被提交到版本控制系统，你可以将`.DS_Store`添加到`.gitignore`文件中，以便忽略它们。

如果在你执行`git push`之后，远程仓库中的`.DS_Store`文件依然存在，那么很可能是因为这些文件已经被提交并推送到了远程仓库中，在你将`.DS_Store`添加到`.gitignore`之后。`.gitignore`文件只会忽略尚未跟踪的文件，对于已经被Git跟踪的文件，即使后来被添加到`.gitignore`中，它们也不会自动从版本控制中删除。

为了删除远程仓库中的`.DS_Store`文件，你需要先在本地仓库中删除这些文件，提交这个更改，然后再次推送到远程仓库。以下是具体步骤：

#### 1. 删除本地仓库的`.DS_Store`文件

首先，你可以在命令行中使用以下命令来查找并删除所有的`.DS_Store`文件：

```
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```

这个命令会查找当前目录及其子目录中的所有`.DS_Store`文件，并使用`git rm`命令将它们从Git中删除。

#### 2. 提交更改

删除文件后，你需要提交这个更改：

```
git commit -m "Remove .DS_Store files"
```

#### 3. 推送到远程仓库

最后，使用`git push`命令将这些更改推送到远程仓库：

```
git push origin main
```

请确保将`main`替换为你正在使用的分支的名称，如果是`master`分支则相应替换为`master`。

这样操作后，`.DS_Store`文件就会从远程仓库中删除，而`.gitignore`文件会阻止这些文件将来被再次添加。不过，请记住，如果其他贡献者的本地仓库中仍然存在`.DS_Store`文件，并且他们没有在本地配置相应的`.gitignore`，那么这些文件可能会再次被推送到远程仓库中。分享`.gitignore`配置和确保团队成员了解如何使用它，可以帮助避免这种情况的发生。