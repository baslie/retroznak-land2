# 🚀 Deployment и CI/CD

### Deployment Checklist
```bash
# Чек-лист развертывания

# 1. Оптимизация ресурсов
□ Минификация CSS/JS файлов
□ Оптимизация изображений (WebP конверсия)
□ Gzip compression на сервере
□ Browser caching headers

# 2. Безопасность
□ HTTPS сертификат
□ Security headers (CSP, HSTS, X-Frame-Options)
□ PHP скрипт защищен от инъекций
□ Форма защищена от CSRF

# 3. SEO оптимизация
□ robots.txt настроен
□ sitemap.xml создан
□ Schema.org разметка валидна
□ Open Graph теги корректны
□ Meta теги оптимизированы

# 4. Производительность
□ PageSpeed Insights > 85
□ GTmetrix Grade A
□ Core Web Vitals в зеленой зоне
□ Mobile Friendly Test пройден

# 5. Функциональность
□ Форма заказа работает
□ Письма доходят на почту
□ SmartCaptcha функционирует
□ Аналитика настроена
□ Кроссбраузерность проверена

# 6. Мониторинг
□ Яндекс.Метрика цели настроены
□ Google Analytics события работают
□ Uptime monitoring настроен
□ Error logging настроен
```

### Production Build Process
```bash
#!/bin/bash
# build.sh - скрипт сборки для продакшена

echo "🚀 Начинаем сборку лендинга Ретрознак..."

# Создаем директорию для продакшн сборки
mkdir -p dist/

# Копируем основные файлы
cp index.html dist/
cp -r php/ dist/
cp -r docs/ dist/

# Обрабатываем CSS
echo "📦 Минификация CSS..."
mkdir -p dist/assets/css/
npx clean-css-cli assets/css/main.css -o dist/assets/css/main.min.css
npx clean-css-cli assets/css/components.css -o dist/assets/css/components.min.css

# Обрабатываем JavaScript
echo "📦 Минификация JavaScript..."
mkdir -p dist/assets/js/
npx terser assets/js/app.js -c -m -o dist/assets/js/app.min.js
npx terser assets/js/modules/*.js -c -m -o dist/assets/js/modules/

# Оптимизируем изображения
echo "🖼 Оптимизация изображений..."
mkdir -p dist/assets/images/
npx imagemin assets/images/**/*.{jpg,png} --out-dir=dist/assets/images/ --plugin=imagemin-webp

# Обновляем пути в HTML
sed -i 's/assets\/css\/main.css/assets\/css\/main.min.css/g' dist/index.html
sed -i 's/assets\/js\/app.js/assets\/js\/app.min.js/g' dist/index.html

# Создаем .htaccess для оптимизации
cat > dist/.htaccess << 'EOF'
# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
EOF

echo "✅ Сборка завершена! Файлы готовы к развертыванию в папке dist/"
```

---
