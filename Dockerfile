# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# Устанавливаем зависимости для сборки
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --legacy-peer-deps
RUN npx prisma generate

# Копируем и собираем
COPY . .
RUN npm run build

# Production образ
FROM node:20-alpine
WORKDIR /app

# Устанавливаем production зависимости
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --only=production --legacy-peer-deps
RUN npx prisma generate

# Копируем собранное приложение
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Открываем порт
EXPOSE 3000

# Команда запуска
CMD ["node", "dist/main.js"]