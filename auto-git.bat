@echo off
title Git Helper - %cd%
setlocal

:MENU
cls
echo =========================================
echo             Git Helper Menu
echo =========================================
echo Current Directory: %cd%
echo Repository Status:
git status -s -b --untracked-files=no
echo(
echo Please choose an option:
echo 1. Pull changes from remote (git pull)
echo 2. Add, Commit (auto-msg), and Push changes (git add . & git commit & git push)
echo 3. Exit
echo =========================================
set /p choice="Enter your choice (1, 2, or 3): "

if "%choice%"=="1" goto PULL
if "%choice%"=="2" goto PUSH
if "%choice%"=="3" goto EXIT
goto INVALID

:PULL
cls
echo --- Pulling latest changes ---
git pull
echo(
echo --- Pull operation finished. Press any key to return to menu. ---
pause > nul
goto MENU

:PUSH
cls
echo --- Staging all changes (git add .) ---
git add .
echo(

rem -- Check if there are changes staged for commit --
git diff --quiet --cached
if errorlevel 1 (
    echo --- Creating automatic commit ---
    rem -- Generate a timestamped commit message --
    rem -- Note: Date/Time format depends on your system's locale settings --
    set datetime_msg=%date% %time:~0,8%
    set commit_message="Auto-commit via script at %datetime_msg%"
    echo Commit message: %commit_message%
    git commit -m %commit_message%
    echo(
) else (
    echo --- No changes staged to commit. Skipping commit step. ---
    echo(
)

echo --- Pushing changes to remote (git push) ---
git push
echo(
echo --- Push operation finished. Press any key to return to menu. ---
pause > nul
goto MENU

:INVALID
cls
echo Invalid choice. Please enter 1, 2, or 3.
echo Press any key to try again.
pause > nul
goto MENU

:EXIT
endlocal
exit /b
