require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');



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


router.get('/objects/:name', async (req, res) => {
    try {
        const object = await db.Object.findOne({
            where: { name: req.params.name }
        });

        if (!object) {
            return res.status(404).json({ status: 'error', message: 'Объект не найден' });
        }

        res.json({ status: 'ok', data: object });
    } catch (error) {
        console.error('Ошибка при получении объекта:', error);
        res.status(500).json({ status: 'error', message: 'Ошибка сервера' });
    }
});




router.get('/notes/:objectName', async (req, res) => {
    try {
        if (!req.session.userId) return res.status(401).json({ status: 'error', message: 'Войдите в систему' });

        const obj = await db.Object.findOne({ where: { name: req.params.objectName } });
        if (!obj) return res.status(404).json({ status: 'error', message: 'Объект не найден' });

        const notes = await db.Note.findAll({
            where: { operator_id: req.session.userId, object_id: obj.object_id },
            order: [['created_at', 'DESC']]
        });
        res.json({ status: 'ok', data: notes });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Ошибка сервера' });
    }
});


router.post('/notes', async (req, res) => {
    try {
        if (!req.session.userId) return res.status(401).json({ status: 'error', message: 'Войдите в систему' });

        const { objectName, content } = req.body;
        const obj = await db.Object.findOne({ where: { name: objectName } });
        if (!obj) return res.status(404).json({ status: 'error', message: 'Объект не найден' });

        const note = await db.Note.create({
            operator_id: req.session.userId,
            object_id: obj.object_id,
            title: `Заметка`,
            content: content
        });

        res.json({ status: 'ok', data: note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Ошибка сервера' });
    }
});

module.exports = router;