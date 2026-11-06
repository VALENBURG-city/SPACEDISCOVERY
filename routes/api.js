require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');



module.exports = router;

router.get('/apod', async (req, res) => {
    try {
        const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
        const response = await axios.get(`https://science.nasa.gov/wp-json/wp/v2/apod-basic?api_key=${apiKey}`);


        const apodData = response.data[0];

        res.json({
            status: 'ok',
            data: {
                title: apodData.title,
                explanation: apodData.explanation,

                image_url: apodData.hdurl || apodData.url,
                date: apodData.date,
                media_type: apodData.media_type,
                alt: apodData.alt
            }
        });
    } catch (error) {
        console.error('Ошибка NASA APOD:', error.message);
        res.status(500).json({ status: 'error', message: 'Не удалось получить данные от NASA' });
    }
});

router.get('/iss', async (req, res) => {
    try {

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