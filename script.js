document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quiz-form');
    const submitButton = form.querySelector('.submit-btn');
    
    // !!! ВАЖЛИВО !!!
    // Я ВСТАВИВ ВАШЕ ПОСИЛАННЯ СЮДИ
    const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdsid5A6A5UxLHS0NthU-drTUS0COrwKBEVmWT3c4Pv8E112A/formResponse';

    form.addEventListener('submit', function(event) {
        // 1. Зупиняємо стандартну відправку
        event.preventDefault();

        // 2. Блокуємо кнопку
        submitButton.disabled = true;
        submitButton.textContent = 'ВІДПРАВКА...';

        // 3. Збираємо дані форми
        const formData = new FormData(form);

        // 4. Відправляємо дані у Google Форму "всліпу"
        fetch(GOOGLE_FORM_ACTION_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Це "хак", щоб уникнути помилки CORS
        })
        .then(() => {
            // Ми не можемо *перевірити* успіх через 'no-cors',
            // тому просто припускаємо, що все спрацювало.
            
            // Ховаємо форму і показуємо подяку
            const container = document.querySelector('.container');
            container.innerHTML = '<h1 style="text-align: center; margin-top: 50px;">ДЯКУЄМО!</h1><p class="description" style="text-align: center;">ВАШІ ВІДПОВІДІ ЗБЕРЕЖЕНО.</p>';
            
            // Стилізуємо body, щоб повідомлення було по центру
            document.body.style.display = 'flex';
            document.body.style.minHeight = '100vh';
            document.body.style.alignItems = 'center';
            document.body.style.justifyContent = 'center';
        })
        .catch(error => {
            // 6. Якщо сталася помилка (малоймовірно, але можливо)
            console.error('Помилка відправки:', error);
            alert('Сталася помилка. Будь ласка, спробуйте ще раз.');
            submitButton.disabled = false;
            submitButton.textContent = 'Завершити опитування';
        });
    });
});