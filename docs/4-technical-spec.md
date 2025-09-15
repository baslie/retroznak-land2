# Техническая спецификация лендинга «Ретрознак»

*Дата создания: 14 сентября 2025*
*Версия: 1.0*

---

## Обзор архитектуры

### Общая архитектурная концепция
**Vanilla Web Architecture** — максимально простая и производительная архитектура без сложных фреймворков и сборщиков.

**Принципы:**
- **Static First** — статические файлы для максимальной скорости
- **Progressive Enhancement** — базовая функциональность работает без JavaScript
- **Mobile-First** — приоритет мобильных устройств
- **Performance-First** — оптимизация скорости загрузки

### Технологический стек

**Frontend:**
- **HTML5** — семантическая разметка, accessibility
- **CSS3** — современные возможности (Grid, Flexbox, animations)
- **Tailwind CSS** — утилитарный фреймворк через CDN
- **Vanilla JavaScript ES6+** — без транспиляции
- **WebP изображения** — оптимизация размера файлов

**Backend:**
- **PHP 7.4+** — существующий скрипт send-form.php
- **Email отправка** — через PHPMailer или mail()
- **Яндекс SmartCaptcha** — защита от спама

**Инфраструктура:**
- **Shared хостинг** — поддержка PHP и статических файлов
- **CDN** — для Tailwind CSS и статических ресурсов
- **HTTP/2** — современный протокол для быстрой загрузки

---

## Структура файлов

```
лендинг-ретрознак/
├── index.html                    # Главная страница
├── css/
│   ├── main.css                 # Основные стили
│   └── components.css           # Компонентные стили
├── js/
│   ├── main.js                  # Основная логика
│   ├── form-handler.js          # Обработка форм
│   └── smooth-scroll.js         # Плавная прокрутка
├── images/
│   ├── hero/                    # Изображения для hero секции
│   ├── products/                # Фото ретрознаков
│   ├── clients/                 # Фото клиентов и установленных знаков
│   ├── process/                 # Фото производства
│   └── icons/                   # Иконки и UI элементы
├── php/
│   └── send-form.php           # Существующий PHP скрипт
└── assets/
    ├── fonts/                   # Локальные шрифты (если нужно)
    └── docs/                    # PDF документы (сертификаты и т.д.)
```

---

## HTML архитектура

### Семантическая структура

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <!-- SEO мета-теги -->
    <!-- Open Graph разметка -->
    <!-- Schema.org JSON-LD -->
    <!-- Tailwind CSS CDN -->
    <!-- Яндекс.Метрика + Google Analytics -->
</head>
<body>
    <!-- Hero Section -->
    <header id="hero" class="hero-section">

    <!-- Product Matrix -->
    <section id="products" class="products-section">

    <!-- История -->
    <section id="history" class="history-section">

    <!-- Технологии и гарантии -->
    <section id="technology" class="technology-section">

    <!-- Social Proof -->
    <section id="clients" class="clients-section">

    <!-- Форма заказа -->
    <section id="order" class="order-section">

    <!-- FAQ -->
    <section id="faq" class="faq-section">

    <!-- Footer -->
    <footer class="footer-section">

    <!-- JavaScript файлы -->
</body>
</html>
```

### SEO оптимизация

**Мета-теги:**
```html
<title>Ретрознак — домовые знаки в стиле советского времени | От 1990₽</title>
<meta name="description" content="Изготовление домовых знаков из металла с подсветкой. Ленинградский, Петроградский и VIP ретрознаки. Гарантия до 20 лет. Доставка по России.">
<meta name="keywords" content="домовые знаки, ретрознак, адресные указатели, советские знаки, таблички с подсветкой">
```

**Schema.org разметка:**
- LocalBusiness — для компании
- Product — для каждой модели ретрознака
- Review — для отзывов клиентов

---

## CSS архитектура

### Компонентный подход

**main.css** — базовые стили:
```css
/* Reset и базовые стили */
/* Кастомные CSS переменные */
/* Глобальные утилиты */
/* Responsive helpers */
```

**components.css** — компоненты:
```css
/* .hero-section */
/* .product-card */
/* .testimonial */
/* .form-container */
/* .faq-item */
/* .btn-primary, .btn-secondary */
```

### Tailwind CSS интеграция

**CDN подключение для быстрого старта:**
```html
<script src="https://cdn.tailwindcss.com"></script>
```

**Кастомная конфигурация:**
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'retro-gold': '#D4AF37',
        'retro-blue': '#1E3A8A',
        'retro-green': '#065F46'
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Inter', 'Arial', 'sans-serif']
      }
    }
  }
}
```

### Responsive дизайн

**Breakpoints:**
- Mobile: до 768px (базовый)
- Tablet: 768px - 1024px
- Desktop: 1024px+

**Mobile-First подход:**
```css
.product-grid {
    /* Mobile styles */
    @media (min-width: 768px) {
        /* Tablet styles */
    }
    @media (min-width: 1024px) {
        /* Desktop styles */
    }
}
```

---

## JavaScript архитектура

### Vanilla ES6+ подход

**main.js** — инициализация:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initFormHandlers();
    initFAQ();
    initAnalytics();
});
```

**form-handler.js** — обработка форм:
```javascript
class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        // Валидация полей
        // Отправка на PHP endpoint
        // Обработка ответа
        // Показ уведомлений
    }
}
```

### Интеграция с PHP backend

**Отправка формы:**
```javascript
const formData = new FormData(form);
formData.append('model', selectedModel);
formData.append('smart-token', captchaToken);

fetch('php/send-form.php', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        showSuccessMessage();
        gtag('event', 'form_submit', {
            'event_category': 'engagement',
            'event_label': selectedModel
        });
    } else {
        showErrorMessage(data.error);
    }
});
```

### Яндекс SmartCaptcha

**Frontend интеграция:**
```javascript
function loadSmartCaptcha() {
    if (typeof window.smartCaptcha !== 'undefined') {
        window.smartCaptcha.render('captcha-container', {
            sitekey: 'YOUR_SITE_KEY',
            callback: (token) => {
                document.getElementById('smart-token').value = token;
            }
        });
    }
}
```

---

## PHP Backend спецификация

### Интеграция существующего скрипта

**Требуемые поля от frontend:**
```php
$requiredFields = [
    'name' => $_POST['name'],
    'phone' => $_POST['phone'],
    'email' => $_POST['email'],
    'address' => $_POST['address'],
    'model' => $_POST['model'],
    'comment' => $_POST['comment'],
    'smart-token' => $_POST['smart-token']
];
```

**Валидация и защита:**
- Проверка SmartCaptcha токена
- Санитизация входных данных
- Rate limiting (защита от спама)
- Логирование заявок

### Email шаблон

**Структура письма:**
```
Тема: Новая заявка на ретрознак - [МОДЕЛЬ]

