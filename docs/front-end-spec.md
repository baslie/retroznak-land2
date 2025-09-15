# Front-End спецификация лендинга «Ретрознак»

*UX Expert: Анна*
*Дата создания: 14 сентября 2025*
*Версия: 1.0*

---

## 🎯 UX стратегия для максимальной конверсии

### Целевая конверсия: 8-12%

**Основная проблема пользователя:** "Я хочу красивую табличку для дома, но не знаю, что выбрать и можно ли доверять качеству"

**UX решение:** Простой линейный путь с четкими доказательствами качества и прозрачным выбором товара

### Конверсионная воронка

```
Трафик 100% → Интерес 60% → Желание 30% → Действие 12%
       ↓           ↓            ↓            ↓
   Hero блок   Товарная     История +    Заполнение
   + крючок     матрица    доказательства   формы
```

### Ключевые UX принципы

**1. Прозрачность выбора**
- Четкое сравнение 3 моделей в одном экране
- Честное описание недостатков ("Безжалостная гарантия")
- Прямые цены без скрытых платежей

**2. Снижение когнитивной нагрузки**
- Один CTA на экран
- Линейное повествование без развилок
- Простые формы с минимумом полей

**3. Эмоциональная связь + Рациональность**
- История = эмоции (советская ностальгия)
- Технологии = рациональность (материалы, гарантии)
- Social proof = доверие (музеи, отзывы)

---

## 📱 Wireframes ключевых экранов

### Mobile-First подход (320-768px)

#### Экран 1: Hero блок
```
┌─────────────────────────────────┐
│ [☰]              [LOGO]         │
├─────────────────────────────────┤
│                                 │
│    Ретрознак — домовые знаки    │
│      в стиле советского         │
│          времени                │
│                                 │
│   От 1 990 рублей с доставкой   │
│                                 │
│  [БОЛЬШОЕ ФОТО ЗНАКА С СВЕТОМ]  │
│                                 │
│ ✅ Металл, стекло, эмаль        │
│ ✅ LED подсветка                │
│ ✅ Размеры как в оригинале      │
│ ✅ Гарантия до 20 лет           │
│                                 │
│   [ВЫБРАТЬ СВОЙ РЕТРОЗНАК ↓]   │
│                                 │
└─────────────────────────────────┘
```

#### Экран 2: Товарная матрица (стек для мобильных)
```
┌─────────────────────────────────┐
│     Выберите свой ретрознак     │
│                                 │
│ ┌─────────────────────────────┐ │
│ │        ОБЫЧНЫЙ              │ │
│ │     [ФОТО ЗНАКА]            │ │
│ │   • Сталь 1 мм              │ │
│ │   • Плоский дизайн          │ │
│ │   • БЕЗ подсветки           │ │
│ │                             │ │
│ │      1 990 ₽                │ │
│ │  [ЗАКАЗАТЬ ОБЫЧНЫЙ]         │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │     ПЕТРОГРАДСКИЙ ⭐         │ │
│ │     [ФОТО ЗНАКА]            │ │
│ │   • Сталь 0,7 мм            │ │
│ │   • Матовые стекла          │ │
│ │   • БЕЗ подсветки           │ │
│ │                             │ │
│ │      4 300 ₽                │ │
│ │  [ЗАКАЗАТЬ ПЕТРОГРАДСКИЙ]   │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │     ЛЕНИНГРАДСКИЙ 👑        │ │
│ │     [ФОТО ЗНАКА]            │ │
│ │   • Нержавеющая сталь       │ │
│ │   • LED подсветка           │ │
│ │   • ПОЖИЗНЕННАЯ гарантия    │ │
│ │                             │ │
│ │      9 300 ₽                │ │
│ │  [ЗАКАЗАТЬ ЛЕНИНГРАДСКИЙ]   │ │
│ └─────────────────────────────┘ │
│                                 │
│  [ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ]        │
└─────────────────────────────────┘
```

