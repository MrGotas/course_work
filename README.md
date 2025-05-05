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



console.log(await argon2.hash("007822mmnn"));

sudo docker run \
  --add-host=host.docker.internal:host-gateway \
  -e DATABASE_URL="postgresql://never:007822mmnn@host.docker.internal:5432/database" \
  -p 3000:3000 \
  timetable

проблемы с БД
sudo systemctl status postgresql -- проверка запуска бд
если ошибка - sudo systemctl daemon-reload
проверка статуса: sudo -u postgres pg_isready

если порты заняты
sudo docker stop $(sudo docker ps -aq)
sudo docker rm $(sudo docker ps -aq)
sudo lsof -i :3000

удаление контейнеров
sudo docker container prune


pnpm dev