require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

// ... (твои роуты /apod и /iss из предыдущих сообщений) ...

module.exports = router;
// 1. Получить картинку дня NASA (APOD)
router.get('/apod', async (req, res) => {
    try {
        const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
        // const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        // Временно для теста
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`);
        // Отдаем клиенту только нужные поля
        res.json({
            status: 'ok',
            data: {
                title: response.data.title,
                explanation: response.data.explanation,
                url: response.data.url,
                date: response.data.date,
                media_type: response.data.media_type
            }
        });
    } catch (error) {
        console.error('Ошибка NASA APOD:', error.message);
        res.status(500).json({ status: 'error', message: 'Не удалось получить данные от NASA' });
    }
});

// 2. Получить текущее положение МКС
router.get('/iss', async (req, res) => {
    try {
        // Этот API не требует ключа
        const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');

        res.json({
            status: 'ok',
            data: {
                latitude: response.data.latitude,
                longitude: response.data.longitude,
                altitude: response.data.altitude,
                velocity: response.data.velocity,
                visibility: response.data.visibility,
                timestamp: response.data.timestamp
            }
        });
    } catch (error) {
        console.error('Ошибка ISS API:', error.message);
        res.status(500).json({ status: 'error', message: 'Не удалось получить данные о МКС' });
    }
});

module.exports = router;