#### Экран 3: Форма заказа
```
┌─────────────────────────────────┐
│        Заказать ретрознак       │
│                                 │
│  Бесплатный макет за 2 часа     │
│                                 │
│ Выбранная модель:               │
│ ┌─────────────────────────────┐ │
│ │ ⚪ Обычный — 1 990 ₽         │ │
│ │ ⚪ Петроградский — 4 300 ₽   │ │
│ │ 🔘 Ленинградский — 9 300 ₽  │ │
│ └─────────────────────────────┘ │
│                                 │
│ Имя *                           │
│ ┌─────────────────────────────┐ │
│ │ [________________]          │ │
│ └─────────────────────────────┘ │
│                                 │
│ Телефон *                       │
│ ┌─────────────────────────────┐ │
│ │ [________________]          │ │
│ └─────────────────────────────┘ │
│                                 │
│ Email                           │
│ ┌─────────────────────────────┐ │
│ │ [________________]          │ │
│ └─────────────────────────────┘ │
│                                 │
│ Адрес (город, улица, дом)       │
│ ┌─────────────────────────────┐ │
│ │ [________________]          │ │
│ │ [________________]          │ │
│ └─────────────────────────────┘ │
│                                 │
│ Комментарии                     │
│ ┌─────────────────────────────┐ │
│ │ [________________]          │ │
│ │ [________________]          │ │
│ └─────────────────────────────┘ │
│                                 │
│     [CAPTCHA]                   │
│                                 │
│ [ПОЛУЧИТЬ БЕСПЛАТНЫЙ МАКЕТ]     │
│                                 │
│  📞 WhatsApp: +7 983 232-22-06  │
│  📧 Email: retroznak@mail.ru    │
└─────────────────────────────────┘
```

### Desktop версия (1024px+)

#### Hero блок Desktop
```
┌─────────────────────────────────────────────────────────────────────┐
│ [LOGO] Ретрознак                                     [☰] Меню        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────┐  ┌────────────────────────────────────────┐ │
│  │                    │  │                                        │ │
│  │   Ретрознак —      │  │                                        │ │
│  │  домовые знаки     │  │        [БОЛЬШОЕ ФОТО ЗНАКА             │ │
│  │   в стиле          │  │         С ПОДСВЕТКОЙ НА ДОМЕ]          │ │
│  │  советского        │  │                                        │ │
│  │   времени          │  │                                        │ │
│  │                    │  │                                        │ │
│  │ От 1 990 рублей    │  │                                        │ │
│  │  с доставкой       │  │                                        │ │
│  │                    │  └────────────────────────────────────────┘ │
│  │ ✅ Металл, стекло   │                                            │ │
│  │ ✅ LED подсветка   │                                            │ │
│  │ ✅ Размеры ориг.   │                                            │ │
│  │ ✅ Гарантия 20 лет │                                            │ │
│  │                    │                                            │ │
│  │ [ВЫБРАТЬ СВОЙ      │                                            │ │
│  │   РЕТРОЗНАК ↓]     │                                            │ │
│  └────────────────────┘                                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Товарная матрица Desktop (3 в ряд)
```
┌─────────────────────────────────────────────────────────────────────┐
│                    Выберите свой ретрознак                          │
│              Три варианта — от экономичного до премиального         │
│                                                                     │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                │
│ │   ОБЫЧНЫЙ   │    │ПЕТРОГРАДСКИЙ│    │ЛЕНИНГРАДСКИЙ│                │
│ │             │    │      ⭐     │    │     👑      │                │
│ │ [ФОТО ЗНАКА]│    │ [ФОТО ЗНАКА]│    │ [ФОТО ЗНАКА]│                │
│ │             │    │             │    │             │                │
│ │• Сталь 1 мм │    │• Сталь 0,7мм│    │• Нержавейка │                │
│ │• Плоский    │    │• Матовые    │    │• LED подсв. │                │
│ │  дизайн     │    │  стекла     │    │• ПОЖИЗНЕННАЯ│                │
│ │• БЕЗ подсв. │    │• БЕЗ подсв. │    │  гарантия   │                │
│ │             │    │             │    │             │                │
│ │   1 990 ₽   │    │   4 300 ₽   │    │   9 300 ₽   │                │
│ │             │    │             │    │             │                │
│ │[ЗАКАЗАТЬ]   │    │[ЗАКАЗАТЬ]   │    │[ЗАКАЗАТЬ]   │                │
│ └─────────────┘    └─────────────┘    └─────────────┘                │
│                                                                     │
│                  [ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ ПО ВЫБОРУ]                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 UI компонентная система

### Цветовая палитра

**Основные цвета:**
- `#1a365d` - Темно-синий (заголовки, навигация)
- `#f7fafc` - Светло-серый (фон страницы)
- `#ffffff` - Белый (карточки, формы)
- `#fbb040` - Золотистый (акценты, кнопки)
- `#e53e3e` - Красный (ошибки, внимание)
- `#38a169` - Зеленый (успех, подтверждения)