Клиент: [ИМЯ]
Телефон: [ТЕЛЕФОН]
Email: [EMAIL]
Адрес установки: [АДРЕС]
Модель: [МОДЕЛЬ]
Комментарий: [КОММЕНТАРИЙ]

UTM метки: [utm_source, utm_medium, utm_campaign]
Дата заявки: [TIMESTAMP]
IP адрес: [IP]
User-Agent: [USER_AGENT]
```

---

## Производительность и оптимизация

### Целевые показатели

**Core Web Vitals:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

**Дополнительные метрики:**
- **TTFB (Time To First Byte):** < 800ms
- **Speed Index:** < 3s
- **Total Blocking Time:** < 300ms

### Оптимизация изображений

**Форматы и качество:**
- **WebP** для современных браузеров
- **JPEG fallback** для старых браузеров
- **Качество 85%** для balance размера/качества
- **Responsive images** через srcset

```html
<picture>
    <source srcset="hero-retroznak-800.webp 800w, hero-retroznak-1200.webp 1200w"
            type="image/webp">
    <img src="hero-retroznak-1200.jpg"
         srcset="hero-retroznak-800.jpg 800w, hero-retroznak-1200.jpg 1200w"
         alt="Ленинградский ретрознак с подсветкой на доме"
         loading="lazy">
</picture>
```

### Lazy Loading

**Изображения:**
```html
<img src="placeholder.jpg"
     data-src="actual-image.jpg"
     loading="lazy"
     class="lazy-load">
```

**JavaScript для старых браузеров:**
```javascript
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy-load');
            observer.unobserve(img);
        }
    });
});
```

---

## Безопасность API и приложения

### CSRF защита для форм

**Генерация CSRF токенов:**
```php
<?php
// В начале PHP скрипта
session_start();

function generateCSRFToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
?>
```

**Frontend интеграция:**
```html
<!-- Скрытое поле с CSRF токеном в форме -->
<input type="hidden" name="csrf_token" value="<?php echo generateCSRFToken(); ?>">
```

```javascript
// Проверка CSRF токена при отправке формы
const csrfToken = document.querySelector('[name="csrf_token"]').value;
formData.append('csrf_token', csrfToken);
```

**Backend валидация:**
```php
if (!verifyCSRFToken($_POST['csrf_token'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Недействительный CSRF токен']);
    exit;
}
```

### Валидация HTTP заголовков

**Проверка обязательных заголовков:**
```php
function validateHeaders() {
    $errors = [];

    // Проверка Content-Type для POST запросов
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        if (!str_contains($contentType, 'multipart/form-data') &&
            !str_contains($contentType, 'application/x-www-form-urlencoded')) {
            $errors[] = 'Недопустимый Content-Type';
        }
    }

    // Проверка User-Agent (защита от ботов без UA)
    if (empty($_SERVER['HTTP_USER_AGENT'])) {
        $errors[] = 'Отсутствует User-Agent';
    }

    // Проверка Referer для форм (опционально)
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($_SERVER['HTTP_REFERER'])) {
        $errors[] = 'Отсутствует Referer';
    }

    return $errors;
}

// Использование в send-form.php
$headerErrors = validateHeaders();
if (!empty($headerErrors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Недопустимые заголовки: ' . implode(', ', $headerErrors)]);
    exit;
}
```

### Rate Limiting для предотвращения спама

**Простая реализация на основе файлов:**
```php
class RateLimiter {
    private $maxAttempts;
    private $timeWindow;
    private $logFile;

    public function __construct($maxAttempts = 5, $timeWindow = 300) {
        $this->maxAttempts = $maxAttempts;
        $this->timeWindow = $timeWindow; // 5 минут
        $this->logFile = sys_get_temp_dir() . '/rate_limit.log';
    }

    public function isAllowed($identifier) {
        $identifier = $this->getClientIdentifier();
        $attempts = $this->getAttempts($identifier);

        // Очистка старых записей
        $attempts = array_filter($attempts, function($timestamp) {
            return (time() - $timestamp) < $this->timeWindow;
        });

        // Проверка лимита
        if (count($attempts) >= $this->maxAttempts) {
            return false;
        }

        // Запись новой попытки
        $attempts[] = time();
        $this->saveAttempts($identifier, $attempts);

        return true;
    }

    private function getClientIdentifier() {
        // Комбинация IP + User-Agent для более точной идентификации
        return md5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
    }

    private function getAttempts($identifier) {
        if (!file_exists($this->logFile)) {
            return [];
        }

        $content = file_get_contents($this->logFile);
        $data = json_decode($content, true) ?: [];

        return $data[$identifier] ?? [];
    }

    private function saveAttempts($identifier, $attempts) {
        $data = [];
        if (file_exists($this->logFile)) {
            $content = file_get_contents($this->logFile);
            $data = json_decode($content, true) ?: [];
        }

        $data[$identifier] = $attempts;
        file_put_contents($this->logFile, json_encode($data));
    }
}

// Использование в send-form.php
$rateLimiter = new RateLimiter(5, 300); // 5 попыток за 5 минут
if (!$rateLimiter->isAllowed($_SERVER['REMOTE_ADDR'])) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'error' => 'Превышен лимит запросов. Попробуйте позже.'
    ]);
    exit;
}
```

### Sanitization входящих данных

**Комплексная очистка данных:**
```php
class DataSanitizer {
    public static function sanitizeString($input, $maxLength = 255) {
        // Удаление HTML тегов и специальных символов
        $cleaned = strip_tags($input);
        $cleaned = htmlspecialchars($cleaned, ENT_QUOTES, 'UTF-8');
        $cleaned = trim($cleaned);

        // Ограничение длины
        if (strlen($cleaned) > $maxLength) {
            $cleaned = substr($cleaned, 0, $maxLength);
        }

        return $cleaned;
    }

    public static function sanitizeEmail($email) {
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
    }

