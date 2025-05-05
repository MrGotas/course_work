# Timetable

## Запуск в Docker

1. **Установите зависимости:**
   ```sh
   pnpm install
   ```

2. **Синхронизируйте схему с базой данных:**
   ```sh
   pnpm drizzle-kit push
   ```

3. **Соберите Docker-образ:**
   ```sh
   sudo docker build -t timetable . // создание контейнера
   ```

4. **Запустите контейнер:**
   ```sh
   sudo docker run -e DATABASE_URL="postgresql://never:007822mmnn@172.17.0.1:5432/database" -p 3000:3000 timetable
   ```