**Дополнительные цвета:**
- `#2d3748` - Темно-серый (основной текст)
- `#718096` - Серый (второстепенный текст)
- `#e2e8f0` - Границы и разделители

### Типографика

**Заголовки:**
```css
H1: font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(28px, 5vw, 48px);
    line-height: 1.2;
    color: #1a365d;

H2: font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: clamp(24px, 4vw, 36px);
    line-height: 1.3;
    color: #1a365d;

H3: font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: clamp(20px, 3vw, 28px);
    line-height: 1.4;
    color: #2d3748;
```

**Основной текст:**
```css
body: font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.6;
      color: #2d3748;

.lead: font-size: 18px;
       line-height: 1.7;
       color: #4a5568;
```

### Компоненты кнопок

**Основная CTA кнопка:**
```css
.btn-primary {
  background: linear-gradient(135deg, #fbb040 0%, #f6ad55 100%);
  color: #1a365d;
  font-weight: 600;
  font-size: 18px;
  padding: 16px 32px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 12px rgba(251, 176, 64, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(251, 176, 64, 0.4);
  background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 3px 10px rgba(251, 176, 64, 0.3);
}
```

**Вторичная кнопка:**
```css
.btn-secondary {
  background: transparent;
  color: #1a365d;
  font-weight: 500;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 6px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: #fbb040;
  color: #fbb040;
  background: rgba(251, 176, 64, 0.05);
}
```

### Карточки товаров

**Структура карточки:**
```css
.product-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: #fbb040;
}

.product-card--popular {
  border: 2px solid #fbb040;
  position: relative;
}

.product-card--popular::before {
  content: "⭐ Популярный выбор";
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #fbb040, #f6ad55);
  color: #1a365d;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 0 12px 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-card--premium {
  border: 2px solid #9f7aea;
  background: linear-gradient(135deg, #ffffff 0%, #f7fafc 100%);
}

.product-card--premium::before {
  content: "👑 Максимальное качество";
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #9f7aea, #805ad5);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 0 12px 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### Формы и поля ввода

**Поля ввода:**
```css
.form-input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  background: #ffffff;
  color: #2d3748;
}

.form-input:focus {
  border-color: #fbb040;
  box-shadow: 0 0 0 3px rgba(251, 176, 64, 0.1);
  outline: none;
}

