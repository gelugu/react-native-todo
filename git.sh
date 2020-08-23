#!/bin/bash

git remote add origin https://github.com/gelugu/react-native-todo.git
git add .
git commit -m $1
git push -u origin master
