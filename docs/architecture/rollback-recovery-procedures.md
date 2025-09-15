# 🔄 Rollback & Recovery Procedures

### Архитектура отказоустойчивости
**Стратегия безопасного развертывания** — система feature flags и процедур отката для минимизации рисков при обновлениях лендинга.

**Принципы:**
- **Zero-Downtime Deployment** — развертывание без остановки сайта
- **Feature Toggles** — управление видимостью компонентов
- **Instant Rollback** — быстрый откат к предыдущей версии
- **Backup-First** — создание резервных копий перед изменениями

---

### 1. 🚩 Feature Flags System (Vanilla Implementation)

#### Простая система переключателей

**features.js** — конфигурационный файл:
```javascript
// js/features.js - Система управления feature flags
window.FeatureFlags = {
  // Основные компоненты UI
  components: {
    hero_section: true,              // Hero секция
    product_matrix: true,            // Товарная матрица
    testimonials: true,              // Блок отзывов
    order_form: true,                // Форма заказа
    smart_captcha: true,             // SmartCaptcha интеграция
    analytics_tracking: true,        // Аналитика
    smooth_scroll: true,             // Плавная прокрутка
    image_lazy_loading: true         // Ленивая загрузка изображений
  },

  // Экспериментальные фичи
  experiments: {
    new_hero_design: false,          // Новый дизайн hero
    alternative_form: false,         // Альтернативная форма
    video_testimonials: false,       // Видео отзывы
    chat_widget: false              // Виджет чата
  },

  // Аварийные отключения
  emergency: {
    disable_all_js: false,           // Полное отключение JS
    fallback_form: false,            // Резервная форма
    maintenance_mode: false          // Режим обслуживания
  },

  // Конфигурация по устройствам
  device_specific: {
    mobile_optimizations: true,      // Мобильные оптимизации
    desktop_animations: true,        // Анимации на десктопе
    tablet_layout: true             // Планшетный макет
  }
};
```

#### Система управления флагами

**feature-manager.js** — центральный контроллер:
```javascript
// js/modules/feature-manager.js
class FeatureManager {
  constructor() {
    this.flags = window.FeatureFlags || {};
    this.init();
  }

  init() {
    // Проверяем URL параметры для переопределения флагов
    this.parseURLOverrides();

    // Применяем флаги при загрузке DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.applyFeatureFlags();
      });
    } else {
      this.applyFeatureFlags();
    }
  }

  // Проверка активности функции
  isEnabled(flagPath) {
    const path = flagPath.split('.');
    let current = this.flags;

    for (const key of path) {
      if (current[key] === undefined) {
        console.warn(`Feature flag not found: ${flagPath}`);
        return false;
      }
      current = current[key];
    }

    return Boolean(current);
  }

  // Включение/выключение функций
  toggle(flagPath, value) {
    const path = flagPath.split('.');
    const key = path.pop();
    let current = this.flags;

    for (const pathKey of path) {
      if (!current[pathKey]) {
        current[pathKey] = {};
      }
      current = current[pathKey];
    }

    current[key] = value;

    // Мгновенное применение изменений
    this.applyFeatureFlags();

    // Логирование изменений
    console.log(`Feature flag ${flagPath} changed to: ${value}`);
  }

  // Применение флагов к DOM элементам
  applyFeatureFlags() {
    // Управление компонентами через CSS классы
    Object.entries(this.flags.components || {}).forEach(([feature, enabled]) => {
      const elements = document.querySelectorAll(`[data-feature="${feature}"]`);
      elements.forEach(element => {
        if (enabled) {
          element.classList.remove('feature-disabled');
          element.classList.add('feature-enabled');
        } else {
          element.classList.add('feature-disabled');
          element.classList.remove('feature-enabled');
        }
      });
    });

    // Экспериментальные фичи
    Object.entries(this.flags.experiments || {}).forEach(([experiment, enabled]) => {
      const elements = document.querySelectorAll(`[data-experiment="${experiment}"]`);
      elements.forEach(element => {
        element.style.display = enabled ? 'block' : 'none';
      });
    });

    // Аварийные режимы
    if (this.isEnabled('emergency.disable_all_js')) {
      this.disableAllJavaScript();
    }

    if (this.isEnabled('emergency.maintenance_mode')) {
      this.showMaintenanceMode();
    }
  }

  // Парсинг URL параметров для тестирования
  parseURLOverrides() {
    const urlParams = new URLSearchParams(window.location.search);
    const featurePrefix = 'feature_';

    for (const [key, value] of urlParams.entries()) {
      if (key.startsWith(featurePrefix)) {
        const flagPath = key.replace(featurePrefix, '').replace(/_/g, '.');
        const boolValue = value === 'true' || value === '1';
        this.toggle(flagPath, boolValue);
      }
    }
  }

  // Аварийное отключение JavaScript
  disableAllJavaScript() {
    // Удаляем все обработчики событий
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      const newElement = element.cloneNode(true);
      element.parentNode?.replaceChild(newElement, element);
    });

    // Показываем fallback контент
    document.body.classList.add('js-disabled-mode');
  }

  // Режим обслуживания
  showMaintenanceMode() {
    const maintenanceHTML = `
      <div id="maintenance-mode" style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); color: white; z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        font-family: Arial, sans-serif; text-align: center;
      ">
        <div>
          <h1>🔧 Временное обслуживание</h1>
          <p>Сайт находится на техническом обслуживании.<br>
          Приносим извинения за временные неудобства.</p>
          <p><strong>Телефон для срочных заказов: +7 983 232-22-06</strong></p>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', maintenanceHTML);
  }

  // Экспорт текущего состояния для резервного копирования
  exportState() {
    return {
      timestamp: new Date().toISOString(),
      flags: JSON.parse(JSON.stringify(this.flags)),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
  }

  // Загрузка состояния из резервной копии
  loadState(savedState) {
    this.flags = savedState.flags;
    this.applyFeatureFlags();
    console.log('Feature flags restored from backup:', savedState.timestamp);
  }
}