    public static function sanitizePhone($phone) {
        // Удаление всех символов кроме цифр, +, -, (, )
        $phone = preg_replace('/[^0-9+\-()]/', '', $phone);

        // Валидация российского номера
        if (preg_match('/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/', $phone)) {
            return $phone;
        }

        return '';
    }

    public static function sanitizeAddress($address) {
        // Разрешенные символы: буквы, цифры, пробелы, точки, запятые, дефисы
        $address = preg_replace('/[^a-zA-Zа-яёА-ЯЁ0-9\s.,\-]/', '', $address);
        return self::sanitizeString($address, 500);
    }
}

// Использование в send-form.php
$cleanData = [
    'name' => DataSanitizer::sanitizeString($_POST['name'] ?? '', 100),
    'phone' => DataSanitizer::sanitizePhone($_POST['phone'] ?? ''),
    'email' => DataSanitizer::sanitizeEmail($_POST['email'] ?? ''),
    'address' => DataSanitizer::sanitizeAddress($_POST['address'] ?? ''),
    'model' => DataSanitizer::sanitizeString($_POST['model'] ?? '', 50),
    'comment' => DataSanitizer::sanitizeString($_POST['comment'] ?? '', 1000)
];

// Проверка обязательных полей после санитизации
$requiredFields = ['name', 'phone', 'address', 'model'];
foreach ($requiredFields as $field) {
    if (empty($cleanData[$field])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => "Поле '$field' обязательно для заполнения"
        ]);
        exit;
    }
}
```

### Secure Headers конфигурация

**Настройка .htaccess для безопасных заголовков:**
```apache
# Secure Headers
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "DENY"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=(), bluetooth=()"

# Content Security Policy
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://mc.yandex.ru https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; frame-src 'none'; object-src 'none';"

# Скрытие версии сервера
ServerTokens Prod
Header unset Server
Header unset X-Powered-By

# Защита от clickjacking
Header always append X-Frame-Options "SAMEORIGIN"
```

**PHP заголовки в send-form.php:**
```php
// Установка безопасных заголовков в PHP
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Content-Type: application/json; charset=utf-8');

// Удаление заголовков, раскрывающих информацию о сервере
header_remove('X-Powered-By');
header_remove('Server');
```

### Session Management (опционально)

**Безопасное управление сессиями:**
```php
class SecureSession {
    public static function start() {
        // Настройки безопасности сессии
        ini_set('session.cookie_httponly', 1);
        ini_set('session.cookie_secure', 1);
        ini_set('session.cookie_samesite', 'Strict');
        ini_set('session.use_strict_mode', 1);

        // Регенерация ID сессии для защиты от фиксации
        if (session_status() === PHP_SESSION_NONE) {
            session_start();

            // Регенерация ID каждые 15 минут
            if (!isset($_SESSION['last_regeneration'])) {
                $_SESSION['last_regeneration'] = time();
            } elseif (time() - $_SESSION['last_regeneration'] > 900) {
                session_regenerate_id(true);
                $_SESSION['last_regeneration'] = time();
            }
        }
    }

    public static function destroy() {
        if (session_status() === PHP_SESSION_ACTIVE) {
            $_SESSION = [];

            // Удаление cookie сессии
            if (ini_get('session.use_cookies')) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                    $params['path'], $params['domain'],
                    $params['secure'], $params['httponly']
                );
            }

            session_destroy();
        }
    }
}

// Использование в начале send-form.php
SecureSession::start();
```

### Логирование безопасности

**Система логирования подозрительной активности:**
```php
class SecurityLogger {
    private $logFile;

    public function __construct() {
        $this->logFile = dirname(__FILE__) . '/logs/security.log';

        // Создание директории если не существует
        $dir = dirname($this->logFile);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
    }

    public function log($level, $message, $context = []) {
        $logEntry = [
            'timestamp' => date('Y-m-d H:i:s'),
            'level' => $level,
            'message' => $message,
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
            'context' => $context
        ];

        $logLine = json_encode($logEntry, JSON_UNESCAPED_UNICODE) . PHP_EOL;
        file_put_contents($this->logFile, $logLine, FILE_APPEND | LOCK_EX);
    }

    public function logSuspiciousActivity($reason, $data = []) {
        $this->log('WARNING', "Подозрительная активность: $reason", $data);
    }

    public function logFormSubmission($success, $data = []) {
        $level = $success ? 'INFO' : 'ERROR';
        $message = $success ? 'Успешная отправка формы' : 'Ошибка отправки формы';
        $this->log($level, $message, $data);
    }
}

// Использование в send-form.php
$logger = new SecurityLogger();

// Логирование подозрительной активности
if (empty($_SERVER['HTTP_REFERER'])) {
    $logger->logSuspiciousActivity('Отсутствует Referer');
}

// Логирование всех отправок форм
$logger->logFormSubmission($success, [
    'model' => $cleanData['model'],
    'email' => $cleanData['email']
]);
```

### Валидация файлов (если потребуется загрузка)

**Безопасная загрузка файлов:**
```php
class FileUploadValidator {
    private $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    private $maxSize = 2097152; // 2MB

    public function validate($file) {
        $errors = [];

        // Проверка наличия файла
        if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
            $errors[] = 'Ошибка загрузки файла';
            return $errors;
        }

        // Проверка размера
        if ($file['size'] > $this->maxSize) {
            $errors[] = 'Файл слишком большой (максимум 2MB)';
        }

        // Проверка MIME типа
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!in_array($mimeType, $this->allowedTypes)) {
            $errors[] = 'Недопустимый тип файла';
        }

        // Проверка расширения файла
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

        if (!in_array($extension, $allowedExtensions)) {
            $errors[] = 'Недопустимое расширение файла';
        }

        return $errors;
    }
}
```

### Мониторинг и алерты

**Система уведомлений о безопасности:**
```php
class SecurityMonitor {
    private $alertEmail = 'admin@retroznak.ru';

    public function checkThreatLevel() {
        $threats = [];

        // Проверка частоты запросов
        $recentRequests = $this->getRecentRequests();
        if (count($recentRequests) > 50) { // 50 запросов за час
            $threats[] = 'Высокая частота запросов';
        }

        // Проверка подозрительных IP
        $suspiciousIPs = $this->getSuspiciousIPs();
        if (!empty($suspiciousIPs)) {
            $threats[] = 'Подозрительные IP адреса: ' . implode(', ', $suspiciousIPs);
        }

        if (!empty($threats)) {
            $this->sendAlert($threats);
        }
    }

