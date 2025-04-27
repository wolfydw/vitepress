@echo off
chcp 65001 >nul
title Git助手 - %cd%
setlocal enabledelayedexpansion

:: 检查是否为Git仓库
git rev-parse --is-inside-work-tree >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo 错误: 当前目录不是Git仓库
    echo 请在Git仓库目录中运行此脚本
    pause
    exit /b 1
)

:MENU
cls
echo =========================================
echo             Git 助手菜单
echo =========================================
echo 当前目录: %cd%
echo.
echo 分支信息:
git branch -v
echo.
echo 仓库状态:
git status -s
echo.
echo 请选择操作:
echo 1. 拉取远程更新 (git pull)
echo 2. 查看详细状态 (git status)
echo 3. 添加并提交更改 (git add, commit)
echo 4. 提交并推送到远程 (commit + push)
echo 5. 查看提交历史 (git log)
echo 6. 切换分支 (git checkout)
echo 7. 退出
echo =========================================
set /p choice="请输入选择 (1-7): "

if "%choice%"=="1" goto PULL
if "%choice%"=="2" goto STATUS
if "%choice%"=="3" goto COMMIT
if "%choice%"=="4" goto PUSH
if "%choice%"=="5" goto LOG
if "%choice%"=="6" goto BRANCH
if "%choice%"=="7" goto EXIT
goto INVALID

:PULL
cls
echo --- 正在拉取最新更改 ---
echo.

:: 获取当前分支
for /f "tokens=*" %%i in ('git branch --show-current') do set current_branch=%%i

echo 当前分支: !current_branch!
set /p confirm="确认从远程拉取更改? (Y/N): "
if /i "!confirm!"=="Y" (
    git pull
    if !ERRORLEVEL! NEQ 0 (
        echo 拉取操作失败，请检查错误信息
    ) else (
        echo 拉取操作成功完成
    )
) else (
    echo 已取消拉取操作
)
echo.
pause
goto MENU

:STATUS
cls
echo --- 详细仓库状态 ---
echo.
git status
echo.
pause
goto MENU

:COMMIT
cls
echo --- 准备添加并提交更改 ---
echo.
echo 当前更改:
git status -s
echo.

echo 添加全部文件 (A) 或选择性添加 (S)?
set /p add_choice=""

if /i "!add_choice!"=="A" (
    git add .
    echo 已添加所有更改到暂存区
) else if /i "!add_choice!"=="S" (
    echo 请手动输入要添加的文件(例如: file1.txt file2.js)
    set /p files=""
    if not "!files!"=="" (
        git add !files!
        echo 已添加选定文件到暂存区
    ) else (
        echo 未指定文件，未添加任何内容
        pause
        goto MENU
    )
) else (
    echo 无效选择，返回主菜单
    pause
    goto MENU
)

echo.
echo 请输入提交信息 (留空将使用自动生成的信息):
set /p msg=""
if "!msg!"=="" (
    set datetime=!date! !time:~0,8!
    set msg=自动提交于 !datetime!
)

echo 提交信息: !msg!
echo 确认提交? (Y/N):
set /p confirm=""
if /i "!confirm!"=="Y" (
    git commit -m "!msg!"
    if !ERRORLEVEL! NEQ 0 (
        echo 提交失败，请检查错误信息
    ) else (
        echo 提交成功完成
    )
) else (
    echo 已取消提交操作
)
echo.
pause
goto MENU

:PUSH
cls
echo --- 提交并推送更改 ---
echo.
echo 当前更改:
git status -s
echo.

:: 先执行提交
echo 添加全部文件 (A) 或选择性添加 (S)?
set /p add_choice=""

if /i "!add_choice!"=="A" (
    git add .
    echo 已添加所有更改到暂存区
) else if /i "!add_choice!"=="S" (
    echo 请手动输入要添加的文件(例如: file1.txt file2.js)
    set /p files=""
    if not "!files!"=="" (
        git add !files!
        echo 已添加选定文件到暂存区
    ) else (
        echo 未指定文件，未添加任何内容
        pause
        goto MENU
    )
) else (
    echo 无效选择，返回主菜单
    pause
    goto MENU
)

echo.
echo 请输入提交信息 (留空将使用自动生成的信息):
set /p msg=""
if "!msg!"=="" (
    set datetime=!date! !time:~0,8!
    set msg=自动提交于 !datetime!
)

echo 提交信息: !msg!
echo 确认提交并推送? (Y/N):
set /p confirm=""
if /i "!confirm!"=="Y" (
    git commit -m "!msg!"
    if !ERRORLEVEL! NEQ 0 (
        echo 提交失败，已取消推送操作
        pause
        goto MENU
    ) else (
        echo 提交成功完成，准备推送...
        
        :: 获取当前分支
        for /f "tokens=*" %%i in ('git branch --show-current') do set current_branch=%%i
        
        echo 将推送到分支: !current_branch!
        echo 确认推送? (Y/N):
        set /p push_confirm=""
        if /i "!push_confirm!"=="Y" (
            git push origin !current_branch!
            if !ERRORLEVEL! NEQ 0 (
                echo 推送失败，请检查错误信息
            ) else (
                echo 推送成功完成
            )
        ) else (
            echo 已取消推送操作
        )
    )
) else (
    echo 已取消操作
)
echo.
pause
goto MENU

:LOG
cls
echo --- 提交历史 ---
echo.
git log --oneline --graph --decorate -n 10
echo.
echo 显示了最近10条提交记录
pause
goto MENU

:BRANCH
cls
echo --- 分支管理 ---
echo.
echo 可用分支列表:
git branch -a
echo.
echo 请输入要切换的分支名称 (或输入'c'取消):
set /p branch=""
if /i "!branch!"=="c" (
    echo 已取消分支切换
) else (
    git checkout !branch!
    if !ERRORLEVEL! NEQ 0 (
        echo 分支切换失败，请检查分支名称是否正确
    ) else (
        echo 已成功切换到分支: !branch!
    )
)
echo.
pause
goto MENU

:INVALID
cls
echo 无效选择。请输入1-7之间的数字。
pause
goto MENU

:EXIT
endlocal
exit /b