.form-input:invalid {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.form-input::placeholder {
  color: #a0aec0;
}
```

**Лейблы:**
```css
.form-label {
  display: block;
  font-weight: 500;
  font-size: 14px;
  color: #2d3748;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-label--required::after {
  content: " *";
  color: #e53e3e;
  font-weight: bold;
}
```

---

## ⚡ Интерактивные элементы

### Smooth scrolling

```javascript
// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
```

### FAQ аккордеон

```javascript
// Интерактивный FAQ аккордеон
class FAQAccordion {
  constructor() {
    this.items = document.querySelectorAll('.faq-item');
    this.init();
  }

  init() {
    this.items.forEach((item, index) => {
      const header = item.querySelector('.faq-header');
      const content = item.querySelector('.faq-content');
      const icon = item.querySelector('.faq-icon');

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Закрываем все остальные
        this.items.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          otherContent.style.maxHeight = '0';
          otherIcon.style.transform = 'rotate(0deg)';
        });

        // Открываем текущий или закрываем, если уже был открыт
        if (!isActive) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
          icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  new FAQAccordion();
});
```

### Валидация форм в реальном времени

```javascript
// Валидация формы с обратной связью
class FormValidator {
  constructor(formElement) {
    this.form = formElement;
    this.fields = this.form.querySelectorAll('[data-validate]');
    this.init();
  }

  init() {
    this.fields.forEach(field => {
      // Валидация при вводе
      field.addEventListener('input', () => {
        this.validateField(field);
      });

      // Валидация при потере фокуса
      field.addEventListener('blur', () => {
        this.validateField(field);
      });
    });

    // Валидация при отправке
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validateForm();
    });
  }

  validateField(field) {
    const rules = field.getAttribute('data-validate').split('|');
    let isValid = true;
    let message = '';

    rules.forEach(rule => {
      if (!isValid) return;

      switch (rule) {
        case 'required':
          if (!field.value.trim()) {
            isValid = false;
            message = 'Это поле обязательно для заполнения';
          }
          break;

        case 'phone':
          const phoneRegex = /^[\+]?[7|8][\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
          if (field.value && !phoneRegex.test(field.value)) {
            isValid = false;
            message = 'Введите корректный номер телефона';
          }
          break;

        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (field.value && !emailRegex.test(field.value)) {
            isValid = false;
            message = 'Введите корректный email';
          }
          break;
      }
    });

    this.showFieldStatus(field, isValid, message);
    return isValid;
  }

  showFieldStatus(field, isValid, message) {
    const errorElement = field.parentNode.querySelector('.field-error');

    // Удаляем предыдущие классы
    field.classList.remove('valid', 'invalid');

    if (field.value.trim()) {
      field.classList.add(isValid ? 'valid' : 'invalid');
    }

    if (errorElement) {
      errorElement.textContent = isValid ? '' : message;
      errorElement.style.display = isValid ? 'none' : 'block';
    }
  }

  validateForm() {
    let isFormValid = true;

    this.fields.forEach(field => {
      const fieldValid = this.validateField(field);
      if (!fieldValid) isFormValid = false;
    });

    if (isFormValid) {
      this.submitForm();
    } else {
      // Прокручиваем к первому невалидному полю
      const firstInvalidField = this.form.querySelector('.invalid');
      if (firstInvalidField) {
        firstInvalidField.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        firstInvalidField.focus();
      }
    }
  }

  submitForm() {
    // Показать индикатор загрузки
    this.showLoadingState();

    // Получить данные формы
    const formData = new FormData(this.form);

    // Отправить на PHP скрипт
    fetch('/send-form.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        this.showSuccessMessage();
      } else {
        this.showErrorMessage(data.message);
      }
    })
    .catch(error => {
      this.showErrorMessage('Произошла ошибка при отправке формы');
    })
    .finally(() => {
      this.hideLoadingState();
    });
  }

  showLoadingState() {
    const submitBtn = this.form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Отправляем...</span>';
  }

  hideLoadingState() {
    const submitBtn = this.form.querySelector('[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Получить бесплатный макет';
  }

  showSuccessMessage() {
    // Создаем модальное окно успеха
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="success-icon">✅</div>
        <h3>Заявка отправлена!</h3>
        <p>Бесплатный макет пришлем в течение 2 часов на указанный email</p>
        <button class="btn-primary" onclick="this.closest('.success-modal').remove()">Отлично!</button>
      </div>
    `;
    document.body.appendChild(modal);

    // Очищаем форму
    this.form.reset();
    this.fields.forEach(field => {
      field.classList.remove('valid', 'invalid');
    });
  }

  showErrorMessage(message) {
    // Показать уведомление об ошибке
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="error-icon">❌</span>
        <span>${message}</span>
        <button onclick="this.closest('.error-notification').remove()">×</button>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
}
```

### Lazy loading изображений

```javascript
// Ленивая загрузка изображений для производительности
class LazyImageLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.imageObserver = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.imageObserver.unobserve(entry.target);
          }
        });
      });

      this.images.forEach(img => {
        this.imageObserver.observe(img);
      });
    } else {
      // Fallback для старых браузеров
      this.images.forEach(img => {
        this.loadImage(img);
      });
    }
  }

  loadImage(img) {
    img.src = img.dataset.src;
    img.classList.add('loaded');
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  new LazyImageLoader();
});
```

---

## 📱 Адаптивный дизайн

### Breakpoints стратегия

```css
/* Mobile First подход */
/* Extra Small devices (320px and up) */
.container {
  width: 100%;
  max-width: 100%;
  padding: 0 16px;
  margin: 0 auto;
}

/* Small devices (576px and up) */
@media (min-width: 576px) {
  .container {
    max-width: 540px;
    padding: 0 20px;
  }
}

/* Medium devices (768px and up) */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    padding: 0 24px;
  }

  /* Товарная матрица: 2 колонки */
  .product-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  /* Третий элемент во всю ширину */
  .product-card:nth-child(3) {
    grid-column: 1 / -1;
    max-width: 400px;
    margin: 0 auto;
  }
}

/* Large devices (992px and up) */
@media (min-width: 992px) {
  .container {
    max-width: 960px;
    padding: 0 32px;
  }

  /* Товарная матрица: 3 колонки */
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .product-card:nth-child(3) {
    grid-column: auto;
    max-width: none;
    margin: 0;
  }
}

/* Extra large devices (1200px and up) */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

/* Extra extra large devices (1400px and up) */
@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}
```

### Компонентная адаптивность

**Hero секция:**
```css
.hero {
  padding: 40px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .hero {
    padding: 80px 0;
    min-height: 90vh;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
}

@media (min-width: 1200px) {
  .hero {
    padding: 100px 0;
  }

  .hero-grid {
    gap: 80px;
  }
}
```

**Навигация:**
```css
/* Мобильная навигация (гамбургер меню) */
.nav-mobile {
  display: block;
}

.nav-desktop {
  display: none;
}

@media (min-width: 768px) {
  .nav-mobile {
    display: none;
  }

  .nav-desktop {
    display: flex;
    gap: 32px;
  }
}
```

### Тач-оптимизация

```css
/* Увеличенные области нажатия для мобильных */
@media (max-width: 767px) {
  .btn {
    min-height: 48px;
    padding: 16px 24px;
    font-size: 16px;
  }

  .faq-header {
    padding: 20px;
    min-height: 56px;
  }

  .product-card {
    padding: 24px;
    margin-bottom: 24px;
  }

  /* Увеличенные поля ввода */
  .form-input {
    padding: 16px;
    font-size: 16px; /* Предотвращает zoom в iOS Safari */
    min-height: 48px;
  }
}
```

---

## ♿ Accessibility требования

### Семантическая разметка

```html
<!-- Правильная структура заголовков -->
<header role="banner">
  <nav role="navigation" aria-label="Главная навигация">
    <ul>
      <li><a href="#products" aria-label="Перейти к товарам">Товары</a></li>
      <li><a href="#about" aria-label="Перейти к разделу о компании">О нас</a></li>
      <li><a href="#contact" aria-label="Перейти к контактам">Контакты</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Ретрознак — домовые знаки в стиле советского времени</h1>
    <!-- контент секции -->
  </section>

  <section aria-labelledby="products-heading">
    <h2 id="products-heading">Выберите свой ретрознак</h2>
    <!-- товарная матрица -->
  </section>
</main>

<footer role="contentinfo">
  <!-- информация о компании -->
</footer>
```

### ARIA атрибуты

```html
<!-- Формы с правильными лейблами -->
<form role="form" aria-labelledby="order-form-heading">
  <h2 id="order-form-heading">Заказать ретрознак</h2>

  <div class="form-group">
    <label for="user-name" class="form-label">
      Ваше имя <span aria-label="обязательное поле">*</span>
    </label>
    <input
      type="text"
      id="user-name"
      name="name"
      class="form-input"
      required
      aria-required="true"
      aria-describedby="name-error"
      autocomplete="given-name"
    >
    <div id="name-error" class="field-error" role="alert" aria-live="polite"></div>
  </div>

  <div class="form-group">
    <label for="user-phone" class="form-label">
      Телефон <span aria-label="обязательное поле">*</span>
    </label>
    <input
      type="tel"
      id="user-phone"
      name="phone"
      class="form-input"
      required
      aria-required="true"
      aria-describedby="phone-error phone-help"
      autocomplete="tel"
    >
    <div id="phone-help" class="field-help">Формат: +7 (XXX) XXX-XX-XX</div>
    <div id="phone-error" class="field-error" role="alert" aria-live="polite"></div>
  </div>
</form>

<!-- FAQ аккордеон -->
<section aria-labelledby="faq-heading">
  <h2 id="faq-heading">Часто задаваемые вопросы</h2>

  <div class="faq-list">
    <div class="faq-item">
      <button
        class="faq-header"
        aria-expanded="false"
        aria-controls="faq-content-1"
        id="faq-button-1"
      >
        <span>В чем разница между моделями?</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div
        class="faq-content"
        id="faq-content-1"
        aria-labelledby="faq-button-1"
        role="region"
      >
        <p>Стандарт — плоский дизайн без подсветки...</p>
      </div>
    </div>
  </div>
</section>

<!-- Товарные карточки -->
<div class="product-card" role="article" aria-labelledby="product-1-name">
  <img
    src="petrogradsky.webp"
    alt="Петроградский ретрознак с матовыми стеклами на кирпичном доме"
    class="product-image"
  >

  <h3 id="product-1-name" class="product-name">Петроградский</h3>
  <p class="product-description">Популярный выбор</p>

  <ul class="product-features" aria-label="Характеристики товара">
    <li>Сталь 0,7 мм</li>
    <li>Матовые стекла</li>
    <li>БЕЗ подсветки</li>
  </ul>

  <div class="product-price" aria-label="Цена">
    <span class="price-value">4 300 ₽</span>
  </div>

  <button
    class="btn-primary product-order"
    aria-describedby="product-1-name"
  >
    Заказать Петроградский
  </button>
</div>
```

### Навигация с клавиатуры

```css
/* Видимые фокус индикаторы */
:focus {
  outline: 2px solid #fbb040;
  outline-offset: 2px;
}

/* Скрываем outline только для мыши */
:focus:not(:focus-visible) {
  outline: none;
}

/* Усиленный фокус для клавиатурных пользователей */
:focus-visible {
  outline: 3px solid #fbb040;
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(251, 176, 64, 0.2);
}

/* Кнопки должны быть четко видимы при фокусе */
.btn:focus-visible {
  transform: translateY(-2px);
  box-shadow:
    0 0 0 3px rgba(251, 176, 64, 0.3),
    0 6px 20px rgba(251, 176, 64, 0.4);
}

/* Интерактивные элементы должны показывать hover состояние */
.faq-header:focus-visible,
.product-card:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

### JavaScript для accessibility

```javascript
// Skip links для быстрой навигации
class SkipLinks {
  constructor() {
    this.createSkipLinks();
  }

  createSkipLinks() {
    const skipNav = document.createElement('nav');
    skipNav.className = 'skip-links';
    skipNav.innerHTML = `
      <a href="#main-content" class="skip-link">Перейти к основному содержимому</a>
      <a href="#products" class="skip-link">Перейти к товарам</a>
      <a href="#order-form" class="skip-link">Перейти к форме заказа</a>
    `;
    document.body.insertBefore(skipNav, document.body.firstChild);
  }
}

// Управление фокусом в модальных окнах
class ModalFocusManager {
  constructor(modal) {
    this.modal = modal;
    this.focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
    this.previouslyFocusedElement = null;
  }

  open() {
    this.previouslyFocusedElement = document.activeElement;
    this.modal.setAttribute('aria-hidden', 'false');
    this.firstFocusableElement.focus();

    // Trap focus внутри модального окна
    this.modal.addEventListener('keydown', this.handleTabKey.bind(this));
  }

  close() {
    this.modal.setAttribute('aria-hidden', 'true');
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
    this.modal.removeEventListener('keydown', this.handleTabKey.bind(this));
  }

  handleTabKey(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }
}

// Объявления для screen readers
class ScreenReaderAnnouncements {
  constructor() {
    this.createLiveRegion();
  }

  createLiveRegion() {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    document.body.appendChild(this.liveRegion);
  }

  announce(message, priority = 'polite') {
    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;

    // Очищаем сообщение через 1 секунду
    setTimeout(() => {
      this.liveRegion.textContent = '';
    }, 1000);
  }
}

// Инициализация accessibility функций
document.addEventListener('DOMContentLoaded', () => {
  new SkipLinks();
  window.announcer = new ScreenReaderAnnouncements();

  // Объявляем успешную отправку формы
  document.addEventListener('formSubmitSuccess', () => {
    window.announcer.announce('Форма успешно отправлена. Макет будет готов в течение 2 часов.', 'assertive');
  });
});
```

### CSS для скрытого контента

```css
/* Контент только для screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Skip links */
.skip-links {
  position: absolute;
  top: -40px;
  left: 6px;
  z-index: 1000;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #1a365d;
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1001;
  transition: all 0.3s ease;
}

.skip-link:focus {
  top: 6px;
}

/* Достаточный цветовой контраст */
.text-primary { color: #1a365d; } /* Контраст: 4.5:1 */
.text-secondary { color: #4a5568; } /* Контраст: 7.4:1 */
.text-muted { color: #718096; } /* Контраст: 4.6:1 */
```

---

## 📊 Метрики и аналитика

### Отслеживание конверсионных событий

```javascript
// Система отслеживания конверсионных событий
class ConversionTracking {
  constructor() {
    this.init();
  }

  init() {
    // Отслеживание просмотра товарной матрицы
    this.trackSectionView('#products', 'product_matrix_viewed');

    // Отслеживание кликов по товарам
    this.trackProductClicks();

    // Отслеживание заполнения формы
    this.trackFormEngagement();

    // Отслеживание отправки формы
    this.trackFormSubmission();
  }

  trackSectionView(selector, eventName) {
    const section = document.querySelector(selector);
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          this.sendEvent(eventName, {
            section: selector,
            timestamp: Date.now()
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(section);
  }

  trackProductClicks() {
    document.querySelectorAll('.product-order').forEach(button => {
      button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.price-value').textContent;

        this.sendEvent('product_click', {
          product_name: productName,
          product_price: productPrice,
          button_text: e.target.textContent
        });
      });
    });
  }

  trackFormEngagement() {
    const form = document.querySelector('#order-form');
    if (!form) return;

    let formStarted = false;
    let fieldsCompleted = new Set();

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        if (!formStarted) {
          formStarted = true;
          this.sendEvent('form_started');
        }

        if (field.value.trim()) {
          fieldsCompleted.add(field.name);

          // Отслеживаем прогресс заполнения
          const totalFields = form.querySelectorAll('[required]').length;
          const completionRate = (fieldsCompleted.size / totalFields) * 100;

          if (completionRate >= 50 && !this.formHalfCompleted) {
            this.formHalfCompleted = true;
            this.sendEvent('form_half_completed', {
              completion_rate: completionRate
            });
          }
        }
      });
    });
  }

  trackFormSubmission() {
    document.addEventListener('formSubmitSuccess', (e) => {
      this.sendEvent('form_submitted', {
        product_selected: e.detail.product,
        form_completion_time: e.detail.completionTime
      });
    });

    document.addEventListener('formSubmitError', (e) => {
      this.sendEvent('form_error', {
        error_message: e.detail.error
      });
    });
  }

  sendEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        custom_map: parameters,
        event_category: 'engagement',
        event_label: 'retroznak_landing'
      });
    }

    // Яндекс.Метрика
    if (typeof ym !== 'undefined') {
      ym(89123456, 'reachGoal', eventName, parameters);
    }

    // Facebook Pixel (если используется)
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, parameters);
    }

    console.log('Event tracked:', eventName, parameters);
  }
}