    private function sendAlert($threats) {
        $subject = 'Угроза безопасности на сайте Ретрознак';
        $message = "Обнаружены следующие угрозы:\n\n" . implode("\n", $threats);
        $message .= "\n\nВремя: " . date('Y-m-d H:i:s');
        $message .= "\nIP: " . $_SERVER['REMOTE_ADDR'];

        mail($this->alertEmail, $subject, $message);
    }
}
```

### Checklist безопасности

**Контрольный список для проверки:**
- ✅ CSRF токены на всех формах
- ✅ Валидация всех HTTP заголовков
- ✅ Rate limiting для предотвращения спама
- ✅ Полная санитизация входящих данных
- ✅ Secure headers в .htaccess и PHP
- ✅ Безопасное управление сессиями
- ✅ Логирование безопасности
- ✅ Мониторинг подозрительной активности
- ✅ Валидация файлов (если необходимо)
- ✅ Скрытие информации о сервере
- ✅ HTTPS принудительно
- ✅ Content Security Policy настроена

---

## Аналитика и отслеживание

### Яндекс.Метрика

**Основные цели:**
- Отправка формы (конверсия)
- Просмотр блока товарной матрицы
- Клики по кнопкам "Заказать"
- Прокрутка до блока Social Proof

### Google Analytics 4

**События для отслеживания:**
```javascript
// Отправка формы
gtag('event', 'form_submit', {
    'event_category': 'engagement',
    'event_label': selectedModel,
    'value': productPrice
});

// Клик по товару
gtag('event', 'select_item', {
    'item_category': 'retroznak',
    'item_name': modelName
});

// Просмотр контента
gtag('event', 'page_view', {
    'page_title': 'Ретрознак Landing',
    'page_location': window.location.href
});
```

---

## Тестирование

### Кроссбраузерная совместимость

**Поддерживаемые браузеры:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Fallback для старых браузеров:**
- CSS Grid → Flexbox fallback
- WebP → JPEG fallback
- ES6+ → ES5 alternative с полифилами

### Тестирование производительности

**Инструменты:**
- Google PageSpeed Insights
- WebPageTest
- Lighthouse
- GTmetrix

**Устройства для тестирования:**
- iPhone (различные модели)
- Android (средний сегмент)
- iPad
- Desktop (различные разрешения)

---

## Развертывание

### Требования к хостингу

**Минимальные требования:**
- PHP 7.4+ с поддержкой mail()
- HTTP/2 поддержка
- HTTPS сертификат
- Gzip compression
- .htaccess поддержка

### Процесс деплоя

**Чек-лист перед загрузкой:**
1. Минификация CSS/JS файлов
2. Оптимизация изображений
3. Проверка всех ссылок и путей
4. Тест PHP скрипта локально
5. Валидация HTML разметки

**Файлы для загрузки:**
```
index.html (главная страница)
css/ (стили)
js/ (скрипты)
images/ (оптимизированные изображения)
php/ (send-form.php)
.htaccess (настройки сервера)
robots.txt (для SEO)
sitemap.xml (для SEO)
```

---

## Rollback & Recovery Procedures

### 🚨 Система Feature Flags для безопасного развертывания

Простая vanilla JS система feature flags без сложных инструментов для постепенного включения функций и быстрого отката.

#### HTML структура с флагами

```html
<!-- Feature flags конфигурация в head -->
<script type="application/json" id="feature-flags">
{
    "newHeroDesign": false,
    "enhancedForm": true,
    "premiumSection": false,
    "testimonialSlider": true,
    "priceCalculator": false,
    "chatWidget": false,
    "videoBackground": false,
    "animatedCounters": true
}
</script>

<!-- Основная разметка с data-атрибутами -->
<body>
    <!-- Hero Section с флагом -->
    <header id="hero" class="hero-section" data-feature="newHeroDesign">
        <!-- Новая версия hero (скрыта по умолчанию) -->
        <div class="new-hero-content" data-feature-content="newHeroDesign">
            <!-- Новый контент -->
        </div>

        <!-- Старая версия hero (по умолчанию) -->
        <div class="original-hero-content" data-feature-fallback="newHeroDesign">
            <!-- Проверенный контент -->
        </div>
    </header>

    <!-- Форма заказа с флагом -->
    <section id="order" class="order-section" data-feature="enhancedForm">
        <!-- Расширенная форма -->
        <div class="enhanced-form" data-feature-content="enhancedForm">
            <!-- Новая функциональность -->
        </div>

        <!-- Базовая форма -->
        <div class="basic-form" data-feature-fallback="enhancedForm">
            <!-- Простая проверенная форма -->
        </div>
    </section>
</body>
```

#### JavaScript Feature Flag Manager

```javascript
class FeatureFlagManager {
    constructor() {
        this.flags = this.loadFlags();
        this.init();
    }

    // Загрузка флагов из конфигурации
    loadFlags() {
        try {
            const flagsElement = document.getElementById('feature-flags');
            if (flagsElement) {
                return JSON.parse(flagsElement.textContent);
            }
        } catch (error) {
            console.warn('Ошибка загрузки feature flags:', error);
        }

        // Fallback конфигурация (все выключено)
        return {
            newHeroDesign: false,
            enhancedForm: false,
            premiumSection: false,
            testimonialSlider: false,
            priceCalculator: false,
            chatWidget: false,
            videoBackground: false,
            animatedCounters: false
        };
    }

    // Проверка состояния флага
    isEnabled(flagName) {
        // Проверка URL параметров для тестирования
        const urlParams = new URLSearchParams(window.location.search);
        const urlFlag = urlParams.get('ff_' + flagName);

        if (urlFlag === 'true') return true;
        if (urlFlag === 'false') return false;

        // Возврат к основной конфигурации
        return this.flags[flagName] || false;
    }

