@echo off
echo 正在复制Vue构建文件到项目根目录...

:: 复制根目录文件
copy dist\*.* D:\WEB\JetCPPWebsite /Y >nul 2>&1

:: 复制assets目录
xcopy /E /I /Y dist\assets D:\WEB\JetCPPWebsite\assets >nul 2>&1

echo 复制完成！
echo.
echo Vue网站已更新到项目根目录
echo.
pause