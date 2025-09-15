/**
 * Главный класс приложения RetroZnakApp
 * Управляет инициализацией всех компонентов и глобальными событиями
 */
class RetroZnakApp {
    constructor() {
        this.components = {};
        this.state = {
            isLoaded: false,
            activeSection: null,
            mobileMenuOpen: false
        };

        this.init();
    }

    /**
     * Инициализация приложения
     */
    init() {
        // Ждем полной загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.onDOMContentLoaded();
            });
        } else {
            this.onDOMContentLoaded();
        }
    }

    /**
     * Обработчик полной загрузки DOM
     */
    onDOMContentLoaded() {
        console.log('🎯 RetroZnakApp: DOM загружен, инициализация компонентов...');

        this.initComponents();
        this.bindGlobalEvents();
        this.initAccessibility();
        this.state.isLoaded = true;

        // Добавляем класс для анимаций
        document.body.classList.add('app-loaded');

        console.log('✅ RetroZnakApp: Инициализация завершена');
    }

    /**
     * Инициализация всех компонентов приложения
     */
    initComponents() {
        try {
            // Инициализация плавной прокрутки (если компонент доступен)
            if (typeof SmoothScroll !== 'undefined') {
                this.components.smoothScroll = new SmoothScroll();
                console.log('✅ SmoothScroll компонент инициализирован');
            }

            // Инициализация обработчика форм (если компонент доступен)
            if (typeof FormHandler !== 'undefined') {
                this.components.formHandler = new FormHandler();
                console.log('✅ FormHandler компонент инициализирован');
            }

            // Инициализация селектора продуктов (если компонент доступен)
            if (typeof ProductSelector !== 'undefined') {
                this.components.productSelector = new ProductSelector();
                console.log('✅ ProductSelector компонент инициализирован');
            }

            // Инициализация мобильного меню
            this.initMobileMenu();

            // Инициализация intersection observer для анимаций
            this.initScrollAnimations();

        } catch (error) {
            console.error('❌ Ошибка при инициализации компонентов:', error);
        }
    }

    /**
     * Привязка глобальных событий
     */
    bindGlobalEvents() {
        // Обработка изменения размера окна
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.onWindowResize();
            }, 250);
        });

        // Обработка прокрутки страницы
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.onWindowScroll();
            }, 10);
        }, { passive: true });

        // Обработка клавиатурных событий
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardNavigation(event);
        });

        // Обработка кликов для закрытия модальных окон
        document.addEventListener('click', (event) => {
            this.handleGlobalClick(event);
        });
    }

    /**
     * Инициализация accessibility функций
     */
    initAccessibility() {
        // Создание кнопки "Перейти к основному контенту"
        this.createSkipLink();

        // Управление фокусом для модальных окон
        this.initFocusManagement();
    }

    /**
     * Создание кнопки "Перейти к основному контенту"
     */
    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Перейти к основному контенту';

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * Инициализация управления фокусом
     */
    initFocusManagement() {
        // Обработка Tab навигации в модальных окнах
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                this.handleTabNavigation(event);
            }
        });
    }

    /**
     * Инициализация мобильного меню
     */
    initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    /**
     * Инициализация анимаций при прокрутке
     */
    initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Наблюдение за секциями для анимации
            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });
        }
    }

    /**
     * Переключение мобильного меню
     */
    toggleMobileMenu() {
        this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
        document.body.classList.toggle('mobile-menu-open', this.state.mobileMenuOpen);

        const toggle = document.querySelector('.mobile-menu-toggle');
        if (toggle) {
            toggle.setAttribute('aria-expanded', this.state.mobileMenuOpen);
        }
    }

    /**
     * Обработка изменения размера окна
     */
    onWindowResize() {
        // Закрытие мобильного меню на больших экранах
        if (window.innerWidth >= 768 && this.state.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    /**
     * Обработка прокрутки страницы
     */
    onWindowScroll() {
        // Определение активной секции
        this.updateActiveSection();

        // Управление видимостью header при прокрутке
        this.handleHeaderScroll();
    }

    /**
     * Обновление активной секции в навигации
     */
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                if (this.state.activeSection !== sectionId) {
                    this.state.activeSection = sectionId;
                    this.updateNavigationActiveState(sectionId);
                }
            }
        });
    }

    /**
     * Обновление активного состояния навигации
     */
    updateNavigationActiveState(activeSectionId) {
        const navLinks = document.querySelectorAll('.navbar-menu a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const linkSectionId = href.substring(1);
                link.classList.toggle('active', linkSectionId === activeSectionId);
            }
        });
    }

    /**
     * Управление видимостью header при прокрутке
     */
    handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (header) {
            const scrolled = window.scrollY > 50;
            header.classList.toggle('scrolled', scrolled);
        }
    }

    /**
     * Обработка клавиатурной навигации
     */
    handleKeyboardNavigation(event) {
        // Закрытие мобильного меню по Escape
        if (event.key === 'Escape' && this.state.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    /**
     * Обработка Tab навигации
     */
    handleTabNavigation(event) {
        // Логика управления фокусом в модальных окнах будет добавлена в следующих историях
    }

    /**
     * Обработка глобальных кликов
     */
    handleGlobalClick(event) {
        // Закрытие выпадающих меню при клике вне их области
        if (this.state.mobileMenuOpen && !event.target.closest('.navbar-menu') && !event.target.closest('.mobile-menu-toggle')) {
            this.toggleMobileMenu();
        }
    }

    /**
     * Получение состояния приложения
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Получение компонента по имени
     */
    getComponent(name) {
        return this.components[name] || null;
    }

    /**
     * Логирование для отладки
     */
    log(message, data = null) {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`🎯 RetroZnakApp: ${message}`, data || '');
        }
    }

    /**
     * Обработка ошибок
     */
    handleError(error, context = 'Unknown') {
        console.error(`❌ RetroZnakApp Error in ${context}:`, error);

        // Здесь можно добавить отправку ошибок на сервер для мониторинга
        // this.sendErrorToServer(error, context);
    }
}

// Глобальная инициализация приложения
window.retroZnakApp = new RetroZnakApp();