// Глобальная инициализация
window.featureManager = new FeatureManager();

// API для управления из консоли браузера
window.toggleFeature = (flagPath, value) => {
  window.featureManager.toggle(flagPath, value);
};
```

#### CSS поддержка для feature flags

**feature-flags.css** — стили для управления видимостью:
```css
/* css/feature-flags.css */

/* Базовые состояния feature flags */
.feature-disabled {
  display: none !important;
}

.feature-enabled {
  display: block;
}

/* Режим без JavaScript */
.js-disabled-mode {
  /* Показываем только критично важный контент */
}

.js-disabled-mode .js-only {
  display: none !important;
}

.js-disabled-mode .no-js-fallback {
  display: block !important;
}

/* Экспериментальные фичи */
[data-experiment] {
  display: none; /* По умолчанию скрыты */
}

[data-experiment].experiment-active {
  display: block;
}

/* Анимации для плавных переходов */
[data-feature] {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.feature-disabled {
  opacity: 0;
  transform: translateY(-10px);
}

.feature-enabled {
  opacity: 1;
  transform: translateY(0);
}

/* Индикаторы для режима разработки */
.debug-mode [data-feature] {
  position: relative;
}

.debug-mode [data-feature]:before {
  content: attr(data-feature);
  position: absolute;
  top: -20px;
  left: 0;
  background: #333;
  color: white;
  padding: 2px 6px;
  font-size: 10px;
  border-radius: 3px;
  z-index: 1000;
}

/* Мобильные оптимизации */
@media (max-width: 768px) {
  .feature-mobile-hidden {
    display: none !important;
  }
}

/* Планшетные оптимизации */
@media (min-width: 769px) and (max-width: 1024px) {
  .feature-tablet-hidden {
    display: none !important;
  }
}

/* Десктопные оптимизации */
@media (min-width: 1025px) {
  .feature-desktop-hidden {
    display: none !important;
  }
}
```

---

### 2. 📋 Пошаговые процедуры отката изменений

#### Быстрый откат (< 5 минут)

**Процедура Emergency Rollback:**

1. **Немедленное переключение на предыдущую версию:**
```bash
# На сервере - переименование папок
mv current_site current_site_broken
mv backup_site current_site

# Или через символические ссылки (рекомендуется)
ln -sfn /path/to/backup/site /path/to/public_html
```

2. **Активация аварийных feature flags:**
```javascript
// В консоли браузера или через admin панель
toggleFeature('emergency.maintenance_mode', true);
toggleFeature('emergency.disable_all_js', true);
toggleFeature('emergency.fallback_form', true);
```

3. **Проверка критичного функционала:**
```bash
# Тест формы заказа
curl -X POST https://retroznak.ru/php/send-form.php \
  -F "name=Test" \
  -F "phone=+7900000000" \
  -F "model=leninsky"
```

#### Плановый откат (15-30 минут)

**Процедура Planned Rollback:**

1. **Создание снапшота текущего состояния:**
```javascript
// Сохранение состояния feature flags
const currentState = window.featureManager.exportState();
localStorage.setItem('rollback_state', JSON.stringify(currentState));
console.log('Current state saved for future rollback');
```

2. **Пошаговое отключение новых функций:**
```javascript
// Отключаем экспериментальные фичи постепенно
const experiments = [
  'experiments.new_hero_design',
  'experiments.alternative_form',
  'experiments.video_testimonials'
];

experiments.forEach((experiment, index) => {
  setTimeout(() => {
    toggleFeature(experiment, false);
    console.log(`Disabled: ${experiment}`);
  }, index * 2000); // С интервалом в 2 секунды
});
```

3. **Валидация после каждого шага:**
```javascript
// Проверка метрик после отключения каждой фичи
function validateAfterRollback(featureName) {
  // Проверяем Core Web Vitals
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      console.log(`${entry.name}: ${entry.value}`);
    });
  }).observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});

  // Проверяем работу формы
  const form = document.getElementById('order-form');
  if (form) {
    console.log(`Form validation passed after ${featureName} rollback`);
  }
}
```

#### Rollback Plan для PHP Backend

**Откат серверной части:**

1. **Резервная копия send-form.php:**
```php
<?php
// backup/send-form-backup.php
// Сохраняем предыдущую версию с timestamp
$backupFile = 'send-form-' . date('Y-m-d-H-i-s') . '.php.backup';
copy('send-form.php', 'backup/' . $backupFile);
?>
```

2. **Версионирование конфигурации:**
```php
// config/versions.php
<?php
return [
    'current' => '1.2.0',
    'previous' => '1.1.0',
    'backup_path' => '/path/to/backups/',
    'features' => [
        'smartcaptcha' => true,
        'rate_limiting' => true,
        'enhanced_validation' => true
    ]
];
?>
```

3. **Автоматический откат PHP:**
```php
// rollback.php - скрипт для отката серверной части
<?php
function rollbackToVersion($targetVersion) {
    $backupFile = "backup/send-form-{$targetVersion}.php.backup";

    if (file_exists($backupFile)) {
        // Создаем резервную копию текущей версии
        copy('send-form.php', 'backup/send-form-current-rollback.php.backup');

        // Восстанавливаем целевую версию
        copy($backupFile, 'send-form.php');

        // Логируем откат
        error_log("Rollback completed: restored version {$targetVersion}");
        return true;
    }

    return false;
}

