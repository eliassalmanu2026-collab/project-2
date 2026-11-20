# ---------- Стадия 1: сборка статики ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Сначала только манифесты — слой с зависимостями кэшируется
COPY package*.json ./
RUN npm ci

COPY . .

# Заголовок приложения можно передать при сборке:
#   docker build --build-arg VITE_APP_TITLE="Мой список задач" -t todo-app .
ARG VITE_APP_TITLE="Список задач"
ENV VITE_APP_TITLE=$VITE_APP_TITLE

RUN npm run build

# ---------- Стадия 2: production на nginx ----------
FROM nginx:alpine

# Своя конфигурация nginx (SPA-роутинг, gzip, кэш статики)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Готовые файлы из первого этапа
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
