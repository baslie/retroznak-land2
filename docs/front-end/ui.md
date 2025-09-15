# 🎨 UI компонентная система

### Цветовая палитра

**Основные цвета:**
- `#1a365d` - Темно-синий (заголовки, навигация)
- `#f7fafc` - Светло-серый (фон страницы)
- `#ffffff` - Белый (карточки, формы)
- `#fbb040` - Золотистый (акценты, кнопки)
- `#e53e3e` - Красный (ошибки, внимание)
- `#38a169` - Зеленый (успех, подтверждения)

**Дополнительные цвета:**
- `#2d3748` - Темно-серый (основной текст)
- `#718096` - Серый (второстепенный текст)
- `#e2e8f0` - Границы и разделители

### Типографика

**Заголовки:**
```css
H1: font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(28px, 5vw, 48px);
    line-height: 1.2;
    color: #1a365d;

H2: font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: clamp(24px, 4vw, 36px);
    line-height: 1.3;
    color: #1a365d;

H3: font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: clamp(20px, 3vw, 28px);
    line-height: 1.4;
    color: #2d3748;
```

**Основной текст:**
```css
body: font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.6;
      color: #2d3748;

.lead: font-size: 18px;
       line-height: 1.7;
       color: #4a5568;
```

### Компоненты кнопок

**Основная CTA кнопка:**
```css
.btn-primary {
  background: linear-gradient(135deg, #fbb040 0%, #f6ad55 100%);
  color: #1a365d;
  font-weight: 600;
  font-size: 18px;
  padding: 16px 32px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 12px rgba(251, 176, 64, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(251, 176, 64, 0.4);
  background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 3px 10px rgba(251, 176, 64, 0.3);
}
```

**Вторичная кнопка:**
```css
.btn-secondary {
  background: transparent;
  color: #1a365d;
  font-weight: 500;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 6px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: #fbb040;
  color: #fbb040;
  background: rgba(251, 176, 64, 0.05);
}
```

### Карточки товаров

**Структура карточки:**
```css
.product-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: #fbb040;
}

.product-card--popular {
  border: 2px solid #fbb040;
  position: relative;
}

.product-card--popular::before {
  content: "⭐ Популярный выбор";
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #fbb040, #f6ad55);
  color: #1a365d;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 0 12px 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-card--premium {
  border: 2px solid #9f7aea;
  background: linear-gradient(135deg, #ffffff 0%, #f7fafc 100%);
}

.product-card--premium::before {
  content: "👑 Максимальное качество";
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #9f7aea, #805ad5);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 0 12px 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### Формы и поля ввода

**Поля ввода:**
```css
.form-input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  background: #ffffff;
  color: #2d3748;
}

.form-input:focus {
  border-color: #fbb040;
  box-shadow: 0 0 0 3px rgba(251, 176, 64, 0.1);
  outline: none;
}

.form-input:invalid {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.form-input::placeholder {
  color: #a0aec0;
}
```

**Лейблы:**
```css
.form-label {
  display: block;
  font-weight: 500;
  font-size: 14px;
  color: #2d3748;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-label--required::after {
  content: " *";
  color: #e53e3e;
  font-weight: bold;
}
```

---
