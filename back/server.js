const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// ВАЖНО: Говорим серверу, что статика (HTML, CSS, JS) лежит в папке src (на уровень выше)
app.use(express.static(path.join(__dirname, '../src')));
// ВАЖНО: Говорим серверу, что картинки лежат в папке img (на уровень выше)
app.use('/img', express.static(path.join(__dirname, '../img')));

// Маршрут: Главная (отдаем lab2.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'lab2.html'));
});

// Маршрут: О себе
app.get('/about', (req, res) => {
    res.send('<h1>О себе</h1><p>Привет! Я техногик и обзорщик гаджетов. Это страница /about.</p><a href="/">На главную</a>');
});

// Маршрут: API со статусом
app.get('/api/status', (req, res) => {
    res.json({ status: 'ok', message: 'Сервер работает' });
});

// Логика для валют (Вариант 12)
const currencyData = {
    USD: [90, 91, 92, 93, 94, 95, 96],
    EUR: [98, 99, 100, 101, 102, 101, 100],
    CNY: [12, 12.5, 13, 13.2, 13.5, 13.8, 14]
};

// Маршрут: Курсы валют с параметром :currency
app.get('/api/rates/:currency', (req, res) => {
    const currency = req.params.currency.toUpperCase();
    
    if (currencyData[currency]) {
        const rates = currencyData[currency];
        const avg = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
        
        res.json({
            currency: currency,
            rates: rates,
            avg: Number(avg.toFixed(2))
        });
    } else {
        res.status(404).json({ error: 'Валюта не поддерживается' });
    }
});

// Запуск
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});