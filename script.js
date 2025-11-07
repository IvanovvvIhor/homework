document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quiz-form');
    // Знаходимо кнопку всередині форми
    const submitButton = form.querySelector('.submit-btn');

    form.addEventListener('submit', function(event) {
        // 1. Зупиняємо стандартну відправку (щоб сторінка не перезавантажилась)
        event.preventDefault();

        // 2. Блокуємо кнопку, поки йде відправка
        submitButton.disabled = true;
        submitButton.textContent = 'ВІДПРАВКА...';

        // 3. Збираємо всі дані форми
        const formData = new FormData(form);

        // 4. Відправляємо дані на Formspree
        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json' // Просимо Formspree відповісти нам JSON'ом
            }
        })
        .then(response => {
            // 5. Обробляємо успішну відповідь
            if (response.ok) {
                // Ховаємо всю форму і показуємо подяку
                // Ми замінюємо вміст усього <div class="container">
                const container = document.querySelector('.container');
                container.innerHTML = '<h1 style="text-align: center; margin-top: 50px;">ДЯКУЄМО!</h1><p class="description" style="text-align: center;">ВАШІ ВІДПОВІДІ ЗБЕРЕЖЕНО.</p>';
                
                // Додатково стилізуємо body, щоб повідомлення було по центру
                document.body.style.display = 'flex';
                document.body.style.minHeight = '100vh';
                document.body.style.alignItems = 'center';
                document.body.style.justifyContent = 'center';

            } else {
                // Обробляємо помилку, якщо щось пішло не так
                throw new Error('Помилка мережі або сервера');
            }
        })
        .catch(error => {
            // 6. Якщо сталася помилка
            console.error('Помилка відправки:', error);
            alert('Сталася помилка. Будь ласка, спробуйте ще раз.');
            submitButton.disabled = false;
            submitButton.textContent = 'Завершити опитування';
        });
    });
});