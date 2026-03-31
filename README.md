```markdown
# 🧭 Travel App

Веб-приложение для управления маршрутами путешествий.  
Позволяет создавать маршруты, добавлять точки, искать и удобно просматривать поездки.


## ⚙️ Технологии

- Vue 3 (Composition API)
- Nuxt
- Vuex
- Vuetify
- SCSS
- Vitest
- Vue Test Utils

---

## ✨ Функционал

- 📍 Создание маршрутов
- 🗺 Добавление точек маршрута
- 🔍 Поиск и фильтрация маршрутов
- 🗑 Удаление маршрутов и точек
- 📄 Просмотр маршрута на отдельной странице

---

## ✨ Анимация и тема

- Плавная анимация Vue при появлении карточек
- Возможность менять тему приложения с помощью иконки в хэдере
---

## 🧪 Тестирование

Проект покрыт unit и integration тестами.

### ✅ Результаты тестов:

```

✓ app/tests/unit/RouteList.spec.js (1 test) 47ms
✓ app/tests/unit/RouteCard.spec.js (2 tests) 67ms
✓ app/tests/integration/Home.spec.js (1 test) 57ms
✓ app/tests/unit/SearchBar.spec.js (1 test) 55ms
✓ app/tests/unit/NewRouteDialog.spec.js (2 tests) 90ms
✓ app/tests/unit/AppPointDialog.spec.js (2 tests) 85ms
✓ app/tests/integration/ViewRoute.spec.js (3 tests) 133ms

Test Files  7 passed (7)
Tests       12 passed (12)
Duration    17.61s

````

### 🔍 Покрытие:

- Unit тесты компонентов:
  - RouteCard
  - RouteList
  - SearchBar
  - Dialog-компоненты

- Integration тесты:
  - Фильтрация маршрутов
  - Работа страницы маршрута

---

## 🚀 Установка и запуск

```bash
npm install
npm run dev
````

---

## 🧪 Запуск тестов

```bash
npm run test
```

---

## 📁 Структура проекта

```
components/
  RouteCard.vue
  RouteList.vue
  SearchBar.vue
  NewRouteDialog.vue
  AppPointDialog.vue

pages/
  index.vue
  view-route/

store/
  store.js

tests/
  unit/
  integration/
```

---

## 📌 Особенности

* Используется Composition API
* Реализована реактивная фильтрация маршрутов
* Архитектура с разделением на компоненты
* Покрытие тестами (unit + integration)

---

## 💡 Планы на развитие

* Авторизация пользователей
* Сохранение маршрутов в облаке
* Карта с отображением точек (например, через Leaflet)
* Drag & Drop для точек маршрута

---

## 👩‍💻 Автор Калмыкова А.М.

Разработано в рамках обучения 🚀

```

---

## 📸 Скриншоты

### 🏠 Главная страница (светлая тема)
![Главная](./images/light.png)

### 🏠 Главная страница (темная тема)
![Главная](./images/dark.png)

### 🔍 Поиск маршрутов
![Поиск](./images/search.png)

### 📄 Страница маршрута
![Маршрут](./images/detail.png)

---