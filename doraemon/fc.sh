#!/bin/bash
if [ $1 == "server" ] || [ $1 == "build" ] || [ $1 == "up" ]
	then
	./scripts/sh/$1.sh $2 $3
fi