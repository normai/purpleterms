@echo off
rem 20220205`0921 (after 20220123`0821)
rem https://stackoverflow.com/questions/35410336/how-to-compact-local-git-repo [ref 20220123`0812]
rem summary : (1) Expire unreachable content and pack repo (2) Clear reflog

color 2f
title This is %~n0%~x0 by user %USERNAME%
echo ***************************************************************
echo *** This is %~n0%~x0 by user %USERNAME%
echo *** thisdrive = %~d0
echo *** thisdir   = %~dp0
echo *** CWD       = %cd%
echo *** option    = %1
echo ***************************************************************

%~d0
@echo on

git gc --aggressive --prune=now
git reflog expire --expire=now --all

@echo off
pause
