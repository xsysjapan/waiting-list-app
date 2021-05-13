@echo off
setlocal
pushd %~dp0\..

if not exist dist (
    call build.cmd
)

rem run node
pushd dist
call node ./src/index.js
popd
popd
endlocal
