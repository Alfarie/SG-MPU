#!/bin/bash

# scp -r ./src root@$1:/

case $1 in 
    --help)
        echo "--template [IP] --> Upload template to specify ip address"
        echo "--module [IP] -->  Upload module dir"
        echo "--module [IP] -->  Upload all files in ./src dir"
        ;;
    --template)
        if [ "$#" -ne 2 ]; then
            echo "Illegal number of parameters"
            exit 0
        fi
        echo "Upload all files to $2"
        scp -r ./LinkitFile root@$2:/root
        ;;
    --module)
        if [ "$#" -ne 2 ]; then
            echo "Illegal number of parameters"
            exit 0
        fi
        echo "upload modules dir to $2"
         scp -r ./src/* root@$2:/root/LinkitFile/src/*
        ;;
    --src)
        if [ "$#" -ne 2 ]; then
            echo "Illegal number of parameters"
            exit 0
        fi
        echo "Upload src files to $2"
        scp -r ./src/ root@$2:/root/LinkitFile/
        ;;
esac