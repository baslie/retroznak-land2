# ⚙️ JavaScript архитектура

### Модульная ES6+ архитектура

**app.js** — точка входа:
```javascript
// Главный файл приложения
import { FormHandler } from './modules/form-handler.js';
import { SmoothScroll } from './modules/smooth-scroll.js';
import { FAQAccordion } from './modules/faq-accordion.js';
import { ProductSelector } from './modules/product-selector.js';
import { Analytics } from './modules/analytics.js';

class RetroZnakApp {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Инициализируем компоненты после загрузки DOM
    document.addEventListener('DOMContentLoaded', () => {
      this.initComponents();
      this.bindGlobalEvents();
      this.startAnalytics();
    });
  }

  initComponents() {
    // Инициализация компонентов
    this.components.formHandler = new FormHandler('#order-form');
    this.components.smoothScroll = new SmoothScroll();
    this.components.faq = new FAQAccordion('.faq-section');
    this.components.productSelector = new ProductSelector('.product-grid');

    console.log('✅ Все компоненты инициализированы');
  }

  bindGlobalEvents() {
    // Глобальные события
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleScroll() {
    // Lazy loading изображений
    this.components.lazyLoader?.checkImages();

    // Анимации при скролле
    this.animateOnScroll();
  }

  handleResize() {
    // Пересчет layout при изменении размера
    this.components.productSelector?.recalculateLayout();
  }

  startAnalytics() {
    this.components.analytics = new Analytics();
    this.components.analytics.trackPageView();
  }

  animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !el.classList.contains('animated')) {
        el.classList.add('animated', 'animate-fade-in');
      }
    });
  }
}

// Запуск приложения
new RetroZnakApp();
```

**modules/form-handler.js** — обработка форм:
```javascript
import { validateForm } from '../utils/validation.js';
import { apiRequest } from '../utils/api.js';

export class FormHandler {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.submitButton = this.form?.querySelector('[type="submit"]');
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.bindInputEvents();
  }

  bindInputEvents() {
    const inputs = this.form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      input.addEventListener('blur', (e) => this.validateField(e.target));
      input.addEventListener('input', (e) => this.clearErrors(e.target));
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) return;

    this.setLoadingState(true);

    try {
      const formData = new FormData(this.form);
      const response = await apiRequest('/php/send-form.php', {
        method: 'POST',
        body: formData
      });

      if (response.success) {
        this.showSuccessMessage();
        this.trackConversion();
        this.form.reset();
      } else {
        this.showErrorMessage(response.message);
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      this.showErrorMessage('Произошла ошибка при отправке. Попробуйте позже.');
    } finally {
      this.setLoadingState(false);
    }
  }

  validateForm() {
    const validation = validateForm(this.form);

    if (!validation.isValid) {
      validation.errors.forEach(error => {
        this.showFieldError(error.field, error.message);
      });

      // Фокус на первое поле с ошибкой
      const firstErrorField = this.form.querySelector('.error');
      if (firstErrorField) {
        firstErrorField.focus();
      }
    }

    return validation.isValid;
  }

  validateField(field) {
    const validation = validateForm(this.form, [field.name]);
    const error = validation.errors.find(e => e.field === field.name);

    if (error) {
      this.showFieldError(field, error.message);
    } else {
      this.clearErrors(field);
    }
  }

  showFieldError(field, message) {
    const fieldElement = typeof field === 'string'
      ? this.form.querySelector(`[name="${field}"]`)
      : field;

    fieldElement.classList.add('error');

    // Показываем сообщение об ошибке
    let errorElement = fieldElement.parentElement.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message text-red-500 text-sm mt-1';
      fieldElement.parentElement.appendChild(errorElement);
    }

    errorElement.textContent = message;
  }

  clearErrors(field) {
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  setLoadingState(loading) {
    if (loading) {
      this.submitButton.disabled = true;
      this.submitButton.classList.add('loading');
      this.submitButton.textContent = 'Отправляем...';
    } else {
      this.submitButton.disabled = false;
      this.submitButton.classList.remove('loading');
      this.submitButton.textContent = 'Отправить заявку';
    }
  }

  showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-4';
    message.innerHTML = `
      <div class="flex items-center">
        <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <p class="font-semibold">Заявка успешно отправлена!</p>
          <p class="text-sm">Мы свяжемся с вами в течение 1 часа.</p>
        </div>
      </div>
    `;

    this.form.insertBefore(message, this.form.firstChild);

    // Автоматически скрыть через 5 секунд
    setTimeout(() => {
      message.remove();
    }, 5000);
  }

  showErrorMessage(text) {
    const message = document.createElement('div');
    message.className = 'error-message bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-4';
    message.textContent = text;

    this.form.insertBefore(message, this.form.firstChild);

    setTimeout(() => {
      message.remove();
    }, 5000);
  }

  trackConversion() {
    // Отслеживание конверсии в аналитике
    if (window.gtag) {
      gtag('event', 'form_submit', {
        'event_category': 'engagement',
        'event_label': 'order_form'
      });
    }

    if (window.ym) {
      ym(YANDEX_METRIKA_ID, 'reachGoal', 'ORDER_FORM_SUBMIT');
    }
  }
}
```

