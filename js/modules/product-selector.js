/**
 * Класс ProductSelector для обработки выбора продукта
 * Интегрируется с FormHandler для автозаполнения полей формы
 */
class ProductSelector {
    constructor() {
        this.selectedProduct = null;
        this.formHandler = null;
        this.productData = {
            'obyichnyiy': { price: 1990, name: 'Обычный ретрознак' },
            'petrogradskiy': { price: 4300, name: 'Петроградский ретрознак' },
            'leningradskiy': { price: 9300, name: 'Ленинградский ретрознак' }
        };
        this.init();
    }

    /**
     * Инициализация компонента
     */
    init() {
        this.bindCardEvents();
        console.log('✅ ProductSelector: Инициализирован');
    }

    /**
     * Привязка событий к карточкам продуктов и кнопкам заказа
     */
    bindCardEvents() {
        // Обработка кликов по карточкам продуктов
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('click', (event) => {
                const productModel = this.extractModelFromCard(card);
                if (productModel) {
                    this.selectProduct(productModel);
                    // Прокрутка к форме после выбора
                    this.scrollToForm();
                }
            });
        });

        // Обработка кнопок "Заказать"
        const orderButtons = document.querySelectorAll('.btn-order');
        orderButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                // Получаем модель из data-атрибута кнопки
                const productModel = button.getAttribute('data-model');
                const productPrice = button.getAttribute('data-price');

                if (productModel && this.productData[productModel]) {
                    this.selectProduct(productModel);
                    this.scrollToForm();
                } else {
                    // Fallback - пытаемся извлечь из карточки
                    const productCard = button.closest('.product-card');
                    if (productCard) {
                        const extractedModel = this.extractModelFromCard(productCard);
                        if (extractedModel) {
                            this.selectProduct(extractedModel);
                            this.scrollToForm();
                        }
                    }
                }
            });
        });
    }

    /**
     * Извлечение модели продукта из карточки
     * @param {HTMLElement} card - Карточка продукта
     * @returns {string|null} - Модель продукта
     */
    extractModelFromCard(card) {
        // Ищем модель в data-атрибуте кнопки заказа
        const orderButton = card.querySelector('.btn-order');
        if (orderButton) {
            const dataModel = orderButton.getAttribute('data-model');
            if (dataModel && this.productData[dataModel]) {
                return dataModel;
            }
        }

        // Ищем модель в data-атрибуте самой карточки
        const dataModel = card.getAttribute('data-model');
        if (dataModel && this.productData[dataModel]) {
            return dataModel;
        }

        // Ищем по тексту в заголовке карточки
        const titleElement = card.querySelector('h3, .product-title, [data-product-title]');
        if (titleElement) {
            const title = titleElement.textContent.trim().toLowerCase();

            // Дополнительные варианты поиска по новым названиям
            if (title.includes('петроград')) {
                return 'petrogradskiy';
            }
            if (title.includes('ленинград')) {
                return 'leningradskiy';
            }
            if (title.includes('обычный') || title.includes('базовый') || title.includes('стандарт')) {
                return 'obyichnyiy';
            }
        }

        console.warn('❌ ProductSelector: Не удалось определить модель продукта из карточки', card);
        return null;
    }

    /**
     * Выбор продукта и обновление формы
     * @param {string} productModel - Модель выбранного продукта
     */
    selectProduct(productModel) {
        if (!this.productData[productModel]) {
            console.error('❌ ProductSelector: Неизвестная модель продукта:', productModel);
            return;
        }

        this.selectedProduct = {
            model: productModel,
            ...this.productData[productModel]
        };

        // Обновляем форму
        this.updateFormFields();

        // Обновляем визуальные элементы
        this.updateFormTitle();
        this.updatePriceDisplay();

        console.log('✅ ProductSelector: Выбран продукт:', this.selectedProduct);

        // Отправляем кастомное событие для интеграции с другими компонентами
        const event = new CustomEvent('product-selected', {
            detail: this.selectedProduct
        });
        document.dispatchEvent(event);
    }

    /**
     * Обновление полей формы
     */
    updateFormFields() {
        // Обновляем поле модели в форме
        const modelField = document.querySelector('select[name="model"]');
        if (modelField) {
            modelField.value = this.selectedProduct.model;

            // Запускаем событие change для валидации
            const changeEvent = new Event('change', { bubbles: true });
            modelField.dispatchEvent(changeEvent);
        }
    }

    /**
     * Обновление заголовка формы с выбранным продуктом
     */
    updateFormTitle() {
        const formTitleElement = document.querySelector('#contact-title, .form-title, .contact h2');
        if (formTitleElement) {
            formTitleElement.textContent = `Заказать ${this.selectedProduct.name}`;
        }
    }

    /**
     * Обновление отображения цены в форме
     */
    updatePriceDisplay() {
        // Ищем элемент для отображения цены
        let priceElement = document.querySelector('.form-price-display');

        if (!priceElement) {
            // Создаем элемент для цены если его нет
            const form = document.querySelector('.contact-form');
            if (form) {
                priceElement = document.createElement('div');
                priceElement.className = 'form-price-display';
                priceElement.style.cssText = `
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid var(--retro-gold);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    text-align: center;
                    color: var(--retro-gold);
                    font-weight: bold;
                `;

                // Вставляем перед первым элементом формы
                form.insertBefore(priceElement, form.firstElementChild);
            }
        }

        if (priceElement) {
            priceElement.innerHTML = `
                <div style="font-size: 1.125rem;">
                    Выбранная модель: <span style="color: white;">${this.selectedProduct.name}</span>
                </div>
                <div style="font-size: 1.5rem; margin-top: 0.5rem;">
                    Стоимость: <span style="color: white;">${this.formatPrice(this.selectedProduct.price)}</span>
                </div>
            `;
        }
    }

    /**
     * Форматирование цены
     * @param {number} price - Цена
     * @returns {string} - Отформатированная цена
     */
    formatPrice(price) {
        return `${price.toLocaleString('ru-RU')} ₽`;
    }

    /**
     * Прокрутка к форме заказа
     */
    scrollToForm() {
        const formElement = document.querySelector('.contact-form, .contact');
        if (formElement) {
            formElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Получение текущего выбранного продукта
     * @returns {Object|null} - Данные выбранного продукта
     */
    getSelectedProduct() {
        return this.selectedProduct;
    }

    /**
     * Программная установка выбранного продукта
     * @param {string} productModel - Модель продукта
     */
    setSelectedProduct(productModel) {
        this.selectProduct(productModel);
    }

    /**
     * Очистка выбора продукта
     */
    clearSelection() {
        this.selectedProduct = null;

        // Очищаем форму
        const modelField = document.querySelector('select[name="model"]');
        if (modelField) {
            modelField.value = '';
        }

        // Восстанавливаем исходный заголовок
        const formTitleElement = document.querySelector('#contact-title, .form-title, .contact h2');
        if (formTitleElement) {
            formTitleElement.textContent = 'Заказать ретрознак';
        }

        // Удаляем отображение цены
        const priceElement = document.querySelector('.form-price-display');
        if (priceElement) {
            priceElement.remove();
        }

        console.log('✅ ProductSelector: Выбор продукта очищен');
    }
}