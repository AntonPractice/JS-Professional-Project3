# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Копируем только package.json
COPY package*.json ./

# 2. Устанавливаем ВСЕ зависимости (включая dev)
RUN npm ci --legacy-peer-deps

# 3. Копируем остальные файлы
COPY . .

# 4. Собираем приложение
RUN npm run build

# 5. Production образ
FROM node:20-alpine
WORKDIR /app

# 6. Копируем package.json
COPY package*.json ./

# 7. Устанавливаем только production зависимости
RUN npm ci --only=production --legacy-peer-deps

# 8. Копируем собранное приложение
COPY --from=builder /app/dist ./dist

# 9. Открываем порт
EXPOSE 3000

# 10. Команда запуска
CMD ["node", "dist/main.js"]