// Инициализация отслеживания
document.addEventListener('DOMContentLoaded', () => {
  new ConversionTracking();
});
```

### Яндекс.Метрика настройки

```javascript
// Расширенная настройка Яндекс.Метрики
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],
  k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(89123456, "init", {
  clickmap: true,              // Карта кликов
  trackLinks: true,            // Отслеживание внешних ссылок
  accurateTrackBounce: true,   // Точный показатель отказов
  webvisor: true,              // Вебвизор
  trackHash: true,             // Отслеживание хеша URL
  ecommerce: "dataLayer"       // Электронная торговля
});

// Настройка целей
const setupYandexGoals = () => {
  // Цель: Просмотр товарной матрицы
  document.addEventListener('product_matrix_viewed', () => {
    ym(89123456, 'reachGoal', 'PRODUCTS_VIEW');
  });

  // Цель: Клик по товару
  document.addEventListener('product_click', (e) => {
    ym(89123456, 'reachGoal', 'PRODUCT_INTEREST', {
      product_name: e.detail.product_name
    });
  });

  // Цель: Начало заполнения формы
  document.addEventListener('form_started', () => {
    ym(89123456, 'reachGoal', 'FORM_START');
  });

  // Цель: Отправка формы (основная)
  document.addEventListener('form_submitted', () => {
    ym(89123456, 'reachGoal', 'ORDER_FORM_SUBMIT');
  });
};

