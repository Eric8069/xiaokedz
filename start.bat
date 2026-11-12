@echo off
rem ============================================================
rem  Xiaokedz - open the site in a browser
rem  Just double-click this file.
rem ============================================================
setlocal
cd /d "%~dp0"

set "TARGET=%~dp0index.html"
set "URL=file:///%TARGET:\=/%"

if not exist "%TARGET%" (
  echo [ERROR] index.html not found next to this file.
  echo Please keep start.bat and index.html in the same folder.
  pause
  exit /b 1
)

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "CHROME86=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "EDGE64=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

if exist "%CHROME%"   ( start "" "%CHROME%"   "%URL%" & goto :ok )
if exist "%CHROME86%" ( start "" "%CHROME86%" "%URL%" & goto :ok )
if exist "%EDGE%"     ( start "" "%EDGE%"     "%URL%" & goto :ok )
if exist "%EDGE64%"   ( start "" "%EDGE64%"   "%URL%" & goto :ok )

rem fallback: use the default program for .html
start "" "%TARGET%"

:ok
echo Site opened in your browser.
echo If nothing happens, drag index.html into Chrome or Edge manually.
timeout /t 3 >nul
exit /b 0
