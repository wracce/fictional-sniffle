#!/bin/bash

ENV_FILE=".env"
EXTRA_COMPOSE="$1"

shift 

if [ -f .env.example ]; then
  ENV_FILE=".env.example"
  echo "WRN  ⚠️ Файл .env не найден. Используем .env.example"
fi

docker-compose \
  --env-file "$ENV_FILE" \
  -f docker-compose.yml \
  -f "$EXTRA_COMPOSE" \
  up -d "$@"
