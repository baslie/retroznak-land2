/**
 * Класс SmoothScroll для плавной прокрутки по якорям
 * Обеспечивает плавную навигацию по секциям сайта
 */
class SmoothScroll {
    constructor(options = {}) {
        this.options = {
            duration: 800,
            easing: 'easeInOutCubic',
            offset: 70, // Отступ для фиксированного хедера
            updateURL: true,
            callback: null,
            ...options
        };

        this.isScrolling = false;
        this.init();
    }

    /**
     * Инициализация плавной прокрутки
     */
    init() {
        this.bindEvents();
        this.handleInitialHash();
        console.log('✅ SmoothScroll: Инициализирован');
    }

    /**
     * Привязка событий
     */
    bindEvents() {
        // Обработка кликов по якорным ссылкам
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#"]');
            if (link && this.isValidAnchor(link)) {
                event.preventDefault();
                this.scrollToAnchor(link.getAttribute('href'));
            }
        });

        // Обработка изменения хеша в URL
        window.addEventListener('hashchange', () => {
            if (!this.isScrolling) {
                this.handleHashChange();
            }
        });

        // Обработка кнопок "Назад/Вперед" браузера
        window.addEventListener('popstate', () => {
            if (window.location.hash && !this.isScrolling) {
                this.scrollToAnchor(window.location.hash);
            }
        });
    }

    /**
     * Проверка валидности якорной ссылки
     */
    isValidAnchor(link) {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('#!')) {
            return false;
        }

        // Проверяем, что ссылка ведет на тот же домен
        const url = new URL(link.href);
        return url.hostname === window.location.hostname;
    }

    /**
     * Обработка изменения хеша
     */
    handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            this.scrollToAnchor(hash, false);
        }
    }

    /**
     * Обработка начального хеша при загрузке страницы
     */
    handleInitialHash() {
        if (window.location.hash) {
            // Небольшая задержка для корректной работы с CSS
            setTimeout(() => {
                this.scrollToAnchor(window.location.hash, false);
            }, 100);
        }
    }

    /**
     * Прокрутка к якорю
     */
    async scrollToAnchor(hash, updateURL = true) {
        const targetId = hash.replace('#', '');
        const target = document.getElementById(targetId);

        if (!target) {
            console.warn(`⚠️ SmoothScroll: Элемент с ID "${targetId}" не найден`);
            return;
        }

        // Предотвращение множественных прокруток
        if (this.isScrolling) {
            return;
        }

        this.isScrolling = true;

        try {
            // Вычисление позиции прокрутки
            const targetPosition = this.getTargetPosition(target);
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;

            // Обновление URL если требуется
            if (updateURL && this.options.updateURL) {
                this.updateURL(hash);
            }

            // Анимация прокрутки
            await this.animateScroll(startPosition, distance);

            // Установка фокуса на целевой элемент для accessibility
            this.setFocusToTarget(target);

            // Вызов callback если определен
            if (typeof this.options.callback === 'function') {
                this.options.callback(target, hash);
            }

        } catch (error) {
            console.error('❌ SmoothScroll: Ошибка при прокрутке:', error);
        } finally {
            this.isScrolling = false;
        }
    }

    /**
     * Получение целевой позиции с учетом отступа
     */
    getTargetPosition(target) {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return rect.top + scrollTop - this.options.offset;
    }

    /**
     * Анимация прокрутки
     */
    animateScroll(startPosition, distance) {
        return new Promise((resolve) => {
            const startTime = performance.now();
            const duration = this.options.duration;

            const animateFrame = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Применение функции easing
                const easedProgress = this.getEasingValue(progress);
                const currentPosition = startPosition + (distance * easedProgress);

                window.scrollTo(0, currentPosition);

                if (progress < 1) {
                    requestAnimationFrame(animateFrame);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animateFrame);
        });
    }

    /**
     * Получение значения easing функции
     */
    getEasingValue(t) {
        switch (this.options.easing) {
            case 'linear':
                return t;

            case 'easeInQuad':
                return t * t;

            case 'easeOutQuad':
                return t * (2 - t);

            case 'easeInOutQuad':
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            case 'easeInCubic':
                return t * t * t;

            case 'easeOutCubic':
                return (--t) * t * t + 1;

            case 'easeInOutCubic':
            default:
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

            case 'easeInQuart':
                return t * t * t * t;

            case 'easeOutQuart':
                return 1 - (--t) * t * t * t;

            case 'easeInOutQuart':
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        }
    }

    /**
     * Обновление URL
     */
    updateURL(hash) {
        if (history.pushState) {
            history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
    }

    /**
     * Установка фокуса на целевой элемент
     */
    setFocusToTarget(target) {
        // Делаем элемент focusable если он не является таковым
        if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
        }

        // Устанавливаем фокус
        target.focus();

        // Убираем tabindex после установки фокуса если он был добавлен нами
        if (target.getAttribute('tabindex') === '-1') {
            target.addEventListener('blur', function onBlur() {
                target.removeAttribute('tabindex');
                target.removeEventListener('blur', onBlur);
            });
        }
    }

    /**
     * Программная прокрутка к элементу по селектору
     */
    scrollTo(selector, options = {}) {
        const target = document.querySelector(selector);
        if (!target) {
            console.warn(`⚠️ SmoothScroll: Элемент "${selector}" не найден`);
            return;
        }

        const targetId = target.id || `scroll-target-${Date.now()}`;
        if (!target.id) {
            target.id = targetId;
        }

        // Временное изменение опций если переданы
        const originalOptions = { ...this.options };
        Object.assign(this.options, options);

        this.scrollToAnchor(`#${targetId}`).then(() => {
            // Восстановление оригинальных опций
            this.options = originalOptions;
        });
    }

    /**
     * Прокрутка вверх страницы
     */
    scrollToTop(options = {}) {
        const tempTarget = document.createElement('div');
        tempTarget.id = 'temp-top-target';
        tempTarget.style.position = 'absolute';
        tempTarget.style.top = '0';
        tempTarget.style.left = '0';
        tempTarget.style.width = '1px';
        tempTarget.style.height = '1px';
        tempTarget.style.opacity = '0';
        tempTarget.style.pointerEvents = 'none';

        document.body.insertBefore(tempTarget, document.body.firstChild);

        // Временное изменение опций
        const originalOptions = { ...this.options };
        Object.assign(this.options, options);

        this.scrollToAnchor('#temp-top-target', false).then(() => {
            // Удаление временного элемента и восстановление опций
            tempTarget.remove();
            this.options = originalOptions;
        });
    }

    /**
     * Проверка активности прокрутки
     */
    isCurrentlyScrolling() {
        return this.isScrolling;
    }

    /**
     * Остановка текущей прокрутки
     */
    stop() {
        this.isScrolling = false;
    }

    /**
     * Обновление настроек
     */
    updateOptions(newOptions) {
        Object.assign(this.options, newOptions);
    }

    /**
     * Получение текущих настроек
     */
    getOptions() {
        return { ...this.options };
    }

    /**
     * Уничтожение экземпляра
     */
    destroy() {
        this.isScrolling = false;
        // Удаление обработчиков событий происходит автоматически при удалении ссылок на функции
        console.log('✅ SmoothScroll: Уничтожен');
    }
}