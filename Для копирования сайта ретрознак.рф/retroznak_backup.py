#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
ПОЛНЫЙ ПАРСЕР - извлекает ВСЁ содержимое страницы
Без умничания и фильтрации
"""

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import markdownify
from bs4 import BeautifulSoup
from datetime import datetime
import os
import time
import re


class FullContentParser:
    def __init__(self, headless=True):
        self.output_dir = 'markdown_output'
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)
        
        # Настройки Chrome
        self.chrome_options = Options()
        if headless:
            self.chrome_options.add_argument('--headless=new')
        
        self.chrome_options.add_argument('--no-sandbox')
        self.chrome_options.add_argument('--disable-dev-shm-usage')
        self.chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        self.chrome_options.add_argument('--window-size=1920,1080')
        self.chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
        
        # ВАЖНО: загружаем ВСЁ, включая изображения
        self.chrome_options.add_experimental_option("prefs", {
            "profile.default_content_setting_values.notifications": 2
        })
        
        self.driver = None
    
    def start_driver(self):
        """Запуск браузера"""
        print("🚀 Запуск браузера...")
        try:
            service = Service(ChromeDriverManager().install())
            self.driver = webdriver.Chrome(service=service, options=self.chrome_options)
            self.driver.implicitly_wait(10)  # Ждем элементы до 10 секунд
            print("✅ Браузер запущен")
            return True
        except Exception as e:
            print(f"❌ Ошибка: {e}")
            return False
    
    def stop_driver(self):
        """Закрытие браузера"""
        if self.driver:
            self.driver.quit()
            print("🛑 Браузер закрыт")
    
    def parse_full_content(self, url):
        """ГЛАВНАЯ ФУНКЦИЯ - парсит ВСЁ"""
        if not self.driver:
            if not self.start_driver():
                return None
        
        print(f"\n📡 Загрузка: {url}")
        
        try:
            # Загружаем страницу
            self.driver.get(url)
            print("⏳ Ожидание полной загрузки...")
            
            # Ждем body
            WebDriverWait(self.driver, 15).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            # ВАЖНО: даем время на загрузку динамического контента
            time.sleep(5)
            
            # Прокручиваем страницу ПОЛНОСТЬЮ
            print("📜 Полная прокрутка страницы...")
            self.full_page_scroll()
            
            # Раскрываем ВСЕ скрытые элементы
            print("🔓 Раскрытие всего скрытого контента...")
            self.expand_everything()
            
            # Еще раз ждем
            time.sleep(3)
            
            # Получаем заголовок
            title = self.driver.title or "Ретрознак"
            current_url = self.driver.current_url
            
            # БЕРЕМ ВСЁ!
            print("📥 Извлечение ВСЕГО контента...")
            full_html = self.driver.page_source
            
            # Также собираем текст напрямую через Selenium
            body_text = self.driver.find_element(By.TAG_NAME, "body").text
            
            print(f"📊 Получено HTML: {len(full_html)} символов")
            print(f"📊 Получено текста: {len(body_text)} символов")
            
            # Конвертируем в Markdown БЕЗ потерь
            markdown = self.convert_to_full_markdown(full_html, body_text, title, current_url)
            
            # Сохраняем
            filename = 'retroznak_FULL.md'
            filepath = os.path.join(self.output_dir, filename)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(markdown)
            
            # Также сохраняем сырой HTML для анализа
            html_file = filepath.replace('.md', '.html')
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(full_html)
            
            # И чистый текст
            txt_file = filepath.replace('.md', '.txt')
            with open(txt_file, 'w', encoding='utf-8') as f:
                f.write(body_text)
            
            print(f"✅ Сохранено:")
            print(f"   📄 Markdown: {filepath}")
            print(f"   📄 HTML: {html_file}")
            print(f"   📄 Текст: {txt_file}")
            print(f"📊 Размер Markdown: {len(markdown)} символов")
            
            return markdown
            
        except Exception as e:
            print(f"❌ Ошибка: {e}")
            import traceback
            traceback.print_exc()
            return None
    
    def full_page_scroll(self):
        """Прокручивает ВСЮ страницу несколько раз"""
        # Получаем высоту
        last_height = self.driver.execute_script("return document.body.scrollHeight")
        
        # Прокручиваем до конца несколько раз
        for i in range(10):  # Больше итераций!
            print(f"   Прокрутка {i+1}/10...")
            
            # Вниз
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)
            
            # В середину
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
            time.sleep(0.5)
            
            # Проверяем новую высоту
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height and i > 3:  # Минимум 4 прокрутки
                break
            last_height = new_height
        
        # Наверх
        self.driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(1)
    
    def expand_everything(self):
        """Раскрывает ВСЕ возможные скрытые элементы"""
        # JavaScript для раскрытия ВСЕГО
        expand_script = """
        // Кликаем на все "Показать больше"
        document.querySelectorAll('*').forEach(el => {
            if (el.textContent && el.textContent.includes('Показать больше')) {
                el.click();
            }
        });
        
        // Раскрываем все свернутые элементы
        document.querySelectorAll('[data-toggle], .collapse, .collapsed, .accordion, .expandable').forEach(el => {
            el.click();
        });
        
        // Показываем все скрытые элементы
        document.querySelectorAll('*').forEach(el => {
            if (window.getComputedStyle(el).display === 'none') {
                el.style.display = 'block';
            }
            if (window.getComputedStyle(el).visibility === 'hidden') {
                el.style.visibility = 'visible';
            }
        });
        
        // Удаляем классы, скрывающие контент
        document.querySelectorAll('.hidden, .d-none, .invisible').forEach(el => {
            el.classList.remove('hidden', 'd-none', 'invisible');
        });
        """
        
        try:
            self.driver.execute_script(expand_script)
            print("   ✅ Раскрыто скрытых элементов")
        except:
            pass
    
    def convert_to_full_markdown(self, html, text_content, title, url):
        """Конвертирует в Markdown БЕЗ потери данных"""
        
        # Метаданные
        metadata = f"""---
