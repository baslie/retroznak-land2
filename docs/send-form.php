<?php

// =====================================================================================
// СЕКЦИЯ КОНФИГУРАЦИИ
// =====================================================================================

// Загружаем переменные из .env файла
function loadEnv($filePath) {
    if (!file_exists($filePath)) {
        return;
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue; // Пропускаем комментарии
        }

        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);

        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

// Загружаем .env файл
loadEnv(__DIR__ . '/../.env');

// Конфигурация из переменных окружения
define("SMARTCAPTCHA_SERVER_KEY", $_ENV['SMARTCAPTCHA_SERVER_KEY'] ?? "YOUR_SMARTCAPTCHA_KEY_HERE");
define("RECIPIENT_EMAILS", explode(',', $_ENV['RECIPIENT_EMAILS'] ?? "rytrycon@gmail.com"));
define("SITE_NAME", $_ENV['SITE_NAME'] ?? "land.retroznak.ru");

// Константы для валидации
define("MIN_NAME_LENGTH", 2);
define("MIN_ADDRESS_LENGTH", 5);
define("CAPTCHA_TIMEOUT", 30);
define("CAPTCHA_CONNECT_TIMEOUT", 10);

// Отключаем вывод ошибок
error_reporting(0);
ini_set("display_errors", 0);
ini_set("log_errors", 0);

// Заголовки для JSON ответа
header("Content-Type: application/json; charset=utf-8");

// =====================================================================================
// СЕКЦИЯ УТИЛИТ
// =====================================================================================

/**
 * Отправляет JSON ответ и завершает выполнение
 * @param bool $success Статус успеха
 * @param string $message Сообщение
 */
function sendJsonResponse($success, $message) {
    $response = [
        "success" => $success,
        "message" => $message,
    ];

    ob_clean();
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit();
}

/**
 * Получает реальный IP адрес пользователя
 * @return string IP адрес
 */
