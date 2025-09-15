# ♿ Accessibility требования

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