url: {url}
title: {title}
parsed_at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
parser: FULL Content Parser
mode: Извлечение ВСЕГО контента
---

# {title}

"""
        
        # Парсим HTML
        soup = BeautifulSoup(html, 'html.parser')
        
        # Удаляем только скрипты и стили
        for tag in soup.find_all(['script', 'style', 'noscript']):
            tag.decompose()
        
        # Конвертируем ВСЁ в Markdown
        print("🔄 Конвертация в Markdown...")
        
        try:
            # Используем markdownify с МАКСИМАЛЬНЫМИ настройками
            markdown_content = markdownify.markdownify(
                str(soup.body) if soup.body else str(soup),
                heading_style="ATX",
                bullets="-",
                strip=[],  # НЕ удаляем ничего!
                wrap=False,  # НЕ оборачиваем текст
                convert=['a', 'abbr', 'address', 'article', 'aside', 'audio',
                        'b', 'bdi', 'bdo', 'blockquote', 'br',
                        'caption', 'cite', 'code', 'col', 'colgroup',
                        'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt',
                        'em', 'embed',
                        'fieldset', 'figcaption', 'figure', 'footer', 'form',
                        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr',
                        'i', 'iframe', 'img', 'input', 'ins',
                        'kbd', 'label', 'legend', 'li',
                        'main', 'map', 'mark', 'menu', 'meter',
                        'nav', 'object', 'ol', 'optgroup', 'option', 'output',
                        'p', 'param', 'picture', 'pre', 'progress', 'q',
                        'rp', 'rt', 'ruby',
                        's', 'samp', 'section', 'select', 'small', 'source', 'span', 'strong', 'sub', 'summary', 'sup',
                        'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track',
                        'u', 'ul', 'var', 'video', 'wbr']  # ВСЕ возможные теги!
            )
        except Exception as e:
            print(f"⚠️ Ошибка markdownify: {e}")
            # Fallback - используем текстовый контент
            markdown_content = text_content
        
        # Минимальная очистка
        markdown_content = re.sub(r'\n{5,}', '\n\n\n\n', markdown_content)
        
        # Добавляем разделитель
        separator = "\n\n" + "="*60 + "\n\n"
        
        # Если Markdown получился маленький, добавляем текстовый контент
        if len(markdown_content) < len(text_content):
            markdown_content += separator + "## 📝 Текстовое содержимое страницы\n\n" + text_content
        
        return metadata + markdown_content
    
    def analyze_content(self, url):
        """Анализирует страницу и показывает статистику"""
        if not self.driver:
            if not self.start_driver():
                return
        
        print(f"\n🔍 Анализ страницы: {url}")
        self.driver.get(url)
        time.sleep(5)
        
        # Собираем статистику
        stats = {
            'title': self.driver.title,
            'url': self.driver.current_url,
            'links': len(self.driver.find_elements(By.TAG_NAME, "a")),
            'images': len(self.driver.find_elements(By.TAG_NAME, "img")),
            'paragraphs': len(self.driver.find_elements(By.TAG_NAME, "p")),
            'headers': len(self.driver.find_elements(By.CSS_SELECTOR, "h1,h2,h3,h4,h5,h6")),
            'divs': len(self.driver.find_elements(By.TAG_NAME, "div")),
            'forms': len(self.driver.find_elements(By.TAG_NAME, "form")),
            'tables': len(self.driver.find_elements(By.TAG_NAME, "table")),
            'lists': len(self.driver.find_elements(By.CSS_SELECTOR, "ul,ol")),
        }
        
        print("\n📊 СТАТИСТИКА СТРАНИЦЫ:")
        print("="*40)
        for key, value in stats.items():
            print(f"{key:15}: {value}")
        print("="*40)


def main():
    print("""
╔════════════════════════════════════════════════════════════╗
║         ПОЛНЫЙ ПАРСЕР - БЕРЕМ ВСЁ!                       ║
║            Без фильтрации и потерь                        ║
╚════════════════════════════════════════════════════════════╝

🎯 Этот парсер:
   • НЕ фильтрует контент
   • НЕ удаляет "лишнее"
   • Сохраняет ВСЁ в трех форматах
   • Раскрывает скрытые элементы
   • Прокручивает страницу полностью
    """)
    
    # Выбор режима
    print("\nРежим работы:")
    print("1. Парсинг с сохранением ВСЕГО")
    print("2. Анализ страницы (статистика)")
    
    choice = input("\nВыбор (1 или 2): ").strip() or "1"
    
    parser = FullContentParser(headless=True)
    
    try:
        url = 'https://xn--80ajgnnembr.xn--p1ai/'
        
        if choice == "2":
            parser.analyze_content(url)
        else:
            markdown = parser.parse_full_content(url)
            
            if markdown:
                print("\n" + "="*60)
                print("✨ УСПЕШНО ИЗВЛЕЧЕНО ВСЁ!")
                print("="*60)
                print("\n📁 Сохранено 3 файла в markdown_output/:")
                print("   • retroznak_FULL.md - Markdown версия")
                print("   • retroznak_FULL.html - Сырой HTML")
                print("   • retroznak_FULL.txt - Чистый текст")
                print("\n💡 Совет: Если нужно, можно вручную")
                print("   отредактировать .md файл")
    
    finally:
        parser.stop_driver()
        print("\n✅ Готово!")


if __name__ == '__main__':
    main()