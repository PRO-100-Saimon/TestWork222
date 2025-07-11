# Abelohost Shop

> Интернет-магазин, созданный на Next.js с использованием TypeScript

🔗 **Демо:** [https://test-work222.vercel.app/](https://test-work222.vercel.app/)

## 📖 Описание

Интернет-магазин электроники, построенный с использованием современных веб-технологий. Приложение предоставляет пользователям возможность просматривать и покупать различные категории товаров: ноутбуки, смартфоны, мобильные аксессуары и другие товары.

## ✨ Основные возможности

- 🛒 **Каталог товаров** - Просмотр товаров по категориям
- 🏷️ **Категории товаров**:
  - Ноутбуки
  - Смартфоны
  - Мобильные аксессуары
  - Аксессуары и украшения
- 👤 **Система аутентификации** - Вход в систему

## 🛠️ Технический стек

### Frontend

- **Next.js 15.0.3** - React фреймворк для production
- **TypeScript 5.6.3** - Типизированный JavaScript
- **React 18.3.1** - Библиотека для создания пользовательских интерфейсов
- **SCSS** - CSS препроцессор для стилизации

### Управление состоянием

- **Zustand 5.0.1** - Легковесная библиотека для управления состоянием

### HTTP клиент

- **Axios 1.7.7** - Promise-based HTTP клиент

### Иконки

- **Lucide React 0.454.0** - Современные SVG иконки

### Качество кода

- **ESLint** - Статический анализ кода
- **Prettier** - Форматирование кода
- **Stylelint** - Линтер для CSS/SCSS

## 🗂️ Структура проекта

```
├── app/                          # App Router (Next.js 13+)
│   ├── accessories/              # Страница аксессуаров
│   ├── hot-deals/               # Страница горячих предложений
│   ├── laptops/                 # Страница ноутбуков
│   ├── login/                   # Страница входа
│   ├── mobile-accessories/      # Страница мобильных аксессуаров
│   ├── smartphones/             # Страница смартфонов
│   ├── globals.css              # Глобальные стили
│   ├── layout.tsx               # Корневой layout
│   └── page.tsx                 # Главная страница
├── components/                   # Переиспользуемые компоненты
│   ├── Footer/                  # Футер сайта
│   ├── Header/                  # Шапка с навигацией
│   ├── ProductCard/             # Карточка товара
│   └── ProductGrid/             # Сетка товаров
├── lib/                         # Утилиты и API
│   └── api.ts                   # API клиент
├── store/                       # Zustand stores
│   ├── auth.ts                  # Управление аутентификацией
│   └── products.ts              # Управление товарами
├── types/                       # TypeScript типы
│   └── api.ts                   # Типы для API
└── public/                      # Статичные ресурсы
```

## 🚀 Быстрый старт

### Требования

- Node.js 18.0 или выше
- npm или yarn

### Установка

1. **Клонирование репозитория**

```bash
git clone <repository-url>
cd test-project
```

2. **Установка зависимостей**

```bash
npm install
# или
yarn install
```

3. **Запуск в режиме разработки**

```bash
npm run dev
# или
yarn dev
```

4. **Открыть в браузере**

```
http://localhost:3000
```

## 📝 Доступные скрипты

```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для production
npm run start        # Запуск production сборки
npm run lint         # Проверка кода ESLint
npm run lint:fix     # Автоисправление ESLint
npm run stylelint    # Проверка стилей
npm run stylelint:fix # Автоисправление стилей
npm run format       # Форматирование кода Prettier
npm run format:check # Проверка форматирования
npm run type-check   # Проверка типов TypeScript
```

## 🔌 API Интеграция

Приложение использует [DummyJSON API](https://dummyjson.com/) для получения данных:

### Основные эндпоинты:

- `GET /products` - Получить все товары
- `GET /products/category/{category}` - Товары по категории
- `GET /products/search?q={query}` - Поиск товаров
- `POST /auth/login` - Аутентификация

### Категории товаров:

- `laptops` - Ноутбуки
- `smartphones` - Смартфоны
- `mobile-accessories` - Мобильные аксессуары
- `womens-jewellery` - Женские украшения (используется для аксессуаров)

## 🎨 Стилизация

Проект использует модульные SCSS файлы для компонентов:

- Глобальные стили в `app/globals.css`
- Модульные стили для каждого компонента
- Адаптивный дизайн с медиа-запросами
- Современная цветовая схема и типографика

## 🔐 Аутентификация

Реализована базовая система входа:

- Форма логина с валидацией
- Хранение токена в localStorage
- Автоматическая авторизация запросов
- Состояние аутентификации в Zustand store

### Тестовые данные для входа:

```
Username: emilys
Password: emilyspass
```

## 📱 Адаптивность

Приложение полностью адаптивно и работает на:

- 🖥️ Десктопах (1200px+)
- 📱 Мобильных устройствах (до 767px)

## 🔧 Конфигурация

### Next.js

Конфигурация находится в `next.config.js`:

- Оптимизация изображений
- Настройки сборки
- Переменные окружения

### TypeScript

Настройки в `tsconfig.json`:

- Строгая типизация
- Path mapping для импортов
- Поддержка JSX

## 🚀 Деплой

Проект автоматически деплоится на Vercel:

- **Production:** [https://test-work222.vercel.app/](https://test-work222.vercel.app/)
- Автоматический деплой при пуше в main ветку

---
