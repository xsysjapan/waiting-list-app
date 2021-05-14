@echo off
setlocal
pushd %~dp0\..

call scripts\clean.cmd

mkdir dist
mkdir dist\node_modules
mkdir dist\public
mkdir dist\public\backoffice

rem build backend
pushd backend
call npm install
call npm run build
popd
xcopy /S backend\build dist
xcopy /S backend\node_modules dist\node_modules

rem build frontend
pushd frontend
call npm install
call npm run build
popd
xcopy /S frontend\build dist\public

rem build backoffice
pushd backoffice
call npm install
call npm run build
popd
xcopy /S backoffice\build dist\public\backoffice

popd
endlocal
