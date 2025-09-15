# 🏗 HTML5 семантическая структура

### Базовая разметка с микроданными
```html
<!DOCTYPE html>
<html lang="ru" itemscope itemtype="https://schema.org/LocalBusiness">
<head>
    <!-- Critical meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- SEO meta tags -->
    <title>Ретрознак — домовые знаки в стиле советского времени | От 1990₽</title>
    <meta name="description" content="Изготовление домовых знаков из металла с подсветкой по технологиям 1924 года. Ленинградский, Петроградский и VIP ретрознаки. Гарантия до 20 лет. 5000+ довольных клиентов.">
    <meta name="keywords" content="домовые знаки, ретрознак, адресные указатели, советские знаки, таблички с подсветкой, Томск">

    <!-- Open Graph -->
    <meta property="og:title" content="Ретрознак — домовые знаки в стиле советского времени">
    <meta property="og:description" content="Изготовление качественных домовых знаков по технологиям 1924 года. От 1990₽ с гарантией до 20 лет.">
    <meta property="og:image" content="/assets/images/hero/hero-retroznak-1200.jpg">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://retroznak.ru">

    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Ретрознак",
      "image": "/assets/images/hero/hero-retroznak-1200.jpg",
      "description": "Изготовление домовых знаков по технологиям 1924 года",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Енисейская, д.32б",
        "addressLocality": "Томск",
        "postalCode": "634041",
        "addressCountry": "RU"
      },
      "telephone": "+7 983 232-22-06",
      "email": "retroznak@mail.ru",
      "url": "https://retroznak.ru",
      "sameAs": [
        "https://vk.com/retroznak",
        "https://t.me/Rznak"
      ],
      "priceRange": "1990₽-9300₽"
    }
    </script>

    <!-- Preload critical resources -->
    <link rel="preload" href="/assets/css/main.css" as="style">
    <link rel="preload" href="/assets/images/hero/hero-retroznak-800.webp" as="image" media="(max-width: 768px)">
    <link rel="preload" href="/assets/images/hero/hero-retroznak-1200.webp" as="image" media="(min-width: 769px)">

    <!-- CSS -->
    <link rel="stylesheet" href="/assets/css/main.css">
    <link rel="stylesheet" href="/assets/css/components.css">
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Analytics -->
    <!-- Яндекс.Метрика и Google Analytics здесь -->
</head>

<body class="antialiased">
    <!-- Hero Section -->
    <header id="hero" class="hero-section min-h-screen flex items-center relative"
            role="banner" aria-label="Главная секция">
        <div class="container mx-auto px-4 z-10">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Контент hero -->
                <div class="text-center lg:text-left" data-animate>
                    <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Секрет домовых знаков, который знали наши
                        <span class="text-retro-gold">прадеды</span>
                    </h1>

                    <p class="text-xl text-blue-100 mb-8 leading-relaxed">
                        Воссоздаем технологии горячей эмали 1924 года для изготовления
                        домовых знаков, которые служат десятилетиями
                    </p>

                    <!-- CTA кнопки -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a href="#products" class="btn btn-primary animate-bounce-soft">
                            Выбрать модель
                        </a>
                        <a href="#history" class="btn btn-secondary">
                            Узнать историю
                        </a>
                    </div>
                </div>

                <!-- Главное изображение -->
                <div class="order-first lg:order-last" data-animate>
                    <picture>
                        <source media="(max-width: 768px)"
                                srcset="/assets/images/hero/hero-retroznak-800.webp"
                                type="image/webp">
                        <source media="(min-width: 769px)"
                                srcset="/assets/images/hero/hero-retroznak-1200.webp"
                                type="image/webp">
                        <img src="/assets/images/hero/hero-retroznak-1200.jpg"
                             alt="Ленинградский ретрознак с подсветкой на красивом доме"
                             class="w-full h-auto rounded-lg shadow-2xl"
                             loading="eager">
                    </picture>
                </div>
            </div>
        </div>
    </header>

    <!-- Product Matrix Section -->
    <section id="products" class="py-20 bg-gray-50"
             role="main" aria-label="Товарная матрица">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16" data-animate>
                <h2 class="text-4xl font-bold text-retro-dark mb-6">
                    Выберите свой ретрознак
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Три модели домовых знаков для разных потребностей и бюджета
                </p>
            </div>

            <div class="product-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <!-- Product Card 1: Обычный -->
                <article class="product-card"
                         data-product="Обычный"
                         data-price="1990"
                         itemscope itemtype="https://schema.org/Product">
                    <div class="p-6">
                        <img src="/assets/images/products/obyichnii-400.webp"
                             alt="Обычный ретрознак"
                             class="w-full h-48 object-cover rounded-lg mb-4"
                             itemprop="image">

                        <h3 class="text-xl font-bold mb-2" itemprop="name">
                            Обычный ретрознак
                        </h3>

                        <div class="mb-4" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                            <span class="text-3xl font-bold text-retro-gold" itemprop="price">1990₽</span>
                            <meta itemprop="priceCurrency" content="RUB">
                        </div>

                        <ul class="text-sm text-gray-600 space-y-2 mb-6">
                            <li>✓ Размер: 35×27 см</li>
                            <li>✓ Сталь с покраской</li>
                            <li>✓ Срок службы: 10+ лет</li>
                            <li>✓ Подсветка в подарок</li>
                        </ul>

                        <button class="btn btn-primary w-full btn-order"
                                aria-label="Заказать обычный ретрознак">
                            Заказать за 1990₽
                        </button>
                    </div>
                </article>

                <!-- Product Card 2: Петроградский (Featured) -->
                <article class="product-card product-card--featured"
                         data-product="Петроградский"
                         data-price="4300"
                         itemscope itemtype="https://schema.org/Product">
                    <div class="p-6">
                        <img src="/assets/images/products/petrogradsky-400.webp"
                             alt="Петроградский ретрознак"
                             class="w-full h-48 object-cover rounded-lg mb-4"
                             itemprop="image">

                        <h3 class="text-xl font-bold mb-2" itemprop="name">
                            Петроградский ретрознак
                        </h3>

                        <div class="mb-4" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                            <span class="text-3xl font-bold text-retro-gold" itemprop="price">4300₽</span>
                            <meta itemprop="priceCurrency" content="RUB">
                        </div>

                        <ul class="text-sm text-gray-600 space-y-2 mb-6">
                            <li>✓ Размер: 52×40 см</li>
                            <li>✓ Горячая эмаль</li>
                            <li>✓ Срок службы: 20+ лет</li>
                            <li>✓ LED подсветка</li>
                            <li>✓ Фирменное клеймо «РЗ»</li>
                        </ul>

                        <button class="btn btn-primary w-full btn-order"
                                aria-label="Заказать петроградский ретрознак">
                            Заказать за 4300₽
                        </button>
                    </div>
                </article>

                <!-- Product Card 3: Ленинградский VIP -->
                <article class="product-card"
                         data-product="Ленинградский VIP"
                         data-price="9300"
                         itemscope itemtype="https://schema.org/Product">
                    <div class="p-6">
                        <div class="relative">
                            <img src="/assets/images/products/leningradsky-400.webp"
                                 alt="Ленинградский VIP ретрознак из нержавеющей стали"
                                 class="w-full h-48 object-cover rounded-lg mb-4"
                                 itemprop="image">
                            <div class="absolute top-2 right-2 bg-retro-gold text-white px-2 py-1 text-xs font-bold rounded">
                                PREMIUM
                            </div>
                        </div>

                        <h3 class="text-xl font-bold mb-2" itemprop="name">
                            Ленинградский VIP
                        </h3>

                        <div class="mb-4" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                            <span class="text-3xl font-bold text-retro-gold" itemprop="price">9300₽</span>
                            <meta itemprop="priceCurrency" content="RUB">
                        </div>

                        <ul class="text-sm text-gray-600 space-y-2 mb-6">
                            <li>✓ Размер: 52×40 см</li>
                            <li>✓ Нержавеющая сталь</li>
                            <li>✓ Срок службы: 50+ лет</li>
                            <li>✓ Премиум LED подсветка</li>
                            <li>✓ Рельефные символы</li>
                            <li>✓ Индивидуальный дизайн</li>
                        </ul>

                        <button class="btn btn-primary w-full btn-order"
                                aria-label="Заказать ленинградский VIP ретрознак">
                            Заказать за 9300₽
                        </button>
                    </div>
                </article>
            </div>
        </div>
    </section>

    <!-- История section, Social Proof, Order Form, FAQ секции... -->

    <!-- Order Form Section -->
    <section id="order" class="py-20 bg-retro-blue"
             role="form" aria-label="Форма заказа">
        <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-white mb-6 form-title">
                        Заказать ретрознак
                    </h2>
                    <p class="text-blue-100 text-lg">
                        Заполните форму и мы свяжемся с вами в течение часа
                    </p>
                </div>

                <!-- Выбранный товар (динамически обновляется) -->
                <div class="price-display mb-8">
                    <!-- JavaScript будет обновлять этот блок -->
                </div>

                <form id="order-form" class="form-container" novalidate>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="form-field">
                            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                                Ваше имя *
                            </label>
                            <input type="text"
                                   id="name"
                                   name="name"
                                   class="form-input"
                                   required
                                   aria-required="true"
                                   placeholder="Александр Петров">
                        </div>

                        <div class="form-field">
                            <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
                                Телефон *
                            </label>
                            <input type="tel"
                                   id="phone"
                                   name="phone"
                                   class="form-input"
                                   required
                                   aria-required="true"
                                   placeholder="+7 (999) 123-45-67">
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="form-field">
                            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <input type="email"
                                   id="email"
                                   name="email"
                                   class="form-input"
                                   placeholder="example@mail.ru">
                        </div>

                        <div class="form-field">
                            <label for="model" class="block text-sm font-semibold text-gray-700 mb-2">
                                Модель *
                            </label>
                            <select id="model"
                                    name="model"
                                    class="form-input"
                                    required
                                    aria-required="true">
                                <option value="">Выберите модель</option>
                                <option value="Обычный">Обычный (1990₽)</option>
                                <option value="Петроградский">Петроградский (4300₽)</option>
                                <option value="Ленинградский VIP">Ленинградский VIP (9300₽)</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-field">
                        <label for="address" class="block text-sm font-semibold text-gray-700 mb-2">
                            Адрес установки
                        </label>
                        <input type="text"
                               id="address"
                               name="address"
                               class="form-input"
                               placeholder="г. Томск, ул. Ленина, д. 1">
                    </div>

                    <div class="form-field">
                        <label for="comment" class="block text-sm font-semibold text-gray-700 mb-2">
                            Комментарий к заказу
                        </label>
                        <textarea id="comment"
                                  name="comment"
                                  rows="4"
                                  class="form-input"
                                  placeholder="Дополнительные пожелания, вопросы..."></textarea>
                    </div>

                    <!-- SmartCaptcha -->
                    <div class="form-field">
                        <div id="captcha-container" class="flex justify-center"></div>
                        <input type="hidden" id="smart-token" name="smart-token">
                    </div>

                    <button type="submit"
                            class="btn btn-primary w-full text-lg py-4">
                        Отправить заявку
                    </button>

                    <p class="text-sm text-gray-500 text-center mt-4">
                        Нажимая кнопку, вы соглашаетесь с
                        <a href="/privacy" class="underline">обработкой персональных данных</a>
                    </p>

                    <!-- Альтернативные способы связи -->
                    <div class="mt-8 p-6 bg-gray-50 rounded-lg">
                        <h4 class="font-semibold mb-4 text-center">
                            Или свяжитесь с нами напрямую:
                        </h4>
                        <div class="grid md:grid-cols-3 gap-4 text-center">
                            <a href="tel:+79832322206"
                               class="flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                                <span class="text-sm font-medium">+7 983 232-22-06</span>
                            </a>

                            <a href="https://wa.me/79832322206"
                               target="_blank"
                               class="flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"></path>
                                </svg>
                                <span class="text-sm font-medium">WhatsApp</span>
                            </a>

                            <a href="mailto:retroznak@mail.ru"
                               class="flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                                <span class="text-sm font-medium">Email</span>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20" role="region" aria-label="Часто задаваемые вопросы">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-retro-dark mb-6">
                    Часто задаваемые вопросы
                </h2>
                <p class="text-xl text-gray-600">
                    Ответы на популярные вопросы о ретрознаках
                </p>
            </div>

            <div class="max-w-4xl mx-auto faq-section">
                <div class="faq-item">
                    <button class="faq-question"
                            aria-expanded="false"
                            aria-controls="faq-1">
                        <span>Сколько служит ретрознак?</span>
                        <svg class="w-6 h-6 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="faq-answer" id="faq-1">
                        <p>Обычные знаки служат 10-15 лет, эмалированные (Петроградский) — 20+ лет,
                        а VIP из нержавейки — до 50 лет. Все зависит от качества материала и покрытия.</p>
                    </div>
                </div>

                <!-- Остальные FAQ элементы... -->
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer-section bg-retro-dark text-white py-12" role="contentinfo">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4 text-retro-gold">ООО "Три Кита"</h3>
                    <p class="text-gray-300 mb-4">
                        Изготовление домовых знаков по технологиям 1924 года
                    </p>
                    <p class="text-sm text-gray-400">
                        634041, г.Томск, ул.Енисейская, д.32б<br>
                        ОГРН 1097017011079
                    </p>
                </div>

                <div>
                    <h4 class="text-lg font-semibold mb-4">Контакты</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li>
                            <a href="tel:+79832322206" class="hover:text-retro-gold transition-colors">
                                +7 983 232-22-06 (Томск)
                            </a>
                        </li>
                        <li>
                            <a href="tel:+79681884715" class="hover:text-retro-gold transition-colors">
                                +7 968 188-47-15 (СПб)
                            </a>
                        </li>
                        <li>
                            <a href="mailto:retroznak@mail.ru" class="hover:text-retro-gold transition-colors">
                                retroznak@mail.ru
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-lg font-semibold mb-4">Социальные сети</h4>
                    <div class="flex space-x-4">
                        <a href="https://vk.com/retroznak"
                           target="_blank"
                           class="text-gray-400 hover:text-retro-gold transition-colors"
                           aria-label="ВКонтакте">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <!-- VK icon -->
                            </svg>
                        </a>
                        <a href="https://t.me/Rznak"
                           target="_blank"
                           class="text-gray-400 hover:text-retro-gold transition-colors"
                           aria-label="Telegram">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <!-- Telegram icon -->
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-700 pt-6 mt-8 text-center text-gray-400">
                <p>&copy; 2025 ООО "Три Кита". Все права защищены.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script type="module" src="/assets/js/app.js"></script>

    <!-- SmartCaptcha -->
    <script src="https://smartcaptcha.yandexcloud.net/captcha.js" defer></script>

    <!-- Analytics Scripts -->
    <script>
        // Яндекс.Метрика и Google Analytics
        // Конфигурация аналитики
    </script>
</body>
</html>
```

---
