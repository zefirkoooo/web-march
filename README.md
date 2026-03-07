# Открытка к 8 марта

## Вводная информация:

- `/` - романтичная открытка для девушки 
- `/friends` - шуточная открытка для парней

### Запуск:

#### Требования, для установки

- Установка Docker

1) Билд сборки и запуск
```
docker build -t march .
docker run -d \
  --name web-march \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file /root/web-march/.env \
  march
```

___

#### Требования, для установки

- **Node.js** версии 18.17 или выше
- **pnpm** (рекомендуется), npm или yarn — менеджер пакетов
- **Домен** или **хостинг** с поддержкой Node.js

1) Клонирование проекта
```
git clone https://github.com/zefirkoooo/web-march.git
cd web-march
```

2) Установка зависимостей и запуск dev-сервер
```
pnpm install
pnpm dev
```

Сайт будет доступен по адресу `http://localhost:3000`.

### Сборка для продакшена

```
pnpm build
pnpm start
```