    // Инициализация флагов на странице
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.applyFlags();
            this.logActiveFlags();
        });
    }

    // Применение флагов к DOM элементам
    applyFlags() {
        document.querySelectorAll('[data-feature]').forEach(element => {
            const flagName = element.getAttribute('data-feature');
            const isEnabled = this.isEnabled(flagName);

            // Показ/скрытие основного элемента
            element.style.display = isEnabled ? 'block' : 'none';

            // Управление content/fallback элементами
            const contentElements = element.querySelectorAll(`[data-feature-content="${flagName}"]`);
            const fallbackElements = element.querySelectorAll(`[data-feature-fallback="${flagName}"]`);

            contentElements.forEach(el => {
                el.style.display = isEnabled ? 'block' : 'none';
            });

            fallbackElements.forEach(el => {
                el.style.display = isEnabled ? 'none' : 'block';
            });
        });
    }

    // Логирование активных флагов для мониторинга
    logActiveFlags() {
        const activeFlags = Object.keys(this.flags).filter(flag => this.isEnabled(flag));

        if (activeFlags.length > 0) {
            console.log('🚩 Активные feature flags:', activeFlags);

            // Отправка в аналитику для мониторинга
            if (typeof gtag !== 'undefined') {
                gtag('event', 'feature_flags_active', {
                    'custom_parameter_flags': activeFlags.join(',')
                });
            }
        }
    }

    // Экстренное отключение всех флагов
    emergencyDisableAll() {
        Object.keys(this.flags).forEach(flag => {
            this.flags[flag] = false;
        });

        this.applyFlags();
        console.warn('🚨 Все feature flags экстренно отключены');

        // Уведомление системы мониторинга
        this.notifyEmergencyShutdown();
    }

    // Уведомление о экстренном отключении
    notifyEmergencyShutdown() {
        // Отправка в аналитику
        if (typeof gtag !== 'undefined') {
            gtag('event', 'emergency_shutdown', {
                'event_category': 'system',
                'event_label': 'feature_flags_disabled'
            });
        }
    }
}

// Инициализация системы флагов
const featureFlags = new FeatureFlagManager();

// Глобальная функция для экстренного отключения (доступна в консоли)
window.emergencyDisableFeatures = () => featureFlags.emergencyDisableAll();
```

#### CSS для Feature Flags

```css
/* Базовые стили для элементов с флагами */
[data-feature] {
    transition: opacity 0.3s ease-in-out;
}

[data-feature-content] {
    display: none; /* По умолчанию скрыто */
}

[data-feature-fallback] {
    display: block; /* По умолчанию показано */
}

/* Индикатор активных флагов для разработки */
.dev-mode [data-feature][style*="display: block"]::after {
    content: "🚩 " attr(data-feature);
    position: absolute;
    top: 0;
    right: 0;
    background: #ff6b6b;
    color: white;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 3px;
    z-index: 9999;
}
```

### 📋 Пошаговые процедуры отката изменений

#### 1. Экстренный откат через Feature Flags

**Шаги для немедленного отката:**

1. **Определить проблемный компонент**
   ```bash
   # В браузерной консоли
   featureFlags.isEnabled('проблемныйФлаг') // проверить статус
   ```

2. **Отключить конкретный флаг**
   ```javascript
   // В браузерной консоли администратора
   featureFlags.flags.проблемныйФлаг = false;
   featureFlags.applyFlags();
   ```

3. **Обновить конфигурационный файл**
   ```html
   <!-- В index.html изменить флаг на false -->
   <script type="application/json" id="feature-flags">
   {
       "проблемныйФлаг": false
   }
   </script>
   ```

4. **Экстренное отключение всех флагов**
   ```javascript
   // В критической ситуации
   window.emergencyDisableFeatures();
   ```

#### 2. Откат файлов через Backup систему

**Структура backup файлов:**
```
backup/
├── 2025-09-14_10-30/          # Backup с timestamp
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── images/
├── 2025-09-14_14-15/          # Следующий backup
├── stable/                    # Последняя стабильная версия
└── emergency/                 # Аварийная версия (минимальная)
```

**Скрипт автоматического backup:**
```php
<?php
// create-backup.php - запускать перед каждым деплоем
class BackupManager {
    private $backupDir;
    private $sourceDir;

    public function __construct($sourceDir = '.', $backupDir = './backup') {
        $this->sourceDir = realpath($sourceDir);
        $this->backupDir = $backupDir;

        if (!is_dir($this->backupDir)) {
            mkdir($this->backupDir, 0755, true);
        }
    }

    // Создание backup с timestamp
    public function createBackup() {
        $timestamp = date('Y-m-d_H-i');
        $backupPath = $this->backupDir . '/' . $timestamp;

        if (!is_dir($backupPath)) {
            mkdir($backupPath, 0755, true);
        }

        // Копирование основных файлов
        $filesToBackup = [
            'index.html',
            'css',
            'js',
            'images',
            'php'
        ];

        foreach ($filesToBackup as $item) {
            $sourcePath = $this->sourceDir . '/' . $item;
            $destinationPath = $backupPath . '/' . $item;

            if (file_exists($sourcePath)) {
                if (is_dir($sourcePath)) {
                    $this->copyDirectory($sourcePath, $destinationPath);
                } else {
                    copy($sourcePath, $destinationPath);
                }
            }
        }

        echo "✅ Backup создан: $backupPath\n";
        return $backupPath;
    }

    // Восстановление из backup
    public function restore($backupName) {
        $backupPath = $this->backupDir . '/' . $backupName;

        if (!is_dir($backupPath)) {
            throw new Exception("Backup не найден: $backupName");
        }

        // Создание backup текущего состояния
        $emergencyBackup = $this->createBackup();
        echo "🔄 Создан emergency backup: $emergencyBackup\n";

        // Восстановление файлов
        $this->copyDirectory($backupPath, $this->sourceDir);
        echo "✅ Восстановление завершено из: $backupName\n";
    }

    // Рекурсивное копирование директории
    private function copyDirectory($source, $destination) {
        if (!is_dir($destination)) {
            mkdir($destination, 0755, true);
        }

        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($source, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );

        foreach ($iterator as $item) {
            $destPath = $destination . DIRECTORY_SEPARATOR . $iterator->getSubPathName();

            if ($item->isDir()) {
                mkdir($destPath, 0755, true);
            } else {
                copy($item, $destPath);
            }
        }
    }

    // Список доступных backup'ов
    public function listBackups() {
        $backups = [];
        $files = scandir($this->backupDir);

        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..' && is_dir($this->backupDir . '/' . $file)) {
                $backups[] = $file;
            }
        }

        rsort($backups); // Новые сначала
        return $backups;
    }
}

// Использование
$backup = new BackupManager();

