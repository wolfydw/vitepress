https://crifan.github.io/media_process_ffmpeg/website/video_process/property/get/

## 安装ffmpeg

### 在macos上安装

```shell
brew install ffmpeg
```

### bilibili视频解析

https://www.xiazaitool.com/blbl

## ffmpeg使用技巧

### 剪辑特定时间段

例如从5分钟到15分钟

```shell
ffmpeg -i 1.mp4 -ss 00:05:00 -to 00:15:00 -c copy o1.mp4
```

这里的命令参数解释如下：

- -i input.mp4 表示输入文件。
- -ss 00:05:00 定位到视频的开始时间点，即5分钟处。
- -to 00:15:00 定位到视频的结束时间点，即15分钟处。
- -c copy 表示复制视频和音频流而不重新编码。
- output.mp4 是剪辑后生成的输出文件。

### 去水印

**定位水印位置**

```shell
ffplay -f lavfi -i "movie=o1.mp4,delogo=x=15:y=1:w=149:h=54:show=1"
```

**去除B站月圆之夜录屏水印**

592*1280尺寸

```shell
ffmpeg -i o1.mp4 -filter_complex "[0:v]delogo=x=15:y=1:w=149:h=54" -c:a copy p1.mp4
```

396*854尺寸

```shell
ffmpeg -i o1.mp4 -filter_complex "[0:v]delogo=x=12:y=1:w=98:h=33" -c:a copy p1.mp4
```

### 视频合并

合并p1和p2

```
ffmpeg -i "concat:p1.mp4|p2.mp4" -c copy output.mp4
```

### 画音合并

使用`脚本猫`下载bilibili的脚本，下载后的文件是画音分离的，所以还需要使用ffmpeg进行合并

将以下代码保存为`hebing.sh`

```bash
# 遍历当前文件夹，将所有mp4格式文件与同名m4a文件进行合并，合并后的文件名加上_merged
for video_file in *.mp4; do
    audio_file="${video_file%.mp4}.m4a"
    output_file="${video_file%.mp4}_merged.mp4"
    ffmpeg -i "$video_file" -i "$audio_file" -vcodec copy -acodec copy "$output_file"
done
```

给脚本授权

```shell
chmod 777 hebing.sh
```

运行脚本

```shell
./hebing.sh
```
