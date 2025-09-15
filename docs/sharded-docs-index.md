# 📚 Индекс структурированной документации проекта «Ретрознак»

*Дата создания: 14 сентября 2025 | Product Owner: Sarah*

## 🎯 Обзор

Данная страница является центральным навигатором по всей структурированной (sharded) документации проекта лендинга «Ретрознак». Все документы разбиты на логические компоненты для удобства разработки и создания stories.

---

## 📋 Структура sharded документации

### 🎯 Product Requirements (PRD)

**Папка:** `docs/prd/`
**Источник:** `docs/2-prd.md`

- **[PRD Index](./prd/index.md)** — Навигатор по всем PRD компонентам
- **Основные компоненты:**
  - [Goals & Context](./prd/goals-and-background-context.md)
  - [Requirements](./prd/requirements.md)
  - [User Actions](./prd/user-actions-required.md)
  - [UI Design Goals](./prd/user-interface-design-goals.md)
  - [Technical Assumptions](./prd/technical-assumptions.md)

- **Эпики:**
  - [Epic List](./prd/epic-list.md)
  - [Epic 1: Foundation](./prd/epic-1-foundation-project-setup.md)
  - [Epic 2: Landing Page](./prd/epic-2-complete-landing-page-with-product-matrix-ordering.md)

### 🏗 Architecture Documentation

**Папка:** `docs/architecture/`
**Источник:** `docs/architecture.md`

- **[Architecture Index](./architecture/index.md)** — Навигатор по архитектурной документации
- **Основные компоненты:**
  - [CSS Architecture](./architecture/css.md)
  - [JavaScript Architecture](./architecture/javascript.md)
  - [HTML5 Structure](./architecture/html5.md)
  - [Responsive Design](./architecture/responsive-design-strategy.md)
  - [Rollback & Recovery](./architecture/rollback-recovery-procedures.md)
  - [Deployment & CI/CD](./architecture/deployment-cicd.md)

### 🎨 Front-End Specification

**Папка:** `docs/front-end/`
**Источник:** `docs/front-end-spec.md`

- **[Front-End Index](./front-end/index.md)** — Навигатор по frontend спецификации
- **Основные компоненты:**
  - [UX Strategy](./front-end/ux.md)
  - [Wireframes](./front-end/wireframes.md)
  - [UI Components](./front-end/ui.md)
  - [Accessibility](./front-end/accessibility.md)
  - [Recommendations](./front-end/recommendations.md)

---

## 🔄 Workflow для создания Stories

### 1. Выбор эпика из PRD
1. Перейти в `docs/prd/`
2. Изучить конкретный эпик (Epic 1 или Epic 2)
3. Определить конкретные задачи для разработки

### 2. Техническая спецификация
1. Найти соответствующие компоненты в `docs/architecture/`
2. Изучить технические требования (CSS, JS, HTML5)
3. Проверить процедуры развертывания

### 3. UX/UI требования
1. Использовать компоненты из `docs/front-end/`
2. Применить UX стратегию и wireframes
3. Следовать accessibility требованиям

### 4. Создание Story
После изучения всех компонентов использовать BMad команды:
- `*create-brownfield-story` для создания story
- `*validate-next-story` для валидации

---

## 📊 Статистика разбивки документов

| Документ | Исходный размер | Компонентов | Папка назначения |
|----------|----------------|-------------|------------------|
| **2-prd.md** | 41.8KB | 12 файлов | `docs/prd/` |
| **architecture.md** | 150.7KB | 11 файлов | `docs/architecture/` |
| **front-end-spec.md** | 54.4KB | 7 файлов | `docs/front-end/` |
| **ИТОГО** | 247KB | 30 файлов | 3 папки |

---

## 🎯 Преимущества sharded структуры

### ✅ Для разработчиков
- **Фокусировка** — работа с конкретными компонентами, а не огромными документами
- **Параллельная разработка** — разные разработчики могут работать с разными компонентами
- **Легкая навигация** — быстрый поиск нужной информации

### ✅ Для Product Owner
- **Контроль progress** — четкое видение выполненных компонентов
- **Планирование sprints** — легкое выделение задач из компонентов
- **Quality assurance** — проверка каждого компонента отдельно

### ✅ Для проекта в целом
- **Масштабируемость** — легко добавлять новые компоненты
- **Поддерживаемость** — обновления локализованы в конкретных файлах
- **Повторное использование** — компоненты можно использовать в других проектах

---

## 🚀 Следующие шаги

1. **Валидация структуры** — проверить все ссылки между компонентами
2. **Создание первых stories** — начать с Epic 1 компонентов
3. **Настройка workflow** — интегрировать sharded структуру в процесс разработки

---

*Создано с использованием BMad Method v4+ | Tool: md-tree explode*