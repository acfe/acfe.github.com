#!/bin/bash
if [ $1 == "test" ]
	then
	mkdir dist/bak
    cd dist/bak
    dirdate=`date +%Y%m%d`_`date +%H%M%S`
    mkdir $dirdate
    #scp -r appdeploy@10.204.56.75:/app/nginx/html/mall.fcbox.com/mall-sit2.fcbox.com/frontend $dirdate
    cd ../
    rm -rf frontend
    mv test frontend
    #scp -r frontend appdeploy@10.204.56.75:/app/nginx/html/mall.fcbox.com/mall-sit2.fcbox.com/
fi