# Используем официальный образ OpenJDK 23
FROM openjdk:23-jdk-slim

# Устанавливаем рабочий каталог
WORKDIR /app

# Копируем файл сборки Maven в контейнер
COPY pom.xml .

# Копируем скрипт Maven Wrapper в контейнер
COPY .mvn .mvn
COPY mvnw .

# Копируем исходный код в контейнер
COPY src ./src

# Скачиваем зависимости и собираем проект в режиме разработки
RUN ./mvnw dependency:go-offline

# Открываем порт 8080
EXPOSE 8080

# Указываем команду для запуска приложения
CMD ["./mvnw", "spring-boot:run"]