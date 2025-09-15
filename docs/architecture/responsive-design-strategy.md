# 📱 Responsive Design Strategy

### Mobile-First Breakpoints
```css
/* Базовые стили для мобильных (до 640px) */
.container {
  padding: 1rem;
  max-width: 100%;
}

/* Small tablets и большие телефоны (640px+) */
@media (min-width: 640px) {
  .container {
    padding: 1.5rem;
    max-width: 640px;
    margin: 0 auto;
  }
}

/* Tablets (768px+) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 768px;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }

  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
}

/* Large desktop (1280px+) */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
```

### Touch-Friendly Design
- Минимальный размер кнопок: 44px × 44px
- Отступы между интерактивными элементами: минимум 8px
- Поддержка swipe-жестов для галерей
- Оптимизированные формы для мобильных клавиатур

---