// Использование: rollbackToVersion('1.1.0');
?>
```

---

### 3. 💾 Backup стратегия для статических файлов

#### Автоматическое резервное копирование

**backup-script.js** — скрипт для создания резервных копий:
```javascript
// scripts/backup-script.js (Node.js скрипт для локальной разработки)
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BackupManager {
  constructor() {
    this.backupDir = './backups';
    this.sourceDir = './';
    this.maxBackups = 10; // Храним последние 10 версий

    this.ensureBackupDirectory();
  }

  // Создание полной резервной копии
  createFullBackup(label = '') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `backup-${timestamp}${label ? '-' + label : ''}`;
    const backupPath = path.join(this.backupDir, backupName);

    console.log(`Creating backup: ${backupName}`);

    try {
      // Копируем все файлы кроме node_modules и .git
      execSync(`xcopy "${this.sourceDir}" "${backupPath}" /E /I /H /K /X /Y /EXCLUDE:backup-exclude.txt`, {
        stdio: 'inherit'
      });

      // Создаем манифест резервной копии
      const manifest = {
        name: backupName,
        timestamp: new Date().toISOString(),
        label: label,
        files: this.getFileList(backupPath),
        features: this.getCurrentFeatureFlags(),
        version: this.getCurrentVersion()
      };

      fs.writeFileSync(
        path.join(backupPath, 'backup-manifest.json'),
        JSON.stringify(manifest, null, 2)
      );

      console.log(`✅ Backup created successfully: ${backupName}`);
      this.cleanOldBackups();

      return backupPath;
    } catch (error) {
      console.error(`❌ Backup failed: ${error.message}`);
      return null;
    }
  }

  // Быстрое резервное копирование критичных файлов
  createQuickBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `quick-backup-${timestamp}`;
    const backupPath = path.join(this.backupDir, backupName);

    fs.mkdirSync(backupPath, { recursive: true });

    // Критически важные файлы
    const criticalFiles = [
      'index.html',
      'css/main.css',
      'js/main.js',
      'js/features.js',
      'php/send-form.php',
      '.htaccess'
    ];

    criticalFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const targetDir = path.dirname(path.join(backupPath, file));
        fs.mkdirSync(targetDir, { recursive: true });
        fs.copyFileSync(file, path.join(backupPath, file));
      }
    });

    console.log(`✅ Quick backup created: ${backupName}`);
    return backupPath;
  }

  // Восстановление из резервной копии
  restoreFromBackup(backupName) {
    const backupPath = path.join(this.backupDir, backupName);

    if (!fs.existsSync(backupPath)) {
      console.error(`❌ Backup not found: ${backupName}`);
      return false;
    }

    // Читаем манифест резервной копии
    const manifestPath = path.join(backupPath, 'backup-manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      console.log(`Restoring backup: ${manifest.name} (${manifest.timestamp})`);
    }

    try {
      // Создаем резервную копию текущего состояния
      this.createQuickBackup();

      // Восстанавливаем файлы
      execSync(`xcopy "${backupPath}" "${this.sourceDir}" /E /H /K /X /Y`, {
        stdio: 'inherit'
      });

      console.log(`✅ Restore completed from: ${backupName}`);
      return true;
    } catch (error) {
      console.error(`❌ Restore failed: ${error.message}`);
      return false;
    }
  }

  // Список доступных резервных копий
  listBackups() {
    if (!fs.existsSync(this.backupDir)) {
      console.log('No backups found');
      return [];
    }

    const backups = fs.readdirSync(this.backupDir)
      .filter(name => fs.statSync(path.join(this.backupDir, name)).isDirectory())
      .map(name => {
        const backupPath = path.join(this.backupDir, name);
        const manifestPath = path.join(backupPath, 'backup-manifest.json');

        let manifest = { name, timestamp: 'unknown' };
        if (fs.existsSync(manifestPath)) {
          manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        }

        return manifest;
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    console.log('\n📋 Available backups:');
    backups.forEach((backup, index) => {
      console.log(`${index + 1}. ${backup.name} (${backup.timestamp})`);
    });

    return backups;
  }

  ensureBackupDirectory() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  getFileList(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach(item => {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files.push(...this.getFileList(fullPath));
      } else {
        files.push(path.relative(this.sourceDir, fullPath));
      }
    });

    return files;
  }

  getCurrentFeatureFlags() {
    try {
      const featuresPath = path.join(this.sourceDir, 'js/features.js');
      if (fs.existsSync(featuresPath)) {
        return fs.readFileSync(featuresPath, 'utf8');
      }
    } catch (error) {
      console.warn('Could not read feature flags');
    }
    return null;
  }

  getCurrentVersion() {
    try {
      const packagePath = path.join(this.sourceDir, 'package.json');
      if (fs.existsSync(packagePath)) {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        return pkg.version;
      }
    } catch (error) {
      // Если нет package.json, используем дату
      return new Date().toISOString().split('T')[0];
    }
    return 'unknown';
  }

  cleanOldBackups() {
    const backups = this.listBackups();

    if (backups.length > this.maxBackups) {
      const toDelete = backups.slice(this.maxBackups);

      toDelete.forEach(backup => {
        const backupPath = path.join(this.backupDir, backup.name);
        try {
          fs.rmSync(backupPath, { recursive: true, force: true });
          console.log(`🗑️ Removed old backup: ${backup.name}`);
        } catch (error) {
          console.warn(`Could not remove backup ${backup.name}: ${error.message}`);
        }
      });
    }
  }
}

// Использование
const backupManager = new BackupManager();

// Экспорт для использования в скриптах
module.exports = { BackupManager };