function getRealUserIP() {
    $ipHeaders = [
        "HTTP_CF_CONNECTING_IP",
        "HTTP_X_REAL_IP", 
        "HTTP_X_FORWARDED_FOR",
        "HTTP_CLIENT_IP",
        "REMOTE_ADDR",
    ];

    foreach ($ipHeaders as $header) {
        if (array_key_exists($header, $_SERVER) && !empty($_SERVER[$header])) {
            $ips = explode(",", $_SERVER[$header]);
            foreach ($ips as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }
    }

    return $_SERVER["REMOTE_ADDR"] ?? "127.0.0.1";
}

// =====================================================================================
// ОСНОВНОЙ КЛАСС ОБРАБОТЧИКА ФОРМЫ
// =====================================================================================

class FormHandler {
    
    private $formData = [];
    private $errors = [];
    private $userIP;
    
    /**
     * Конструктор класса
     */
    public function __construct() {
        $this->userIP = getRealUserIP();
        $this->initializeFormData();
    }
    
    /**
     * Инициализация данных формы из POST запроса
     */
    private function initializeFormData() {
        $this->formData = [
            'smartToken' => $_POST["smart-token"] ?? "",
            'name' => trim($_POST["name"] ?? ""),
            'phone' => trim($_POST["phone"] ?? ""),
            'email' => trim($_POST["email"] ?? ""),
            'address' => trim($_POST["address"] ?? ""),
            'comment' => trim($_POST["comment"] ?? ""),
            'privacyConsent' => isset($_POST["privacy-consent"])
        ];
    }
    
    // =====================================================================================
    // СЕКЦИЯ БЕЗОПАСНОСТИ - КАПЧА
    // =====================================================================================
    
    /**
     * Проверяет капчу через API Яндекс SmartCaptcha
     * @param string $token Токен капчи
     * @return bool Результат проверки
     */
    private function verifyCaptcha($token) {
        // Предварительные проверки
        if (empty(SMARTCAPTCHA_SERVER_KEY) || empty($token) || !function_exists("curl_init")) {
            return false;
        }

        // Инициализация cURL
        $ch = curl_init("https://smartcaptcha.yandexcloud.net/validate");
        if (!$ch) {
            return false;
        }

        // Параметры запроса
        $requestParams = [
            "secret" => SMARTCAPTCHA_SERVER_KEY,
            "token" => $token,
            "ip" => $this->userIP,
        ];

        // Настройка cURL
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query($requestParams),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => CAPTCHA_TIMEOUT,
            CURLOPT_CONNECTTIMEOUT => CAPTCHA_CONNECT_TIMEOUT,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_USERAGENT => "RetroZnak-Form/1.0",
        ]);

        // Выполнение запроса
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // Проверка HTTP статуса
        if ($httpCode !== 200) {
            return false;
        }

        // Парсинг ответа
        $responseData = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return false;
        }

        return isset($responseData["status"]) && $responseData["status"] === "ok";
    }
    
    // =====================================================================================
    // СЕКЦИЯ ВАЛИДАЦИИ
    // =====================================================================================
    
    /**
     * Валидация имени
     * @param string $name Имя для проверки
     * @return array Результат валидации
     */
    private function validateName($name) {
        $cleanName = trim($name);
        
        if (empty($cleanName)) {
            return ['isValid' => false, 'message' => 'Имя обязательно для заполнения'];
        }
        
        if (mb_strlen($cleanName) < MIN_NAME_LENGTH) {
            return ['isValid' => false, 'message' => 'Имя должно содержать минимум ' . MIN_NAME_LENGTH . ' символа'];
        }
        
        return ['isValid' => true, 'value' => $cleanName];
    }
    
    /**
     * Валидация телефона
     * @param string $phone Телефон для проверки
     * @return array Результат валидации
     */
    private function validatePhone($phone) {
        $cleanPhone = preg_replace('/[\s\-\(\)]+/', '', $phone);
        
        if (empty($cleanPhone)) {
            return ['isValid' => false, 'message' => 'Телефон обязателен для заполнения'];
        }
        
        $phoneDigits = ltrim($cleanPhone, '+');
        if (!ctype_digit($phoneDigits)) {
            return ['isValid' => false, 'message' => 'Введите корректный номер телефона'];
        }
        
        return ['isValid' => true, 'value' => $cleanPhone];
    }
    
    /**
     * Валидация email адреса
     * @param string $email Email для проверки
     * @return array Результат валидации
     */
    private function validateEmail($email) {
        if (empty($email)) {
            return ['isValid' => false, 'message' => 'Email обязателен для заполнения'];
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['isValid' => false, 'message' => 'Введите корректный email адрес'];
        }
        
        return ['isValid' => true, 'value' => strtolower(trim($email))];
    }
    
    /**
     * Валидация адреса
     * @param string $address Адрес для проверки
     * @return array Результат валидации
     */
    private function validateAddress($address) {
        $cleanAddress = trim($address);
        
        if (empty($cleanAddress)) {
            return ['isValid' => false, 'message' => 'Адрес обязателен для заполнения'];
        }
        
        if (mb_strlen($cleanAddress) < MIN_ADDRESS_LENGTH) {
            return ['isValid' => false, 'message' => 'Адрес слишком короткий (минимум ' . MIN_ADDRESS_LENGTH . ' символов)'];
        }
        
        return ['isValid' => true, 'value' => $cleanAddress];
    }
    
    /**
     * Выполняет валидацию всех полей формы
     * @return bool Результат валидации (true если все поля валидны)
     */
    private function validateAllFields() {
        $this->errors = [];
        
        // Конфигурация обязательных полей и их валидаторов
        $validationRules = [
            'phone' => 'validatePhone',
            // 'email' => 'validateEmail',
            // Можно легко добавить другие поля:
            // 'name' => 'validateName',
            // 'address' => 'validateAddress'
        ];
        
        // Проверяем каждое поле
        foreach ($validationRules as $fieldName => $validator) {
            $fieldValue = $this->formData[$fieldName];
            $validationResult = $this->$validator($fieldValue);
            
            if (!$validationResult['isValid']) {
                $this->errors[] = $validationResult['message'];
            } else {
                // Сохраняем очищенное значение
                $this->formData[$fieldName] = $validationResult['value'];
            }
        }
        
        // Проверяем согласие на обработку данных
        if (!$this->formData['privacyConsent']) {
            $this->errors[] = "Необходимо согласие на обработку персональных данных";
        }
        
        return empty($this->errors);
    }
    
    // =====================================================================================
    // СЕКЦИЯ EMAIL
    // =====================================================================================
    
    /**
     * Извлекает UTM-метки из URL
     * @param string $url URL для парсинга
     * @return array Массив UTM-меток
     */
    private function extractUtmParams($url) {
        $utmParams = [];
        
        if (empty($url)) {
            return $utmParams;
        }
        
        $parsedUrl = parse_url($url);
        if (!isset($parsedUrl['query'])) {
            return $utmParams;
        }
        
        parse_str($parsedUrl['query'], $queryParams);
        
        $utmKeys = [
            'utm_source' => 'Источник',
            'utm_medium' => 'Канал',
            'utm_campaign' => 'Кампания',
            'utm_content' => 'Объявление',
            'utm_term' => 'Ключевое слово',
            'gclid' => 'Google Click ID',
            'yclid' => 'Yandex Click ID',
            'fbclid' => 'Facebook Click ID'
        ];
        
        foreach ($utmKeys as $key => $label) {
            if (isset($queryParams[$key]) && !empty($queryParams[$key])) {
                $utmParams[$label] = $queryParams[$key];
            }
        }
        
        return $utmParams;
    }
    
    /**
     * Формирует красивое отображение UTM-меток
     * @param array $utmParams UTM-параметры
     * @return string HTML для отображения
     */
    private function formatUtmParams($utmParams) {
        if (empty($utmParams)) {
            return '<span style="color: #888; font-style: italic;">Отсутствуют</span>';
        }
        
        $html = '<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-top: 5px;">';
        foreach ($utmParams as $label => $value) {
            $html .= '<div style="margin-bottom: 5px;"><strong>' . htmlspecialchars($label) . ':</strong> ' . htmlspecialchars($value) . '</div>';
        }
        $html .= '</div>';
        
        return $html;
    }
    
    /**
     * Формирует HTML содержимое письма
     * @return string HTML контент
     */
    private function buildEmailContent() {
        $systemInfo = $this->getSystemInfo();
        
        $html = '
        <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; color: #333;">
            <h2>Новая заявка с сайта</h2>
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
                ' . $this->buildFormDataRows() . '
                ' . $this->buildSystemInfoRows($systemInfo) . '
            </table>
            
            <h3 style="margin-top: 20px;">Информация о переходе</h3>
            <table style="border-collapse: collapse; width: 100%;">
                ' . $this->buildReferralInfoRows($systemInfo) . '
            </table>
        </body>
        </html>';
        
        return $html;
    }
    
    /**
     * Формирует строки таблицы с данными формы
     * @return string HTML строки
     */
    private function buildFormDataRows() {
        $rows = '';
        $fieldsToShow = [
            'name' => 'Имя',
            'phone' => 'Телефон', 
            'email' => 'Email',
            'address' => 'Адрес'
        ];
        
        foreach ($fieldsToShow as $field => $label) {
            $value = htmlspecialchars($this->formData[$field]);
            // Показываем пустые поля более явно
            if (empty($value)) {
                $value = '<span style="color: #888; font-style: italic;">Не указано</span>';
            }
            $rows .= $this->createTableRow($label, $value);
        }
        
        // Комментарий отдельно, если есть
        if (!empty($this->formData['comment'])) {
            $comment = nl2br(htmlspecialchars($this->formData['comment']));
            $rows .= $this->createTableRow('Комментарий', $comment);
        }
        
        return $rows;
    }
    
    /**
     * Формирует строки таблицы с системной информацией
     * @param array $systemInfo Системная информация
     * @return string HTML строки
     */
    private function buildSystemInfoRows($systemInfo) {
        return $this->createTableRow('Дата', $systemInfo['date']) .
               $this->createTableRow('IP адрес', htmlspecialchars($systemInfo['ip']));
    }
    
    /**
     * Формирует строки таблицы с реферальной информацией
     * @param array $systemInfo Системная информация
     * @return string HTML строки
     */
    private function buildReferralInfoRows($systemInfo) {
        // Извлекаем UTM-метки из referer'а
        $utmFromReferer = $this->extractUtmParams($systemInfo['referer']);
        
        // Также проверяем текущий query string
        $currentUrl = (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . 
                     ($_SERVER['HTTP_HOST'] ?? 'localhost') . 
                     ($_SERVER['REQUEST_URI'] ?? '');
        $utmFromCurrent = $this->extractUtmParams($currentUrl);
        
        // Объединяем UTM-метки (приоритет текущим)
        $allUtmParams = array_merge($utmFromReferer, $utmFromCurrent);
        
        $rows = $this->createTableRow('Источник перехода', htmlspecialchars($systemInfo['referer']));
        
        // Красивое отображение UTM-меток
        $utmDisplay = $this->formatUtmParams($allUtmParams);
        $rows .= $this->createTableRow('UTM-метки и параметры', $utmDisplay);
        
        // Показываем сырой query string, если он есть
        if (!empty($systemInfo['queryString'])) {
            $rows .= $this->createTableRow('Дополнительные параметры', htmlspecialchars($systemInfo['queryString']));
        }
        
        return $rows;
    }
    
    /**
     * Создает строку таблицы для email
     * @param string $label Метка
     * @param string $value Значение
     * @return string HTML строка
     */
    private function createTableRow($label, $value) {
        return '<tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">' . $label . ':</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; vertical-align: top;">' . $value . '</td>
        </tr>';
    }
    
    /**
     * Получает системную информацию для письма
     * @return array Массив с системной информацией
     */
    private function getSystemInfo() {
        $tomskTime = new DateTime('now', new DateTimeZone('Asia/Tomsk'));
        
        return [
            'date' => $tomskTime->format("d.m.Y H:i:s") . " (Томск)", // Добавляем указание часового пояса
            'ip' => $this->userIP,
            'referer' => $_SERVER["HTTP_REFERER"] ?? "Прямой переход",
            'userAgent' => $_SERVER["HTTP_USER_AGENT"] ?? "Неизвестно",
            'queryString' => $_SERVER["QUERY_STRING"] ?? "",
            'requestUri' => $_SERVER["REQUEST_URI"] ?? ""
        ];
    }
    
    /**
     * Формирует заголовки для email
     * @return array Массив заголовков
     */
    private function prepareEmailHeaders() {
        $domain = $_SERVER["HTTP_HOST"] ?? "land.retroznak.ru";
        $fromEmail = "noreply@{$domain}";
        
        return [
            "MIME-Version: 1.0",
            "Content-type: text/html; charset=UTF-8",
            "From: " . SITE_NAME . " <" . $fromEmail . ">",
            "Reply-To: " . $this->formData['email'],
            "X-Mailer: PHP/" . phpversion(),
            "X-Priority: 3",
            "Return-Path: " . $fromEmail,
        ];
    }
    
    /**
     * Отправляет email всем получателям
     * @return bool Результат отправки
     */
    private function sendEmails() {
        $subject = "Новая заявка с сайта " . SITE_NAME;
        $message = $this->buildEmailContent();
        $headers = implode("\r\n", $this->prepareEmailHeaders());
        
        $allSent = true;
        foreach (RECIPIENT_EMAILS as $recipient) {
            if (!mail($recipient, $subject, $message, $headers)) {
                $allSent = false;
            }
        }
        
        return $allSent;
    }
    
    // =====================================================================================
    // СЕКЦИЯ ОСНОВНОЙ ЛОГИКИ
    // =====================================================================================
    
    /**
     * Основной метод обработки формы
     */
    public function processForm() {
        // Проверяем метод запроса
        if ($_SERVER["REQUEST_METHOD"] !== "POST") {
            sendJsonResponse(false, "Неверный метод запроса");
        }
        
        // Проверяем наличие токена капчи
        // if (empty($this->formData['smartToken'])) {
        //     sendJsonResponse(false, "Не пройдена проверка капчи");
        // }
        
        // Проверяем капчу
        // if (!$this->verifyCaptcha($this->formData['smartToken'])) {
        //     sendJsonResponse(false, "Проверка капчи не пройдена. Попробуйте еще раз.");
        // }
        
        // Валидируем поля формы
        if (!$this->validateAllFields()) {
            sendJsonResponse(false, implode("; ", $this->errors));
        }
        
        // Отправляем письма
        if ($this->sendEmails()) {
            sendJsonResponse(true, "Заявка успешно отправлена! Мы свяжемся с вами в течение 2 часов.");
        } else {
            sendJsonResponse(false, "Ошибка при отправке письма. Попробуйте позже.");
        }
    }
}

// =====================================================================================
// ИНИЦИАЛИЗАЦИЯ И ВЫПОЛНЕНИЕ
// =====================================================================================

// Начинаем буферизацию вывода
ob_start();

// Создаем экземпляр обработчика и запускаем обработку
$formHandler = new FormHandler();
$formHandler->processForm();

?>
