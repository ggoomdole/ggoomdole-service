#!/bin/bash
set -e

# 프로젝트 디렉토리 이동
cd /home/ubuntu/ggoomdole-service/apps/api

# 1. 이전 빌드 산출물 삭제
rm -rf ./dist
rm -rf ./.next

# 2. node_modules 및 pnpm 캐시 삭제
rm -rf ./node_modules
rm -rf ~/.pnpm-store

# 3. 로그 초기화
> app.log
> error.log

# 4. 임시 파일 삭제
rm -rf /tmp/*