// CLI интерфейс
if (require.main === module) {
  const action = process.argv[2];
  const param = process.argv[3];

  switch (action) {
    case 'create':
      backupManager.createFullBackup(param);
      break;
    case 'quick':
      backupManager.createQuickBackup();
      break;
    case 'restore':
      backupManager.restoreFromBackup(param);
      break;
    case 'list':
      backupManager.listBackups();
      break;
    default:
      console.log('Usage: node backup-script.js [create|quick|restore|list] [parameter]');
  }
}
```

#### Исключения для резервного копирования

**backup-exclude.txt** — файлы для исключения из резервных копий:
```
node_modules\
.git\
.env
*.log
*.tmp
backups\
temp\
cache\
.DS_Store
Thumbs.db
```

---

### 4. 🚨 План действий при критических ошибках

#### Emergency Response Plan (ERP)

**1. Критическая ошибка обнаружена (0-2 минуты):**

```javascript
// Немедленные действия через консоль браузера
console.log('🚨 CRITICAL ERROR DETECTED - Executing emergency protocol');

// Активируем режим обслуживания
toggleFeature('emergency.maintenance_mode', true);

// Отключаем проблемные компоненты
toggleFeature('experiments.new_hero_design', false);
toggleFeature('experiments.alternative_form', false);

// Включаем fallback формы
toggleFeature('emergency.fallback_form', true);

console.log('✅ Emergency mode activated');
```

**2. Диагностика проблемы (2-5 минут):**

```javascript
// emergency-diagnostics.js
class EmergencyDiagnostics {
  constructor() {
    this.errors = [];
    this.startDiagnostics();
  }

  startDiagnostics() {
    console.log('🔍 Starting emergency diagnostics...');

    // Проверяем основные системы
    this.checkCriticalSystems();
    this.checkNetworkConnectivity();
    this.checkFormFunctionality();
    this.checkJavaScriptErrors();
    this.generateDiagnosticReport();
  }

  checkCriticalSystems() {
    const critical = [
      { name: 'DOM Ready', test: () => document.readyState === 'complete' },
      { name: 'Feature Manager', test: () => typeof window.featureManager !== 'undefined' },
      { name: 'Order Form', test: () => document.getElementById('order-form') !== null },
      { name: 'SmartCaptcha', test: () => typeof window.smartCaptcha !== 'undefined' }
    ];

    critical.forEach(system => {
      try {
        const status = system.test();
        console.log(`${status ? '✅' : '❌'} ${system.name}: ${status}`);
        if (!status) this.errors.push(`${system.name} failed`);
      } catch (error) {
        console.error(`❌ ${system.name}: ${error.message}`);
        this.errors.push(`${system.name}: ${error.message}`);
      }
    });
  }

  checkNetworkConnectivity() {
    // Проверяем доступность критичных ресурсов
    const resources = [
      '/php/send-form.php',
      '/js/main.js',
      '/css/main.css'
    ];

    resources.forEach(resource => {
      fetch(resource, { method: 'HEAD' })
        .then(response => {
          const status = response.ok ? '✅' : '❌';
          console.log(`${status} Resource ${resource}: ${response.status}`);
          if (!response.ok) this.errors.push(`Resource ${resource} unavailable`);
        })
        .catch(error => {
          console.error(`❌ Resource ${resource}: ${error.message}`);
          this.errors.push(`Resource ${resource}: ${error.message}`);
        });
    });
  }

  checkFormFunctionality() {
    const form = document.getElementById('order-form');
    if (form) {
      // Проверяем все обязательные поля
      const requiredFields = form.querySelectorAll('[required]');
      const missingFields = [];

      requiredFields.forEach(field => {
        if (!field.name) {
          missingFields.push(field.id || field.className);
        }
      });

      if (missingFields.length > 0) {
        console.error('❌ Form missing required fields:', missingFields);
        this.errors.push(`Form missing fields: ${missingFields.join(', ')}`);
      } else {
        console.log('✅ Form validation passed');
      }
    }
  }

  checkJavaScriptErrors() {
    // Устанавливаем глобальный обработчик ошибок на время диагностики
    window.addEventListener('error', (event) => {
      const error = {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno
      };

      console.error('❌ JavaScript Error:', error);
      this.errors.push(`JS Error: ${error.message} at ${error.source}:${error.line}`);
    });
  }

  generateDiagnosticReport() {
    setTimeout(() => {
      const report = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        errors: this.errors,
        featureFlags: window.FeatureFlags,
        performance: this.getPerformanceMetrics()
      };

      console.log('📋 DIAGNOSTIC REPORT:', report);

      // Сохраняем отчет локально
      localStorage.setItem('emergency-diagnostic-report', JSON.stringify(report));

      // Отправляем отчет на сервер (если возможно)
      this.sendDiagnosticReport(report);

      return report;
    }, 3000);
  }

  getPerformanceMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      loadTime: navigation?.loadEventEnd - navigation?.fetchStart,
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.fetchStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime
    };
  }

  sendDiagnosticReport(report) {
    fetch('/php/emergency-report.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    }).catch(error => {
      console.log('Could not send diagnostic report to server:', error.message);
    });
  }
}

// Инициализация диагностики при критических ошибках
window.runEmergencyDiagnostics = () => {
  return new EmergencyDiagnostics();
};
```

**3. Быстрые исправления (5-10 минут):**

```javascript
// emergency-fixes.js
class EmergencyFixes {
  constructor() {
    this.fixes = [
      { name: 'Reload SmartCaptcha', fix: () => this.reloadSmartCaptcha() },
      { name: 'Reset Form State', fix: () => this.resetFormState() },
      { name: 'Clear Local Storage', fix: () => this.clearLocalStorage() },
      { name: 'Restart Analytics', fix: () => this.restartAnalytics() },
      { name: 'Force CSS Reload', fix: () => this.reloadCSS() }
    ];
  }

