# 仅用telethon的session登陆telegram客户端

## 所需条件

- 一台曾经使用telethon登陆过对应账号的设备
- `api_id` 和 `api_hash`

## 实现方法

1. `Python3 getphonenum.py` ，获取`session` 文件对应的手机号

   ```
   from telethon import TelegramClient
   
   # 填入你的API凭据
   api_id = 你的API_ID  # 替换为整数
   api_hash = '你的API_HASH'  # 替换为字符串
   
   # 使用已有的session文件
   client = TelegramClient('你的session文件名', api_id, api_hash)
   
   async def main():
       # 连接到Telegram
       await client.connect()
       
       # 检查是否已授权
       if await client.is_user_authorized():
           # 获取当前账户信息
           myself = await client.get_me()
           print(f"账户信息:")
           print(f"ID: {myself.id}")
           print(f"用户名: {myself.username}")
           print(f"手机号: {myself.phone}")
           print(f"名: {myself.first_name}")
           print(f"姓: {myself.last_name}")
       else:
           print("Session无效或已过期，需要重新登录")
   
   with client:
       client.loop.run_until_complete(main())
   ```

2. 用获得的手机号登陆

3. `python3 receive_code.py` ，获取登陆验证码

   ```
   from telethon import TelegramClient, events
   import re
   
   # 填入你的API凭据
   api_id = 你的API_ID
   api_hash = '你的API_HASH'
   
   # 使用已有的session文件
   client = TelegramClient('你的session文件名', api_id, api_hash)
   
   @client.on(events.NewMessage)
   async def handle_new_message(event):
       # 从Telegram官方账号收到的消息可能包含登录码
       if event.sender_id == 777000:  # Telegram官方账号ID
           print(f"收到来自Telegram的消息: {event.text}")
           
           # 尝试从消息中提取验证码 
           # 登录码通常是5位数字
           codes = re.findall(r'\b\d{5}\b', event.text)
           if codes:
               print(f"可能的登录验证码: {codes[0]}")
           
           # 或者直接显示完整消息以防正则表达式不匹配
           print("请检查以上消息中的验证码")
   
   async def main():
       print("正在连接到Telegram...")
       await client.start()
       print("已连接！等待验证码消息...")
       
       # 保持程序运行直到手动停止
       await client.run_until_disconnected()
   
   with client:
       client.loop.run_until_complete(main())
   ```

   