setupYandexGoals();
```

---

## 🔧 Техническая реализация

### Файловая структура проекта

```
retroznak-landing/
├── index.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components/
│   │   │   ├── hero.css
│   │   │   ├── product-matrix.css
│   │   │   ├── forms.css
│   │   │   └── faq.css
│   │   └── utilities/
│   │       ├── variables.css
│   │       └── accessibility.css
│   ├── js/
│   │   ├── main.js
│   │   ├── components/
│   │   │   ├── form-validator.js
│   │   │   ├── faq-accordion.js
│   │   │   └── lazy-loading.js
│   │   └── utils/
│   │       ├── analytics.js
│   │       └── accessibility.js
│   └── images/
│       ├── products/
│       │   ├── petrogradsky.webp
│       │   ├── leningradsky.webp
│       │   └── standard.webp
│       ├── hero/
│       │   └── hero-retroznak.webp
│       └── icons/
├── php/
│   └── send-form.php
└── docs/
    └── front-end-spec.md
```

### CSS архитектура (BEM + утилиты)

```css
/* Основные компоненты в BEM стиле */

/* Hero блок */
.hero {
  /* стили секции */
}

.hero__content {
  /* стили контента */
}

.hero__title {
  /* стили заголовка */
}

.hero__image {
  /* стили изображения */
}