  applyAllFixes() {
    console.log('🔧 Applying emergency fixes...');

    this.fixes.forEach(fix => {
      try {
        fix.fix();
        console.log(`✅ ${fix.name} - Applied successfully`);
      } catch (error) {
        console.error(`❌ ${fix.name} - Failed:`, error.message);
      }
    });
  }

  reloadSmartCaptcha() {
    if (window.smartCaptcha) {
      const container = document.getElementById('captcha-container');
      if (container) {
        container.innerHTML = '';
        window.smartCaptcha.render('captcha-container', {
          sitekey: window.FeatureFlags.smartcaptcha?.sitekey
        });
      }
    }
  }

  resetFormState() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.reset();
      // Удаляем классы валидации
      form.querySelectorAll('.error, .invalid').forEach(el => {
        el.classList.remove('error', 'invalid');
      });
    });
  }

  clearLocalStorage() {
    // Сохраняем критические данные
    const criticalData = {
      featureFlags: localStorage.getItem('featureFlags'),
      diagnosticReport: localStorage.getItem('emergency-diagnostic-report')
    };

    localStorage.clear();

    // Восстанавливаем критические данные
    Object.entries(criticalData).forEach(([key, value]) => {
      if (value) localStorage.setItem(key, value);
    });
  }

  restartAnalytics() {
    // Перезапускаем аналитику
    if (window.gtag) {
      gtag('config', 'GA_MEASUREMENT_ID');
    }

    if (window.ym) {
      ym(window.yaCounterId, 'init');
    }
  }

  reloadCSS() {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      const href = link.href;
      link.href = href + (href.includes('?') ? '&' : '?') + 'v=' + Date.now();
    });
  }
}

// Глобальный доступ к экстренным исправлениям
window.applyEmergencyFixes = () => {
  const fixes = new EmergencyFixes();
  fixes.applyAllFixes();
};
```

**4. Эскалация (10+ минут):**

Если проблема не решена быстрыми методами:

```bash
# Полный откат к последней рабочей версии
node backup-script.js restore latest-stable