**modules/product-selector.js** — выбор продукта:
```javascript
export class ProductSelector {
  constructor(gridSelector) {
    this.grid = document.querySelector(gridSelector);
    this.selectedProduct = null;
    this.init();
  }

  init() {
    if (!this.grid) return;

    const productCards = this.grid.querySelectorAll('.product-card');
    productCards.forEach(card => {
      this.bindCardEvents(card);
    });
  }

  bindCardEvents(card) {
    const orderButton = card.querySelector('.btn-order');
    const productName = card.dataset.product;
    const productPrice = card.dataset.price;

    if (orderButton) {
      orderButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectProduct(productName, productPrice);
        this.scrollToOrderForm();
      });
    }

    // Hover эффекты для desktop
    if (!('ontouchstart' in window)) {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    }
  }

  selectProduct(name, price) {
    this.selectedProduct = { name, price };

    // Обновляем форму заказа
    this.updateOrderForm(name, price);

    // Отслеживаем выбор в аналитике
    this.trackProductSelection(name);

    console.log(`✅ Выбран продукт: ${name} (${price}₽)`);
  }

  updateOrderForm(productName, price) {
    const orderForm = document.querySelector('#order-form');
    if (!orderForm) return;

    // Обновляем скрытое поле с выбранным продуктом
    const productField = orderForm.querySelector('[name="model"]');
    if (productField) {
      productField.value = productName;
    }

    // Обновляем заголовок формы
    const formTitle = orderForm.querySelector('.form-title');
    if (formTitle) {
      formTitle.textContent = `Заказ ${productName}`;
    }

    // Обновляем информацию о цене в форме
    const priceDisplay = orderForm.querySelector('.price-display');
    if (priceDisplay) {
      priceDisplay.innerHTML = `
        <div class="bg-retro-gold/10 p-4 rounded-lg">
          <p class="text-lg font-semibold text-retro-gold">
            ${productName}: ${price}₽
          </p>
        </div>
      `;
    }
  }

  scrollToOrderForm() {
    const orderSection = document.querySelector('#order');
    if (orderSection) {
      orderSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  trackProductSelection(productName) {
    if (window.gtag) {
      gtag('event', 'select_item', {
        'item_category': 'retroznak',
        'item_name': productName
      });
    }

    if (window.ym) {
      ym(YANDEX_METRIKA_ID, 'reachGoal', 'PRODUCT_SELECTED', {
        product: productName
      });
    }
  }

  recalculateLayout() {
    // Пересчет layout при изменении размера окна
    if (window.innerWidth < 768) {
      // Мобильная версия - убираем hover эффекты
      this.grid.querySelectorAll('.product-card').forEach(card => {
        card.style.transform = '';
      });
    }
  }
}
```

---