/* Товарная матрица */
.product-matrix {
  /* стили секции */
}

.product-card {
  /* базовые стили карточки */
}

.product-card--popular {
  /* модификатор популярного товара */
}

.product-card--premium {
  /* модификатор премиум товара */
}

.product-card__image {
  /* стили изображения товара */
}

.product-card__title {
  /* стили названия товара */
}

.product-card__features {
  /* стили списка характеристик */
}

.product-card__price {
  /* стили цены */
}

.product-card__button {
  /* стили кнопки заказа */
}

/* Утилитарные классы */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }

.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }

.grid { display: grid; }
.flex { display: flex; }
.hidden { display: none; }

.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

.w-full { width: 100%; }
.h-full { height: 100%; }

.rounded { border-radius: 0.25rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }

.shadow { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.shadow-lg { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); }
.shadow-xl { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); }
```

### JavaScript модульная архитектура

```javascript
// main.js - точка входа
import { FormValidator } from './components/form-validator.js';
import { FAQAccordion } from './components/faq-accordion.js';
import { LazyImageLoader } from './components/lazy-loading.js';
import { ConversionTracking } from './utils/analytics.js';
import { AccessibilityManager } from './utils/accessibility.js';

class LandingApp {
  constructor() {
    this.init();
  }

  async init() {
    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initComponents());
    } else {
      this.initComponents();
    }
  }

  initComponents() {
    // Инициализируем основные компоненты
    this.formValidator = new FormValidator();
    this.faqAccordion = new FAQAccordion();
    this.lazyLoader = new LazyImageLoader();
    this.analytics = new ConversionTracking();
    this.accessibility = new AccessibilityManager();

    // Настраиваем взаимодействие между компонентами
    this.setupComponentCommunication();

    // Запускаем отслеживание производительности
    this.trackPerformanceMetrics();
  }

  setupComponentCommunication() {
    // Связываем отправку формы с аналитикой
    document.addEventListener('formSubmitSuccess', (e) => {
      this.analytics.trackConversion('form_submit', e.detail);
    });

    // Связываем accessibility объявления с формой
    document.addEventListener('formValidationError', (e) => {
      this.accessibility.announce(e.detail.message, 'assertive');
    });
  }

  trackPerformanceMetrics() {
    // Отслеживаем Core Web Vitals
    if ('web-vitals' in window) {
      import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }
  }
}