# Активация полностью статической версии
cp emergency-static/index.html ./index.html
cp emergency-static/css/* ./css/
```

---

### 5. 📊 Мониторинг и алерты для быстрого обнаружения проблем

#### Real-time мониторинг производительности

**performance-monitor.js** — система мониторинга:
```javascript
// js/modules/performance-monitor.js
class PerformanceMonitor {
  constructor() {
    this.metrics = [];
    this.thresholds = {
      lcp: 2500,        // Large Contentful Paint
      fid: 100,         // First Input Delay
      cls: 0.1,         // Cumulative Layout Shift
      ttfb: 800,        // Time To First Byte
      jsErrors: 5       // Max JS errors per session
    };

    this.alertEndpoint = '/php/performance-alert.php';
    this.init();
  }

  init() {
    this.trackCoreWebVitals();
    this.trackJavaScriptErrors();
    this.trackFormSubmissions();
    this.trackUserInteractions();

    // Отправляем отчет каждые 30 секунд
    setInterval(() => this.sendMetrics(), 30000);

    // Отправляем финальный отчет при выходе
    window.addEventListener('beforeunload', () => this.sendFinalReport());
  }

  trackCoreWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const metric = {
          name: 'lcp',
          value: entry.startTime,
          timestamp: Date.now(),
          url: window.location.href
        };

        this.recordMetric(metric);

        if (entry.startTime > this.thresholds.lcp) {
          this.sendAlert('LCP threshold exceeded', metric);
        }
      });
    }).observe({entryTypes: ['largest-contentful-paint']});

    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const metric = {
          name: 'fid',
          value: entry.processingStart - entry.startTime,
          timestamp: Date.now(),
          url: window.location.href
        };

        this.recordMetric(metric);

        if (metric.value > this.thresholds.fid) {
          this.sendAlert('FID threshold exceeded', metric);
        }
      });
    }).observe({entryTypes: ['first-input']});

    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();

      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });

      const metric = {
        name: 'cls',
        value: clsValue,
        timestamp: Date.now(),
        url: window.location.href
      };

      this.recordMetric(metric);

      if (clsValue > this.thresholds.cls) {
        this.sendAlert('CLS threshold exceeded', metric);
      }
    }).observe({entryTypes: ['layout-shift']});
  }

  trackJavaScriptErrors() {
    let errorCount = 0;

    window.addEventListener('error', (event) => {
      errorCount++;

      const errorMetric = {
        name: 'js_error',
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      this.recordMetric(errorMetric);

      if (errorCount > this.thresholds.jsErrors) {
        this.sendAlert('Too many JavaScript errors', {
          count: errorCount,
          latestError: errorMetric
        });
      }
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const errorMetric = {
        name: 'unhandled_promise_rejection',
        reason: event.reason?.toString(),
        timestamp: Date.now(),
        url: window.location.href
      };

      this.recordMetric(errorMetric);
      this.sendAlert('Unhandled promise rejection', errorMetric);
    });
  }

  trackFormSubmissions() {
    document.addEventListener('submit', (event) => {
      const form = event.target;
      const startTime = Date.now();

      const formMetric = {
        name: 'form_submission_start',
        formId: form.id,
        timestamp: startTime,
        url: window.location.href
      };

      this.recordMetric(formMetric);

      // Отслеживаем время обработки
      const trackResponse = () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        const responseMetric = {
          name: 'form_submission_time',
          formId: form.id,
          responseTime: responseTime,
          timestamp: endTime,
          url: window.location.href
        };

        this.recordMetric(responseMetric);

        if (responseTime > 5000) { // Более 5 секунд
          this.sendAlert('Slow form submission', responseMetric);
        }
      };

      // Используем MutationObserver для отслеживания изменений после отправки
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            trackResponse();
            observer.disconnect();
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
      });

      // Fallback timeout
      setTimeout(() => {
        trackResponse();
        observer.disconnect();
      }, 10000);
    });
  }

  trackUserInteractions() {
    // Отслеживание кликов по важным элементам
    const importantElements = [
      '[data-track="order-button"]',
      '[data-track="phone-link"]',
      '[data-track="email-link"]',
      '.product-card',
      '#order-form button[type="submit"]'
    ];

    importantElements.forEach(selector => {
      document.addEventListener('click', (event) => {
        if (event.target.matches(selector) || event.target.closest(selector)) {
          const interactionMetric = {
            name: 'user_interaction',
            element: selector,
            timestamp: Date.now(),
            url: window.location.href
          };

          this.recordMetric(interactionMetric);
        }
      });
    });
  }

  recordMetric(metric) {
    this.metrics.push(metric);

    // Храним только последние 100 метрик в памяти
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Сохраняем критические метрики в localStorage
    if (this.isCriticalMetric(metric)) {
      const stored = JSON.parse(localStorage.getItem('critical-metrics') || '[]');
      stored.push(metric);
      localStorage.setItem('critical-metrics', JSON.stringify(stored.slice(-20)));
    }
  }

  isCriticalMetric(metric) {
    const criticalTypes = ['js_error', 'unhandled_promise_rejection', 'form_submission_time'];
    return criticalTypes.includes(metric.name) || metric.value > (this.thresholds[metric.name] || Infinity);
  }

  sendAlert(alertType, data) {
    const alert = {
      type: alertType,
      severity: this.getAlertSeverity(alertType, data),
      data: data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      sessionMetrics: this.getSessionSummary()
    };

    console.warn(`🚨 PERFORMANCE ALERT: ${alertType}`, alert);

    // Отправляем алерт на сервер
    fetch(this.alertEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert)
    }).catch(error => {
      console.error('Failed to send performance alert:', error);
    });

    // Сохраняем алерт локально
    const storedAlerts = JSON.parse(localStorage.getItem('performance-alerts') || '[]');
    storedAlerts.push(alert);
    localStorage.setItem('performance-alerts', JSON.stringify(storedAlerts.slice(-10)));
  }

  getAlertSeverity(alertType, data) {
    const severityMap = {
      'LCP threshold exceeded': data.value > 4000 ? 'critical' : 'warning',
      'FID threshold exceeded': data.value > 300 ? 'critical' : 'warning',
      'CLS threshold exceeded': data.value > 0.25 ? 'critical' : 'warning',
      'Too many JavaScript errors': data.count > 10 ? 'critical' : 'warning',
      'Slow form submission': data.responseTime > 10000 ? 'critical' : 'warning'
    };

    return severityMap[alertType] || 'info';
  }

  getSessionSummary() {
    const summary = {
      totalMetrics: this.metrics.length,
      errors: this.metrics.filter(m => m.name.includes('error')).length,
      interactions: this.metrics.filter(m => m.name === 'user_interaction').length,
      sessionDuration: Date.now() - (this.sessionStart || Date.now())
    };

    // Средние значения Core Web Vitals
    ['lcp', 'fid', 'cls'].forEach(metric => {
      const values = this.metrics.filter(m => m.name === metric).map(m => m.value);
      if (values.length > 0) {
        summary[`avg_${metric}`] = values.reduce((a, b) => a + b, 0) / values.length;
      }
    });

    return summary;
  }

  sendMetrics() {
    if (this.metrics.length === 0) return;

    const batch = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      metrics: [...this.metrics],
      summary: this.getSessionSummary()
    };

    fetch('/php/metrics-collector.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch)
    }).catch(error => {
      console.warn('Failed to send metrics batch:', error);
    });

    // Очищаем отправленные метрики
    this.metrics = [];
  }

  sendFinalReport() {
    const finalReport = {
      type: 'session_end',
      timestamp: new Date().toISOString(),
      url: window.location.href,
      summary: this.getSessionSummary(),
      criticalMetrics: JSON.parse(localStorage.getItem('critical-metrics') || '[]'),
      alerts: JSON.parse(localStorage.getItem('performance-alerts') || '[]')
    };

    navigator.sendBeacon('/php/final-report.php', JSON.stringify(finalReport));
  }
}

// Инициализация мониторинга
const performanceMonitor = new PerformanceMonitor();
window.performanceMonitor = performanceMonitor;
```

#### Email алерты для критических проблем

**PHP backend для обработки алертов:**

```php
<?php
// php/performance-alert.php
class PerformanceAlertHandler {
    private $alertEmail = 'admin@retroznak.ru';
    private $logFile = '../logs/performance-alerts.log';

    public function handleAlert() {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input || !isset($input['type'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid alert data']);
            return;
        }

        // Логируем алерт
        $this->logAlert($input);

        // Проверяем критичность
        if ($input['severity'] === 'critical') {
            $this->sendImmediateAlert($input);
        }

        // Проверяем частоту алертов
        if ($this->isAlertStorm()) {
            $this->sendAlertStormNotification();
        }

        echo json_encode(['status' => 'received']);
    }

    private function logAlert($alert) {
        $logEntry = [
            'timestamp' => date('Y-m-d H:i:s'),
            'alert' => $alert,
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
        ];

        file_put_contents($this->logFile, json_encode($logEntry) . PHP_EOL, FILE_APPEND | LOCK_EX);
    }

    private function sendImmediateAlert($alert) {
        $subject = '🚨 Критический алерт производительности - Ретрознак';

        $message = "КРИТИЧЕСКИЙ АЛЕРТ ПРОИЗВОДИТЕЛЬНОСТИ\n\n";
        $message .= "Тип: {$alert['type']}\n";
        $message .= "Время: {$alert['timestamp']}\n";
        $message .= "URL: {$alert['url']}\n";
        $message .= "Серьезность: {$alert['severity']}\n\n";

        if (isset($alert['data'])) {
            $message .= "Данные:\n";
            $message .= json_encode($alert['data'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n\n";
        }

        if (isset($alert['sessionMetrics'])) {
            $message .= "Метрики сессии:\n";
            $message .= "Ошибки: {$alert['sessionMetrics']['errors']}\n";
            $message .= "Взаимодействия: {$alert['sessionMetrics']['interactions']}\n";
            $message .= "Длительность: " . ($alert['sessionMetrics']['sessionDuration']/1000) . " сек\n\n";
        }

        $message .= "Рекомендуемые действия:\n";
        $message .= $this->getRecommendedActions($alert['type']);

        $headers = "From: noreply@retroznak.ru\r\n";
        $headers .= "Reply-To: noreply@retroznak.ru\r\n";
        $headers .= "X-Priority: 1\r\n"; // Высокий приоритет

        mail($this->alertEmail, $subject, $message, $headers);
    }

    private function getRecommendedActions($alertType) {
        $actions = [
            'LCP threshold exceeded' => "1. Проверить оптимизацию изображений\n2. Проверить CDN\n3. Активировать emergency режим если необходимо",
            'Too many JavaScript errors' => "1. Проверить консоль браузера\n2. Откатить последние изменения JS\n3. Активировать режим без JavaScript",
            'Slow form submission' => "1. Проверить PHP скрипт send-form.php\n2. Проверить подключение к SmartCaptcha\n3. Активировать fallback форму"
        ];

        return $actions[$alertType] ?? "1. Проверить логи\n2. Рассмотреть откат изменений\n3. Связаться с разработчиком";
    }

    private function isAlertStorm() {
        $recentAlerts = $this->getRecentAlerts(600); // За последние 10 минут
        return count($recentAlerts) > 10;
    }

    private function getRecentAlerts($seconds) {
        if (!file_exists($this->logFile)) return [];

        $lines = file($this->logFile, FILE_IGNORE_NEW_LINES);
        $cutoff = time() - $seconds;
        $recentAlerts = [];

        foreach (array_reverse($lines) as $line) {
            $alert = json_decode($line, true);
            if ($alert && strtotime($alert['timestamp']) > $cutoff) {
                $recentAlerts[] = $alert;
            }
        }

        return $recentAlerts;
    }

    private function sendAlertStormNotification() {
        $subject = '⚠️ Alert Storm Detected - Ретрознак';
        $message = "Обнаружен шторм алертов! Более 10 алертов за последние 10 минут.\n\n";
        $message .= "Рекомендуется:\n";
        $message .= "1. Немедленно активировать maintenance режим\n";
        $message .= "2. Проверить состояние сервера\n";
        $message .= "3. Рассмотреть полный откат изменений\n\n";
        $message .= "URL для активации emergency режима:\n";
        $message .= "https://retroznak.ru/?feature_emergency.maintenance_mode=true";

        mail($this->alertEmail, $subject, $message);
    }
}

$handler = new PerformanceAlertHandler();
$handler->handleAlert();
?>
```

---

### 6. 🔄 Быстрое переключение между версиями лендинга

#### Version Switcher System

**version-switcher.js** — система переключения версий:
```javascript
// js/modules/version-switcher.js
class VersionSwitcher {
  constructor() {
    this.versions = {
      'stable': {
        name: 'Stable Version',
        files: {
          html: 'versions/stable/index.html',
          css: 'versions/stable/css/main.css',
          js: 'versions/stable/js/main.js'
        },
        features: {
          'components.hero_section': true,
          'components.product_matrix': true,
          'components.testimonials': true,
          'components.order_form': true,
          'components.smart_captcha': true
        }
      },
      'beta': {
        name: 'Beta Version',
        files: {
          html: 'versions/beta/index.html',
          css: 'versions/beta/css/main.css',
          js: 'versions/beta/js/main.js'
        },
        features: {
          'components.hero_section': true,
          'components.product_matrix': true,
          'components.testimonials': true,
          'components.order_form': true,
          'components.smart_captcha': true,
          'experiments.new_hero_design': true,
          'experiments.alternative_form': true
        }
      },
      'emergency': {
        name: 'Emergency Static',
        files: {
          html: 'versions/emergency/index.html',
          css: 'versions/emergency/css/emergency.css',
          js: null // Без JavaScript
        },
        features: {
          'components.hero_section': true,
          'components.product_matrix': true,
          'components.order_form': true,
          'emergency.fallback_form': true,
          'emergency.disable_all_js': true
        }
      }
    };

    this.currentVersion = 'stable';
    this.init();
  }

  init() {
    // Проверяем URL параметры для переключения версий
    this.checkURLVersion();

    // Создаем панель управления для разработчиков
    if (this.isDevelopmentMode()) {
      this.createVersionPanel();
    }

    // Автоматическое переключение при критических ошибках
    this.setupEmergencySwitch();
  }

  checkURLVersion() {
    const urlParams = new URLSearchParams(window.location.search);
    const versionParam = urlParams.get('version');

    if (versionParam && this.versions[versionParam]) {
      this.switchToVersion(versionParam);
    }
  }

  switchToVersion(versionName) {
    if (!this.versions[versionName]) {
      console.error(`Version ${versionName} not found`);
      return false;
    }

    const version = this.versions[versionName];
    console.log(`Switching to version: ${version.name}`);

    try {
      // Обновляем feature flags
      this.updateFeatureFlags(version.features);

      // Загружаем новые ресурсы
      this.loadVersionResources(version);

      // Сохраняем текущую версию
      this.currentVersion = versionName;
      localStorage.setItem('current-version', versionName);

      console.log(`✅ Successfully switched to ${version.name}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to switch to ${version.name}:`, error);

      // Откатываемся к стабильной версии
      if (versionName !== 'stable') {
        this.switchToVersion('stable');
      }
      return false;
    }
  }

  updateFeatureFlags(features) {
    // Сбрасываем все флаги
    Object.keys(window.FeatureFlags).forEach(category => {
      Object.keys(window.FeatureFlags[category]).forEach(flag => {
        window.FeatureFlags[category][flag] = false;
      });
    });

    // Устанавливаем новые флаги
    Object.entries(features).forEach(([flagPath, value]) => {
      const path = flagPath.split('.');
      let current = window.FeatureFlags;

      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }

      current[path[path.length - 1]] = value;
    });

    // Применяем изменения
    if (window.featureManager) {
      window.featureManager.applyFeatureFlags();
    }
  }

  loadVersionResources(version) {
    const promises = [];

    // Загружаем CSS
    if (version.files.css) {
      promises.push(this.loadCSS(version.files.css));
    }

    // Загружаем JavaScript
    if (version.files.js) {
      promises.push(this.loadJS(version.files.js));
    }

    return Promise.all(promises);
  }

  loadCSS(url) {
    return new Promise((resolve, reject) => {
      // Удаляем старые CSS файлы версий
      document.querySelectorAll('link[data-version-css]').forEach(link => {
        link.remove();
      });

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url + '?v=' + Date.now();
      link.setAttribute('data-version-css', 'true');

      link.onload = resolve;
      link.onerror = reject;

      document.head.appendChild(link);
    });
  }

  loadJS(url) {
    return new Promise((resolve, reject) => {
      // Удаляем старые JS файлы версий
      document.querySelectorAll('script[data-version-js]').forEach(script => {
        script.remove();
      });

      const script = document.createElement('script');
      script.src = url + '?v=' + Date.now();
      script.setAttribute('data-version-js', 'true');

      script.onload = resolve;
      script.onerror = reject;

      document.head.appendChild(script);
    });
  }

  setupEmergencySwitch() {
    let errorCount = 0;

    window.addEventListener('error', () => {
      errorCount++;

      if (errorCount >= 5 && this.currentVersion !== 'emergency') {
        console.warn('🚨 Too many errors detected, switching to emergency version');
        this.switchToVersion('emergency');
      }
    });

    // Проверка производительности
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation?.loadEventEnd - navigation?.fetchStart;

      if (loadTime > 10000 && this.currentVersion !== 'emergency') { // Более 10 секунд
        console.warn('🚨 Poor performance detected, switching to emergency version');
        this.switchToVersion('emergency');
      }
    }, 15000);
  }

  createVersionPanel() {
    const panel = document.createElement('div');
    panel.id = 'version-switcher-panel';
    panel.innerHTML = `
      <div style="
        position: fixed; top: 10px; right: 10px;
        background: rgba(0,0,0,0.8); color: white;
        padding: 10px; border-radius: 5px;
        z-index: 99999; font-family: monospace;
        font-size: 12px;
      ">
        <div>Current: <span id="current-version">${this.currentVersion}</span></div>
        <div style="margin-top: 5px;">
          ${Object.entries(this.versions).map(([key, version]) =>
            `<button onclick="versionSwitcher.switchToVersion('${key}')"
             style="margin-right: 5px; padding: 2px 6px; font-size: 10px;">
             ${version.name}
            </button>`
          ).join('')}
        </div>
        <div style="margin-top: 5px;">
          <button onclick="document.getElementById('version-switcher-panel').style.display='none'"
           style="padding: 2px 6px; font-size: 10px;">
           Hide
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(panel);
  }

  isDevelopmentMode() {
    return window.location.hostname === 'localhost' ||
           window.location.search.includes('dev=true') ||
           localStorage.getItem('dev-mode') === 'true';
  }

  // API для внешнего управления
  getVersions() {
    return Object.keys(this.versions);
  }

  getCurrentVersion() {
    return this.currentVersion;
  }

  // Экспорт состояния для резервного копирования
  exportVersionState() {
    return {
      currentVersion: this.currentVersion,
      featureFlags: window.FeatureFlags,
      timestamp: new Date().toISOString()
    };
  }
}

// Инициализация системы переключения версий
window.versionSwitcher = new VersionSwitcher();

// Консольные команды для управления
window.switchVersion = (version) => window.versionSwitcher.switchToVersion(version);
window.getVersions = () => window.versionSwitcher.getVersions();
window.getCurrentVersion = () => window.versionSwitcher.getCurrentVersion();
```

#### Структура папок для версий

```
лендинг-ретрознак/
├── versions/
│   ├── stable/                 # Стабильная версия
│   │   ├── index.html
│   │   ├── css/main.css
│   │   └── js/main.js
│   ├── beta/                   # Бета версия с новыми фичами
│   │   ├── index.html
│   │   ├── css/main.css
│   │   └── js/main.js
│   └── emergency/              # Экстренная статическая версия
│       ├── index.html          # Минимальная разметка
│       └── css/emergency.css   # Базовые стили без зависимостей
├── js/
│   └── modules/
│       ├── version-switcher.js
│       ├── feature-manager.js
│       └── performance-monitor.js
└── current -> versions/stable/  # Символическая ссылка на текущую версию
```

#### Быстрое переключение через URL

```
# Переключение на бета версию
https://retroznak.ru/?version=beta

# Переключение на экстренную версию
https://retroznak.ru/?version=emergency

# Переключение с активацией конкретных фич
https://retroznak.ru/?version=beta&feature_experiments.new_hero_design=true

# Экстренная активация maintenance режима
https://retroznak.ru/?feature_emergency.maintenance_mode=true
```

---
