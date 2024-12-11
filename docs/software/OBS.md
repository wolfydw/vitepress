## 配置obsutil

参考华为云官方support：https://support.huaweicloud.com/intl/zh-cn/utiltg-obs/obs_11_0003.html

1. 下载和安装

```shell
root@debian:~/backup# wget https://obs-community-intl.obs.ap-southeast-1.myhuaweicloud.com/obsutil/current/obsutil_linux_amd64.tar.gz
--2024-12-10 20:25:29--  https://obs-community-intl.obs.ap-southeast-1.myhuaweicloud.com/obsutil/current/obsutil_linux_amd64.tar.gz
Resolving obs-community-intl.obs.ap-southeast-1.myhuaweicloud.com (obs-community-intl.obs.ap-southeast-1.myhuaweicloud.com)... 119.13.113.14
Connecting to obs-community-intl.obs.ap-southeast-1.myhuaweicloud.com (obs-community-intl.obs.ap-southeast-1.myhuaweicloud.com)|119.13.113.14|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 3845484 (3.7M) [application/gzip]
Saving to: ‘obsutil_linux_amd64.tar.gz’

obsutil_linux_amd64.tar.gz           100%[=====================================================================>]   3.67M  --.-KB/s    in 0.03s   

2024-12-10 20:25:29 (146 MB/s) - ‘obsutil_linux_amd64.tar.gz’ saved [3845484/3845484]

root@debian:~/backup# tar -xzvf obsutil_linux_amd64.tar.gz
obsutil_linux_amd64_5.5.12/
obsutil_linux_amd64_5.5.12/setup.sh
obsutil_linux_amd64_5.5.12/obsutil
root@debian:~/backup# cd obsutil_linux_amd64
-bash: cd: obsutil_linux_amd64: No such file or directory
root@debian:~/backup# ls
obsutil_linux_amd64_5.5.12  obsutil_linux_amd64.tar.gz  readme.md
root@debian:~/backup# cd obsutil_linux_amd64_5.5.12/
root@debian:~/backup/obsutil_linux_amd64_5.5.12# chmod 755 obsutil
root@debian:~/backup/obsutil_linux_amd64_5.5.12# mv obsutil /usr/local/bin/
root@debian:~/backup/obsutil_linux_amd64_5.5.12# obsutil version
obsutil version:5.5.12, obssdk version:3.23.12
operating system:linux, arch:amd64
```

2. 初始化配置

```shell
root@debian:~/backup# obsutil config -i <AccessKeyId> -k <SecretAccessKey> -e <OBS Endpoint>
Config file url:
  /root/.obsutilconfig

Update config file successfully!
root@debian:~/backup# obsutil ls
Start at 2024-12-11 01:46:20.923894754 +0000 UTC

Bucket                   CreationDate             Location       BucketType     
obs://xxxxxxx            2024-11-13T09:22:54Z     cn-south-1     OBJECT         

Bucket number: 1
```

3. 使用方法

查看文件

```shell
root@debian:~/backup# obsutil ls obs://wolfydw/阿里云香港备份
Start at 2024-12-11 02:20:58.377025574 +0000 UTC

Listing objects .

Folder list:
obs://wolfydw/阿里云香港备份/

Object list:
key                                               LastModified                  Size      StorageClass        ETag                
obs://wolfydw/阿里云香港备份/backup20241210.tar.gz
                                                  2024-12-11T02:13:42Z          470.11MB  standard            "8b8f5c962b1dff996ae655a39f9451bc-24"

Total size of prefix [阿里云香港备份]: 470.11MB
Folder number: 1
File number: 1
```

