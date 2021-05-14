@echo off
setlocal
pushd %~dp0\..

if exist dist (
    rmdir /s /q dist
)

popd
endlocal
