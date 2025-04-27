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
   docker build -t timetable .
   ```

4. **Запустите контейнер:**
   ```sh
   docker run -e DATABASE_URL=ссылка_на_бд_из_.env -p 3000:3000 timetable
   ```
