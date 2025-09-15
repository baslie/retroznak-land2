/**
 * Класс FormHandler для обработки всех форм на сайте
 * Обеспечивает валидацию, отправку и обработку ответов
 */
class FormHandler {
    constructor() {
        this.forms = new Map();
        this.isSubmitting = false;
        this.init();
    }

    /**
     * Инициализация обработчика форм
     */
    init() {
        this.bindFormEvents();
        this.initValidation();
        console.log('✅ FormHandler: Инициализирован');
    }

    /**
     * Привязка событий для всех форм
     */
    bindFormEvents() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            const formId = form.getAttribute('id') || `form_${Date.now()}_${Math.random()}`;
            form.setAttribute('id', formId);

            this.forms.set(formId, {
                element: form,
                validators: [],
                isValid: false,
                submitAttempted: false
            });

            // Обработка отправки формы
            form.addEventListener('submit', (event) => {
                this.handleSubmit(event, formId);
            });

            // Валидация полей в реальном времени
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input, formId);
                });

                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        });
    }

    /**
     * Инициализация правил валидации
     */
    initValidation() {
        // Добавление базовых валидаторов
        this.addValidator('required', (value) => {
            return value.trim() !== '';
        }, 'Это поле обязательно для заполнения');

        this.addValidator('email', (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        }, 'Введите корректный email адрес');

        this.addValidator('phone', (value) => {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            return phoneRegex.test(value.replace(/\s/g, ''));
        }, 'Введите корректный номер телефона');

        this.addValidator('minLength', (value, min) => {
            return value.length >= min;
        }, 'Слишком короткое значение');

        this.addValidator('maxLength', (value, max) => {
            return value.length <= max;
        }, 'Слишком длинное значение');
    }

    /**
     * Добавление кастомного валидатора
     */
    addValidator(name, validatorFn, errorMessage) {
        this[`validate_${name}`] = { fn: validatorFn, message: errorMessage };
    }

    /**
     * Обработка отправки формы
     */
    async handleSubmit(event, formId) {
        event.preventDefault();

        if (this.isSubmitting) {
            return;
        }

        const formData = this.forms.get(formId);
        if (!formData) {
            console.error('❌ Форма не найдена:', formId);
            return;
        }

        const form = formData.element;
        formData.submitAttempted = true;

        // Валидация всех полей
        const isValid = this.validateForm(formId);

        if (!isValid) {
            this.showFormErrors(formId);
            return;
        }

        // Подготовка данных для отправки
        const submitData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');

        try {
            this.setSubmittingState(true, submitButton);

            const response = await this.submitForm(form, submitData);

            if (response.success) {
                this.handleSubmitSuccess(formId, response);
            } else {
                this.handleSubmitError(formId, response.message || 'Ошибка отправки формы');
            }

        } catch (error) {
            console.error('❌ Ошибка отправки формы:', error);
            this.handleSubmitError(formId, 'Произошла ошибка при отправке. Попробуйте позже.');
        } finally {
            this.setSubmittingState(false, submitButton);
        }
    }

    /**
     * Отправка формы на сервер
     */
    async submitForm(form, formData) {
        const action = form.getAttribute('action') || 'php/send-form.php';
        const method = form.getAttribute('method') || 'POST';

        const response = await fetch(action, {
            method: method,
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            const text = await response.text();
            // Попытка парсинга как JSON, иначе считаем успешной отправкой
            try {
                return JSON.parse(text);
            } catch {
                return { success: true, message: 'Форма отправлена успешно' };
            }
        }
    }

    /**
     * Валидация всей формы
     */
    validateForm(formId) {
        const formData = this.forms.get(formId);
        if (!formData) return false;

        const form = formData.element;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input, formId)) {
                isValid = false;
            }
        });

        formData.isValid = isValid;
        return isValid;
    }

    /**
     * Валидация отдельного поля
     */
    validateField(input, formId) {
        const value = input.value;
        const validators = this.getFieldValidators(input);
        let isValid = true;
        let errorMessage = '';

        for (const validator of validators) {
            const validatorFn = this[`validate_${validator.type}`];
            if (validatorFn) {
                const result = validator.params ?
                    validatorFn.fn(value, ...validator.params) :
                    validatorFn.fn(value);

                if (!result) {
                    isValid = false;
                    errorMessage = validator.message || validatorFn.message;
                    break;
                }
            }
        }

        if (isValid) {
            this.clearFieldError(input);
        } else {
            this.showFieldError(input, errorMessage);
        }

        return isValid;
    }

    /**
     * Получение валидаторов для поля
     */
    getFieldValidators(input) {
        const validators = [];
        const type = input.type;
        const required = input.hasAttribute('required');

        if (required) {
            validators.push({ type: 'required' });
        }

        // Специальные валидаторы по типу поля
        if (type === 'email') {
            validators.push({ type: 'email' });
        }

        if (type === 'tel' || input.name === 'phone') {
            validators.push({ type: 'phone' });
        }

        // Валидаторы по атрибутам
        const minLength = input.getAttribute('minlength');
        if (minLength) {
            validators.push({
                type: 'minLength',
                params: [parseInt(minLength)],
                message: `Минимум ${minLength} символов`
            });
        }

        const maxLength = input.getAttribute('maxlength');
        if (maxLength) {
            validators.push({
                type: 'maxLength',
                params: [parseInt(maxLength)],
                message: `Максимум ${maxLength} символов`
            });
        }

        return validators;
    }

    /**
     * Отображение ошибки поля
     */
    showFieldError(input, message) {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');

        let errorElement = input.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.setAttribute('role', 'alert');
            input.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    /**
     * Очистка ошибки поля
     */
    clearFieldError(input) {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');

        const errorElement = input.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    /**
     * Отображение ошибок формы
     */
    showFormErrors(formId) {
        const formData = this.forms.get(formId);
        if (!formData) return;

        const form = formData.element;
        const firstError = form.querySelector('.error');

        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    /**
     * Установка состояния отправки
     */
    setSubmittingState(isSubmitting, submitButton) {
        this.isSubmitting = isSubmitting;

        if (submitButton) {
            submitButton.disabled = isSubmitting;
            const originalText = submitButton.getAttribute('data-original-text') || submitButton.textContent;

            if (isSubmitting) {
                submitButton.setAttribute('data-original-text', originalText);
                submitButton.textContent = 'Отправляем...';
                submitButton.classList.add('loading');
            } else {
                submitButton.textContent = originalText;
                submitButton.classList.remove('loading');
            }
        }
    }

    /**
     * Обработка успешной отправки
     */
    handleSubmitSuccess(formId, response) {
        const formData = this.forms.get(formId);
        if (!formData) return;

        const form = formData.element;

        // Очистка формы
        form.reset();

        // Удаление всех ошибок
        const errorElements = form.querySelectorAll('.field-error');
        errorElements.forEach(el => el.style.display = 'none');

        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => input.classList.remove('error'));

        // Показ сообщения об успехе
        this.showSuccessMessage(form, response.message || 'Спасибо! Ваше сообщение отправлено.');

        console.log('✅ Форма отправлена успешно:', formId);
    }

    /**
     * Обработка ошибки отправки
     */
    handleSubmitError(formId, errorMessage) {
        const formData = this.forms.get(formId);
        if (!formData) return;

        const form = formData.element;
        this.showErrorMessage(form, errorMessage);

        console.error('❌ Ошибка отправки формы:', formId, errorMessage);
    }

    /**
     * Показ сообщения об успехе
     */
    showSuccessMessage(form, message) {
        this.showMessage(form, message, 'success');
    }

    /**
     * Показ сообщения об ошибке
     */
    showErrorMessage(form, message) {
        this.showMessage(form, message, 'error');
    }

    /**
     * Показ сообщения
     */
    showMessage(form, message, type) {
        let messageElement = form.querySelector('.form-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            messageElement.setAttribute('role', 'alert');
            form.insertBefore(messageElement, form.firstChild);
        }

        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        messageElement.style.display = 'block';

        // Автоматическое скрытие сообщения через 5 секунд
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);

        // Прокрутка к сообщению
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Получение данных формы как объект
     */
    getFormData(formId) {
        const formData = this.forms.get(formId);
        if (!formData) return null;

        const form = formData.element;
        const data = new FormData(form);
        const result = {};

        for (let [key, value] of data.entries()) {
            result[key] = value;
        }

        return result;
    }

    /**
     * Программная отправка формы
     */
    async submitFormById(formId) {
        const formData = this.forms.get(formId);
        if (!formData) {
            throw new Error(`Форма с ID ${formId} не найдена`);
        }

        const form = formData.element;
        const event = new Event('submit', { cancelable: true });
        form.dispatchEvent(event);
    }
}