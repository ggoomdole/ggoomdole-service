#!/bin/bash
set -e

cd /home/ubuntu/ggoomdole-service/apps/api

# 3일 이상 된 로그만 삭제
find . -type f -name "*.log" -mtime +3 -exec rm -f {} \;