// Запуск приложения
new LandingApp();
```

---

## 🚀 Итоговые рекомендации

### Приоритеты разработки

1. **Phase 1: Критический функционал**
   - HTML структура + базовые стили
   - Товарная матрица с адаптивностью
   - Форма заказа + PHP интеграция
   - Базовая валидация

2. **Phase 2: UX улучшения**
   - FAQ аккордеон
   - Smooth scrolling
   - Анимации и переходы
   - Lazy loading изображений

3. **Phase 3: Оптимизации**
   - Accessibility полный комплект
   - Продвинутая аналитика
   - Performance оптимизации
   - A/B тесты интеграция

### Ключевые метрики успеха

- **Конверсия:** 8-12% (главная цель)
- **Время загрузки:** < 2.5 секунд на мобильных
- **Core Web Vitals:** все в зеленой зоне
- **Accessibility:** WCAG 2.1 AA соответствие
- **Bounce Rate:** < 60%

### Риски и митигация

**Риск:** Низкая производительность на мобильных
**Митигация:** WebP изображения, lazy loading, критический CSS

**Риск:** Плохая конверсия формы
**Митигация:** A/B тест количества полей, упрощение процесса

**Риск:** Проблемы с доступностью
**Митигация:** Тестирование с реальными screen readers

---

## 📋 Change Log

| Дата | Версия | Изменения | Автор |
|------|--------|-----------|-------|
| 14.09.2025 | 1.0 | Начальная версия front-end спецификации | UX Expert Анна |

---

*Front-end спецификация готова для архитектурной и implementation фазы! 🎨*