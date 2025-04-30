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
   sudo docker build -t timetable .
   ```

4. **Запустите контейнер:**
   ```sh
   sudo docker run -e DATABASE_URL="postgresql://never:007822mmnn@10.0.2.15:5432/database" -p 3000:3000 timetable
   ```
