# Dockerfile
FROM node:20-alpine

WORKDIR /app

# 1. Копируем package.json и package-lock.json
COPY package*.json ./

# 2. Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# 3. Копируем остальной код
COPY . .

# 4. Собираем проект
RUN npm run build

# 5. Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=3000

# 6. Открываем порт
EXPOSE 3000

# 7. Запускаем приложение
CMD ["node", "dist/main.js"]