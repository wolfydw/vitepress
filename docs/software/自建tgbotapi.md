# 自建telegram bot api

> [!warning]
>
> generate_filter.sh 的逻辑还有问题，导致botid筛选功能无效。



## 好处

`tg-bot`的官方`api`有一些限制，自建`api`，可以：

- 下载文件没有大小限制。
- 上传最大`2000 MB`的文件。
- 使用本地路径和文件`URI`方案上传文件。
- 为`Webhook`使用 HTTP URL。
- 为`webhook`使用任何本地 IP 地址。
- 为`webhook`使用任何端口。
- 将`max_webhook_connections`设置为`100000`。
- 接收绝对本地路径作为`file_path`字段的值，而无需在`getFile`请求后下载文件。



## 自建步骤

项目地址：https://hub.docker.com/r/aiogram/telegram-bot-api



### 获取app_id和app_hash

在[API development tools](https://my.telegram.org/apps)登陆，填入信息，将会获得`app_id`和`app_hash`

### 创建项目文件

项目结构

```
.
├── docker-compose.yml
├── env.conf              # 存放 API 配置和允许的 Bot ID
├── generate_filter.sh    # 用于生成 TELEGRAM_FILTER 变量
├── compose.conf          # 自动生成的 Docker 环境变量
└── data/                 # Telegram Bot API 持久化数据目录
```



docker-compose.yaml 内容

```
services:
  telegram-bot-api:
    image: aiogram/telegram-bot-api:latest
    volumes:
      - ./data:/var/lib/telegram-bot-api
    ports:
      - "8081:8081"
    restart: unless-stopped
    env_file:
      - compose.conf
```



env.conf 内容

```
# Telegram API 必需配置
TELEGRAM_API_ID=your_api_id_here
TELEGRAM_API_HASH=your_api_hash_here

# 允许的 Bot ID 列表（用逗号分隔，不要有空格）
# 示例: ALLOWED_BOT_IDS=123456789,987654321,555666777
ALLOWED_BOT_IDS=

# 可选配置 - 日志设置
TELEGRAM_VERBOSITY=1
TELEGRAM_LOG_FILE=/var/lib/telegram-bot-api/log.txt
```



generate_filter.sh 内容

```
#!/bin/bash

# 读取配置文件
if [ ! -f "env.conf" ]; then
    echo "错误: 找不到 env.conf 文件"
    exit 1
fi

source env.conf

# 输出文件
OUTPUT_FILE="compose.conf"

# 清空输出文件
> $OUTPUT_FILE

echo "正在生成 Docker Compose 环境变量文件..."

# 检查必需的配置
if [ -z "$TELEGRAM_API_ID" ] || [ -z "$TELEGRAM_API_HASH" ]; then
    echo "错误: TELEGRAM_API_ID 和 TELEGRAM_API_HASH 不能为空"
    exit 1
fi

# 添加基本配置
echo "# Telegram Bot API 基本配置" >> $OUTPUT_FILE
echo "TELEGRAM_API_ID=$TELEGRAM_API_ID" >> $OUTPUT_FILE
echo "TELEGRAM_API_HASH=$TELEGRAM_API_HASH" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# 添加可选的日志配置
if [ ! -z "$TELEGRAM_VERBOSITY" ]; then
    echo "TELEGRAM_VERBOSITY=$TELEGRAM_VERBOSITY" >> $OUTPUT_FILE
fi

if [ ! -z "$TELEGRAM_LOG_FILE" ]; then
    echo "TELEGRAM_LOG_FILE=$TELEGRAM_LOG_FILE" >> $OUTPUT_FILE
fi

# 如果有日志配置，添加空行分隔
if [ ! -z "$TELEGRAM_VERBOSITY" ] || [ ! -z "$TELEGRAM_LOG_FILE" ]; then
    echo "" >> $OUTPUT_FILE
fi

# 生成 Bot ID 过滤器
echo "# Bot ID 过滤器配置" >> $OUTPUT_FILE

if [ ! -z "$ALLOWED_BOT_IDS" ]; then
    echo "检测到 Bot ID 列表: $ALLOWED_BOT_IDS"
    
    # 移除空格并分割 Bot ID
    CLEAN_BOT_IDS=$(echo "$ALLOWED_BOT_IDS" | tr -d ' ')
    IFS=',' read -ra BOT_ARRAY <<< "$CLEAN_BOT_IDS"
    
    # 验证 Bot ID 格式
    VALID_BOTS=()
    for bot_id in "${BOT_ARRAY[@]}"; do
        # 检查是否为纯数字
        if [[ $bot_id =~ ^[0-9]+$ ]] && [ ${#bot_id} -ge 8 ]; then
            VALID_BOTS+=("$bot_id")
        else
            echo "警告: 跳过无效的 Bot ID: $bot_id (Bot ID 应该是至少8位的纯数字)"
        fi
    done
    
    # 如果有有效的 Bot ID，生成过滤器
    if [ ${#VALID_BOTS[@]} -gt 0 ]; then
        FILTER_CONDITIONS=""
        for bot_id in "${VALID_BOTS[@]}"; do
            if [ -z "$FILTER_CONDITIONS" ]; then
                FILTER_CONDITIONS="from.id == $bot_id"
            else
                FILTER_CONDITIONS="$FILTER_CONDITIONS || from.id == $bot_id"
            fi
        done
        
        echo "TELEGRAM_FILTER=\"$FILTER_CONDITIONS\"" >> $OUTPUT_FILE
        echo "✅ 成功生成过滤器，允许的 Bot ID: ${VALID_BOTS[*]}"
        echo "过滤器表达式: $FILTER_CONDITIONS"
    else
        echo "❌ 错误: 没有找到有效的 Bot ID"
        echo "# 警告: 未找到有效的 Bot ID，将接受所有消息" >> $OUTPUT_FILE
        exit 1
    fi
else
    echo "⚠️  警告: 未设置 ALLOWED_BOT_IDS，将接受所有消息"
    echo "# 未设置 Bot ID 过滤器，接受所有消息" >> $OUTPUT_FILE
fi

echo ""
echo "✅ 配置文件已生成: $OUTPUT_FILE"
echo "📄 请检查生成的文件内容，然后运行: docker-compose up -d"
```



### 启动服务

1. 配置 env.conf

2. 授权并运行 generate_filter.sh ，生成 Docker 环境变量文件
   ```
   chmod +x generate_filter.sh
   ./generate_filter.sh
   ```

3. docker-compose up -d



## 补充内容

**反代官方api**

https://api.telegram.org，端口 443

nginx 配置文件

    location / {
       return 444;
    }
    
    location ~* ^/bot {
        resolver 8.8.8.8;
        proxy_buffering off;
        proxy_pass      https://api.telegram.org$request_uri;
    }



## 参考文章

https://www.kuku.me/archives/41/