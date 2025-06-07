#!/bin/sh

# Проверка, передан ли параметр для режима (dev или prod)
if [ "$1" = "prod" ]; then
  ENV_FILE=".env.prod"
else
  ENV_FILE=".env"
fi

# Проверка существования файла переменных окружения
if [ ! -f "$ENV_FILE" ]; then
  echo "Environment file $ENV_FILE not found!"
  exit 1
fi

# Запуск Docker Compose с указанным файлом переменных окружения
docker-compose --env-file "$ENV_FILE" up --build