if ($argc > 1) {
    switch ($argv[1]) {
        case 'create':
            $backup->createBackup();
            break;
        case 'restore':
            if (isset($argv[2])) {
                $backup->restore($argv[2]);
            } else {
                echo "Использование: php create-backup.php restore BACKUP_NAME\n";
            }
            break;
        case 'list':
            $backups = $backup->listBackups();
            echo "Доступные backup'ы:\n";
            foreach ($backups as $backupName) {
                echo "  - $backupName\n";
            }
            break;
        default:
            echo "Использование:\n";
            echo "  php create-backup.php create\n";
            echo "  php create-backup.php restore BACKUP_NAME\n";
            echo "  php create-backup.php list\n";
    }
} else {
    $backup->createBackup();
}
?>
```

### 🔧 План действий при критических ошибках

#### Уровень 1: Мягкие ошибки (визуальные баги, неработающие элементы)

**Действия:**
1. **Диагностика** (1-2 минуты)
   - Открыть Developer Tools → Console
   - Проверить JavaScript ошибки
   - Проверить Network tab на 404/500 ошибки

2. **Быстрый фикс** (2-3 минуты)
   - Отключить проблемный feature flag
   - Обновить CSS/JS файл с исправлением
   - Очистить кэш браузера

3. **Проверка** (1 минута)
   - Проверить основную функциональность
   - Убедиться что формы работают

#### Уровень 2: Критические ошибки (нерабочие формы, 500 ошибки)

**Действия:**
1. **Немедленное действие** (30 секунд)
   ```javascript
   // Экстренное отключение всех новых функций
   window.emergencyDisableFeatures();
   ```

2. **Диагностика backend** (1-2 минуты)
   ```bash
   # Проверка PHP скрипта
   php -l php/send-form.php

   # Проверка лог файлов хостинга
   tail -f error_log
   ```

3. **Откат через backup** (3-5 минут)
   ```bash
   php create-backup.php restore stable
   ```

#### Уровень 3: Полная недоступность сайта

**Действия:**
1. **Мгновенное восстановление** (1 минута)
   ```bash
   # Восстановление минимальной версии
   php create-backup.php restore emergency
   ```

2. **Проверка хостинга**
   - Проверить статус сервера
   - Проверить SSL сертификат
   - Связаться с техподдержкой хостинга

### 📊 Мониторинг и алерты

#### JavaScript Error Monitoring

```javascript
class ErrorMonitor {
    constructor() {
        this.errorQueue = [];
        this.maxErrors = 10;
        this.alertThreshold = 3; // 3 ошибки = алерт
        this.init();
    }

    init() {
        // Перехват JavaScript ошибок
        window.addEventListener('error', (event) => {
            this.logError({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                line: event.lineno,
                column: event.colno,
                stack: event.error?.stack,
                timestamp: new Date().toISOString()
            });
        });

        // Перехват Promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError({
                type: 'promise',
                message: event.reason.toString(),
                timestamp: new Date().toISOString()
            });
        });

        // Мониторинг производительности
        this.monitorPerformance();
    }

    logError(errorData) {
        this.errorQueue.push(errorData);

        // Ограничение размера очереди
        if (this.errorQueue.length > this.maxErrors) {
            this.errorQueue.shift();
        }

        console.error('🚨 Ошибка зафиксирована:', errorData);

        // Проверка на критическое количество ошибок
        if (this.errorQueue.length >= this.alertThreshold) {
            this.triggerAlert();
        }

        // Отправка в аналитику
        if (typeof gtag !== 'undefined') {
            gtag('event', 'javascript_error', {
                'event_category': 'error',
                'event_label': errorData.message.substring(0, 100),
                'custom_parameter_filename': errorData.filename,
                'custom_parameter_line': errorData.line
            });
        }
    }

    triggerAlert() {
        console.warn('🚨 КРИТИЧЕСКИЙ УРОВЕНЬ ОШИБОК - Рекомендуется откат!');

        // Показ уведомления пользователю (опционально)
        if (confirm('Обнаружены критические ошибки. Применить экстренные исправления?')) {
            window.emergencyDisableFeatures();
        }

        // Отправка алерта администратору
        fetch('php/alert-handler.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'critical_errors',
                errors: this.errorQueue,
                url: window.location.href,
                userAgent: navigator.userAgent
            })
        }).catch(err => console.error('Не удалось отправить алерт:', err));
    }

    monitorPerformance() {
        // Проверка производительности каждые 30 секунд
        setInterval(() => {
            if ('performance' in window && 'timing' in performance) {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;

                // Алерт при медленной загрузке (>5 секунд)
                if (loadTime > 5000) {
                    this.logError({
                        type: 'performance',
                        message: 'Медленная загрузка страницы',
                        loadTime: loadTime,
                        timestamp: new Date().toISOString()
                    });
                }
            }
        }, 30000);
    }

    // Получение отчета об ошибках
    getErrorReport() {
        return {
            totalErrors: this.errorQueue.length,
            errors: this.errorQueue,
            timestamp: new Date().toISOString()
        };
    }
}

// Инициализация мониторинга
const errorMonitor = new ErrorMonitor();

// Глобальная функция для получения отчета
window.getErrorReport = () => errorMonitor.getErrorReport();
```

#### PHP Alert Handler

```php
<?php
// php/alert-handler.php - обработчик критических алертов
header('Content-Type: application/json; charset=utf-8');

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Получение данных алерта
$input = file_get_contents('php://input');
$alertData = json_decode($input, true);

if (!$alertData) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Email настройки для алертов
$alertEmail = 'admin@retroznak.ru';
$fromEmail = 'noreply@retroznak.ru';

// Формирование сообщения
$subject = '🚨 КРИТИЧЕСКИЙ АЛЕРТ - Лендинг Ретрознак';
$message = "ОБНАРУЖЕНЫ КРИТИЧЕСКИЕ ОШИБКИ НА ЛЕНДИНГЕ!\n\n";
$message .= "Тип алерта: " . $alertData['type'] . "\n";
$message .= "URL: " . $alertData['url'] . "\n";
$message .= "User-Agent: " . $alertData['userAgent'] . "\n";
$message .= "Время: " . date('Y-m-d H:i:s') . "\n\n";

