# 🎨 Компонентная архитектура CSS

### CSS Architecture Pattern: BEMCSS + Tailwind Hybrid

**main.css** — базовые стили и переменные:
```css
/* CSS Custom Properties для брендинга */
:root {
  --retro-gold: #D4AF37;
  --retro-blue: #1E3A8A;
  --retro-green: #065F46;
  --retro-dark: #1F2937;
  --retro-light: #F9FAFB;

  /* Типография */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Georgia', 'Times New Roman', serif;

  /* Отступы и размеры */
  --section-padding: clamp(3rem, 8vw, 6rem);
  --container-max: 1280px;

  /* Анимации */
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Reset и базовые стили */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-primary);
  line-height: 1.6;
  color: var(--retro-dark);
  margin: 0;
}

/* Улучшение фокуса для accessibility */
*:focus-visible {
  outline: 2px solid var(--retro-blue);
  outline-offset: 2px;
}
```

**components.css** — компонентные стили:
```css
/* Hero Section Component */
.hero-section {
  background: linear-gradient(135deg, var(--retro-blue) 0%, var(--retro-green) 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/assets/images/ui/patterns/retro-pattern.svg');
  opacity: 0.1;
  pointer-events: none;
}

/* Product Card Component */
.product-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  transition: var(--transition-smooth);
  border: 2px solid transparent;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
}

.product-card--featured {
  border-color: var(--retro-gold);
  position: relative;
  transform: scale(1.05);
}

.product-card--featured::before {
  content: 'Хит продаж';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--retro-gold);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Form Component */
.form-container {
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(209, 213, 219, 0.3);
}

.form-field {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: var(--transition-smooth);
  background: #F9FAFB;
}

.form-input:focus {
  border-color: var(--retro-blue);
  background: white;
  outline: none;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

.form-input:invalid {
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Button Components */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: var(--transition-smooth);
  cursor: pointer;
  border: none;
  min-width: 44px; /* Touch target size */
  min-height: 44px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--retro-gold) 0%, #B8860B 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(212, 175, 55, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px 0 rgba(212, 175, 55, 0.6);
}

.btn-secondary {
  background: white;
  color: var(--retro-blue);
  border: 2px solid var(--retro-blue);
}

.btn-secondary:hover {
  background: var(--retro-blue);
  color: white;
}

/* FAQ Accordion Component */
.faq-item {
  border-bottom: 1px solid #E5E7EB;
}

.faq-question {
  width: 100%;
  padding: 1.5rem 0;
  background: none;
  border: none;
  text-align: left;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--retro-dark);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-answer {
  padding: 0 0 1.5rem 0;
  color: #6B7280;
  line-height: 1.7;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, padding 0.3s ease-out;
}

.faq-item.open .faq-answer {
  max-height: 200px; /* Достаточно для большинства ответов */
  padding: 0 0 1.5rem 0;
}

/* Loading states */
.loading {
  opacity: 0.6;
  pointer-events: none;
  position: relative;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid var(--retro-gold);
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1rem;
  }

  .form-container {
    padding: 1.5rem;
    border-radius: 1rem;
  }

  .product-card--featured {
    transform: none; /* Убираем scale на мобильных */
  }
}
```

### Tailwind CSS интеграция

**CDN подключение с кастомной конфигурацией:**
```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'retro': {
            'gold': '#D4AF37',
            'blue': '#1E3A8A',
            'green': '#065F46',
            'dark': '#1F2937',
            'light': '#F9FAFB'
          }
        },
        fontFamily: {
          'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
          'serif': ['Georgia', 'Times New Roman', 'serif']
        },
        animation: {
          'fade-in': 'fadeIn 0.6s ease-out',
          'slide-up': 'slideUp 0.8s ease-out',
          'bounce-soft': 'bounceSoft 0.6s ease-out'
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' }
          },
          slideUp: {
            '0%': { transform: 'translateY(100px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          },
          bounceSoft: {
            '0%': { transform: 'scale(0.95)' },
            '50%': { transform: 'scale(1.02)' },
            '100%': { transform: 'scale(1)' }
          }
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
          '128': '32rem'
        }
      }
    },
    plugins: []
  }
</script>
```

---
