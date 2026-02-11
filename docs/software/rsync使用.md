# 使用rsync在两台VPS之间传输文件

## 简介

rsync：支持断点续传、增量备份

screen：可以后台运行`rsync`，不用一直保持ssh连接

## 准备工作

1. 安装`rsync`和`screen`

   ```
   apt install rsync screen -y
   ```

2. 创建`screen`任务

   ```
   screen -S transfer
   # 进入后执行 rsync 命令
   # 按 Ctrl + A + D 退出后台，即便关闭电脑传输也会继续
   ```

3. `rsync`传输命令

   ```
   rsync -avzP -e 'ssh -p 22' /local/data root@IP:/remote/dir/
   # 新建传输
   rsync -avzP --delete -e 'ssh -p 22' /local/data root@IP:/remote/dir/
   # 已有目录，增量备份
   ```

   `rsync -avzP /data/ root@IP:/backup/`：把 `/data/` **内部的文件**传过去。

   `rsync -avzP /data root@IP:/backup/`：把 **整个 data 文件夹** 传过去。

   **参数详解：**

   - `-a` (archive): 归档模式，保留文件权限、所有者、时间戳。
   - `-v` (verbose): 显示传输详情。
   - `-z` (compress): 传输时压缩数据，节省带宽（对纯文本效果极佳）。
   - `-P` (progress/partial): 显示进度条，并允许断点续传（保留已传一半的文件）。
   - `-e 'ssh -p 22'`: 指定 SSH 协议和端口（如果端口不是 22，请修改此处）。
   - `--delete`：传输完成后，**把接收端多余的文件删掉**（保持两边一模一样）