if (isset($alertData['errors'])) {
    $message .= "ДЕТАЛИ ОШИБОК:\n";
    foreach ($alertData['errors'] as $index => $error) {
        $message .= "\n" . ($index + 1) . ". " . $error['type'] . "\n";
        $message .= "   Сообщение: " . $error['message'] . "\n";
        if (isset($error['filename'])) {
            $message .= "   Файл: " . $error['filename'] . ":" . $error['line'] . "\n";
        }
        $message .= "   Время: " . $error['timestamp'] . "\n";
    }
}

$message .= "\n\nРЕКОМЕНДУЕМЫЕ ДЕЙСТВИЯ:\n";
$message .= "1. Проверить статус сайта\n";
$message .= "2. Отключить проблемные feature flags\n";
$message .= "3. При необходимости выполнить откат\n";
$message .= "4. Команда экстренного отключения: window.emergencyDisableFeatures()\n";

// Отправка email алерта
$headers = "From: $fromEmail\r\n";
$headers .= "Reply-To: $fromEmail\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$emailSent = mail($alertEmail, $subject, $message, $headers);

// Логирование алерта в файл
$logFile = dirname(__FILE__) . '/logs/alerts.log';
$logDir = dirname($logFile);

if (!is_dir($logDir)) {
    mkdir($logDir, 0755, true);
}

$logEntry = [
    'timestamp' => date('Y-m-d H:i:s'),
    'type' => $alertData['type'],
    'url' => $alertData['url'],
    'ip' => $_SERVER['REMOTE_ADDR'],
    'user_agent' => $alertData['userAgent'],
    'error_count' => count($alertData['errors'] ?? []),
    'email_sent' => $emailSent
];

