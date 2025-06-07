FROM hogepodge/notebook-pytorch:latest

WORKDIR /app

COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальной проект
COPY . .

# Экспонируем порт Flask
EXPOSE 5000

# Запуск приложения
CMD ["python3", "app.py"]