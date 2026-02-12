# Codex

# Codex CLI安装

适合`MacOS`和`Linux`

1. 一键安装 & 升级nvm

   ```
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
   ```
   
   > [!note]
   >
   > **nvm：Node Version Manager**
   >
   > Github项目地址：https://github.com/nvm-sh/nvm

1. 使用nvm安装node（会同时带 npm）
   
   ```
   nvm install node
   node --version # 确认node版本 ≥ 22
   npm --version
   ```
   
1. 使用npm安装codex

   ```
   npm i -g @openai/codex
   ```



> [!important]
>
> 不要用apt、brew等系统包管理器安装npm和codex，通常版本都很旧



## 配置文件

创建config.toml文件

```
mkdir -p ~/.codex
cd ~/.codex
nano config.toml
```

```
model_provider = "codex"
model = "gpt-5-codex"             # 可以是 "gpt-5""gpt-5-codex"
model_reasoning_effort = "high"   # 可以是 “low”“medium”“high”
disable_response_storage = true
preferred_auth_method = "apikey"

sandbox_mode = "workspace-write"
approval_policy = "on-request"

network_access = "enabled"

[model_providers.codex]
name = "codex"
base_url = "https://xlnode.xychatai.com/codex/v1"
wire_api = "responses"
env_key = "CODEX_API_KEY"
```

方法一：新建 auth.json

```
{
  "OPENAI_API_KEY": "sk-xxxxxxxxx"
}
```

方法二：设置环境变量

```
nano ~/.zshrc
```

```
export AZURE_OPENAI_API_KEY="你的-azure-openai-api-key"
```

```
source ~/.zshrc
```

新建 AGENTS.md

```
所有对话必须使用中文答复
```