file_put_contents($logFile, json_encode($logEntry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

// Ответ клиенту
echo json_encode([
    'success' => true,
    'alert_logged' => true,
    'email_sent' => $emailSent
]);
?>
```

### ⚡ Быстрое переключение между версиями

#### Version Manager для лендинга

```javascript
class VersionManager {
    constructor() {
        this.versions = {
            'stable': {
                name: 'Стабильная версия',
                description: 'Проверенная версия без экспериментальных функций',
                flags: {
                    newHeroDesign: false,
                    enhancedForm: false,
                    premiumSection: false,
                    testimonialSlider: false,
                    priceCalculator: false,
                    chatWidget: false,
                    videoBackground: false,
                    animatedCounters: false
                }
            },
            'testing': {
                name: 'Тестовая версия',
                description: 'Версия с новыми функциями для тестирования',
                flags: {
                    newHeroDesign: true,
                    enhancedForm: true,
                    premiumSection: false,
                    testimonialSlider: true,
                    priceCalculator: false,
                    chatWidget: false,
                    videoBackground: false,
                    animatedCounters: true
                }
            },
            'beta': {
                name: 'Бета версия',
                description: 'Все новые функции включены',
                flags: {
                    newHeroDesign: true,
                    enhancedForm: true,
                    premiumSection: true,
                    testimonialSlider: true,
                    priceCalculator: true,
                    chatWidget: true,
                    videoBackground: false, // тяжелая функция
                    animatedCounters: true
                }
            },
            'minimal': {
                name: 'Минимальная версия',
                description: 'Только базовая функциональность для экстренных ситуаций',
                flags: {
                    newHeroDesign: false,
                    enhancedForm: false,
                    premiumSection: false,
                    testimonialSlider: false,
                    priceCalculator: false,
                    chatWidget: false,
                    videoBackground: false,
                    animatedCounters: false
                }
            }
        };
    }

    // Переключение на конкретную версию
    switchToVersion(versionName) {
        if (!this.versions[versionName]) {
            console.error('Неизвестная версия:', versionName);
            return false;
        }

        const version = this.versions[versionName];

        // Обновление флагов
        Object.assign(featureFlags.flags, version.flags);

        // Применение изменений
        featureFlags.applyFlags();

        // Сохранение выбранной версии
        localStorage.setItem('selectedVersion', versionName);

        console.log(`✅ Переключено на версию: ${version.name}`);
        console.log(`📝 ${version.description}`);

        // Уведомление аналитики
        if (typeof gtag !== 'undefined') {
            gtag('event', 'version_switch', {
                'event_category': 'system',
                'event_label': versionName,
                'custom_parameter_description': version.description
            });
        }

        return true;
    }

    // Получение текущей версии
    getCurrentVersion() {
        const saved = localStorage.getItem('selectedVersion');
        return saved && this.versions[saved] ? saved : 'stable';
    }

    // Автоматическое переключение на безопасную версию при ошибках
    switchToSafeMode() {
        console.warn('🚨 Переключение в безопасный режим из-за критических ошибок');
        return this.switchToVersion('minimal');
    }

    // Показ панели управления версиями (для админов)
    showVersionPanel() {
        if (window.location.search.includes('admin=true')) {
            this.createVersionPanel();
        }
    }

    createVersionPanel() {
        const panel = document.createElement('div');
        panel.id = 'version-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #1f2937;
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            font-family: monospace;
            font-size: 12px;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        let panelHTML = '<h4 style="margin: 0 0 10px 0;">🔧 Version Manager</h4>';
        panelHTML += `<p>Текущая: <strong>${this.getCurrentVersion()}</strong></p>`;

        Object.keys(this.versions).forEach(versionName => {
            const version = this.versions[versionName];
            const isActive = versionName === this.getCurrentVersion();

            panelHTML += `
                <button onclick="versionManager.switchToVersion('${versionName}')"
                        style="
                            display: block;
                            width: 100%;
                            margin: 5px 0;
                            padding: 8px;
                            background: ${isActive ? '#10b981' : '#374151'};
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 11px;
                        ">
                    ${version.name}
                    <div style="font-size: 9px; opacity: 0.8;">${version.description}</div>
                </button>
            `;
        });

        panel.innerHTML = panelHTML;
        document.body.appendChild(panel);

        // Кнопка закрытия панели
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 10px;
            background: none;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
        `;
        closeBtn.onclick = () => panel.remove();
        panel.appendChild(closeBtn);
    }
}

// Инициализация менеджера версий
const versionManager = new VersionManager();

// Глобальные функции для быстрого переключения
window.switchToStable = () => versionManager.switchToVersion('stable');
window.switchToTesting = () => versionManager.switchToVersion('testing');
window.switchToBeta = () => versionManager.switchToVersion('beta');
window.switchToMinimal = () => versionManager.switchToVersion('minimal');

// Показ панели управления версиями для админов
versionManager.showVersionPanel();
```

### 🔗 Интеграция с системой мониторинга

#### Dashboard для отслеживания статуса

```html
<!-- admin-dashboard.html - простой dashboard для мониторинга -->
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ретрознак - Admin Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .dashboard { max-width: 1200px; margin: 0 auto; }
        .card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .status-ok { color: #10b981; }
        .status-warning { color: #f59e0b; }
        .status-error { color: #ef4444; }
        .btn { padding: 10px 20px; margin: 5px; border: none; border-radius: 4px; cursor: pointer; }
        .btn-primary { background: #3b82f6; color: white; }
        .btn-danger { background: #ef4444; color: white; }
        .btn-warning { background: #f59e0b; color: white; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    </style>
</head>
<body>
    <div class="dashboard">
        <h1>🔧 Admin Dashboard - Ретрознак</h1>

        <div class="grid">
            <!-- Статус системы -->
            <div class="card">
                <h3>📊 Статус системы</h3>
                <div id="system-status">Загрузка...</div>
            </div>

            <!-- Feature Flags -->
            <div class="card">
                <h3>🚩 Feature Flags</h3>
                <div id="feature-flags-status">Загрузка...</div>
            </div>

            <!-- Ошибки -->
            <div class="card">
                <h3>🚨 Последние ошибки</h3>
                <div id="error-log">Загрузка...</div>
            </div>

            <!-- Быстрые действия -->
            <div class="card">
                <h3>⚡ Быстрые действия</h3>
                <button class="btn btn-warning" onclick="emergencyDisableAll()">
                    🚨 Отключить все флаги
                </button>
                <button class="btn btn-primary" onclick="switchToStable()">
                    🛡️ Стабильная версия
                </button>
                <button class="btn btn-danger" onclick="switchToMinimal()">
                    ⛑️ Минимальная версия
                </button>
                <button class="btn btn-primary" onclick="createBackup()">
                    💾 Создать backup
                </button>
            </div>
        </div>

        <!-- Лог операций -->
        <div class="card">
            <h3>📝 Лог операций</h3>
            <div id="operations-log" style="height: 200px; overflow-y: auto; background: #f9f9f9; padding: 10px; font-family: monospace; font-size: 12px;">
                Загрузка логов...
            </div>
        </div>
    </div>

    <script>
        // Функции для Dashboard
        function emergencyDisableAll() {
            if (confirm('⚠️ Вы уверены? Это отключит все новые функции.')) {
                // Здесь код для отключения флагов
                logOperation('🚨 ЭКСТРЕННОЕ ОТКЛЮЧЕНИЕ всех feature flags', 'warning');
            }
        }

        function switchToStable() {
            // Переключение на стабильную версию
            logOperation('🛡️ Переключение на стабильную версию', 'info');
        }

        function switchToMinimal() {
            if (confirm('⚠️ Переключить на минимальную версию? Отключит большинство функций.')) {
                logOperation('⛑️ Переключение на минимальную версию', 'warning');
            }
        }

        function createBackup() {
            logOperation('💾 Запуск создания backup...', 'info');
            // Здесь вызов API для создания backup
        }

        function logOperation(message, type = 'info') {
            const log = document.getElementById('operations-log');
            const timestamp = new Date().toLocaleString();
            const icon = type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️';

            log.innerHTML += `<div>[${timestamp}] ${icon} ${message}</div>`;
            log.scrollTop = log.scrollHeight;
        }

        // Инициализация Dashboard
        document.addEventListener('DOMContentLoaded', function() {
            logOperation('Dashboard инициализирован', 'info');

            // Здесь можно добавить загрузку реального статуса
            document.getElementById('system-status').innerHTML =
                '<div class="status-ok">✅ Система работает нормально</div>';

            // Обновление каждые 30 секунд
            setInterval(() => {
                logOperation('Обновление статуса...', 'info');
            }, 30000);
        });
    </script>
</body>
</html>
```

### 📝 Checklist для экстренных ситуаций

**📋 Быстрый чек-лист при проблемах:**

**1. НЕМЕДЛЕННЫЕ ДЕЙСТВИЯ (первые 30 секунд):**
- [ ] Открыть браузерную консоль (F12)
- [ ] Выполнить `window.emergencyDisableFeatures()`
- [ ] Проверить, исчезли ли ошибки
- [ ] Если не помогло → переходить к шагу 2

**2. ОТКАТ ФУНКЦИЙ (1-2 минуты):**
- [ ] Выполнить `window.switchToStable()`
- [ ] Проверить работу основных функций
- [ ] Если формы не работают → переходить к шагу 3

**3. ВОССТАНОВЛЕНИЕ ИЗ BACKUP (2-5 минут):**
- [ ] `php create-backup.php restore stable`
- [ ] Проверить доступность сайта
- [ ] Проверить отправку форм
- [ ] Если проблемы остались → переходить к шагу 4

**4. КРИТИЧЕСКОЕ ВОССТАНОВЛЕНИЕ (1 минута):**
- [ ] `php create-backup.php restore emergency`
- [ ] Связаться с техподдержкой хостинга
- [ ] Уведомить администратора

**5. КОНТАКТЫ ДЛЯ ЭКСТРЕННЫХ СИТУАЦИЙ:**
- **Хостинг:** [номер техподдержки]
- **Разработчик:** [контактная информация]
- **Email алертов:** admin@retroznak.ru

---

### 🎯 Заключение по Rollback & Recovery

Реализованная система обеспечивает:

**✅ Безопасность развертывания:**
- Feature flags для постепенного включения функций
- Возможность мгновенного отката проблемных компонентов
- Автоматическое резервное копирование

**✅ Быстрое восстановление:**
- 4-уровневая система восстановления (флаги → файлы → backup → экстренный)
- Автоматический мониторинг ошибок и алерты
- Простые команды для немедленного отката

**✅ Vanilla подход:**
- Никаких сложных инструментов или зависимостей
- Работает на любом хостинге с PHP поддержкой
- Простота управления через браузерную консоль

**⚡ Время восстановления:**
- Отключение флага: 30 секунд
- Переключение версии: 1 минута
- Восстановление из backup: 2-5 минут
- Критическое восстановление: 1 минута

Система готова к производственному использованию и обеспечивает безопасное развертывание новых функций с возможностью мгновенного отката.

---

*Техническая спецификация готова к использованию для разработки!*