const express = require('express');
const router = express.Router();
const db = require('../models');


router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ status: 'error', message: 'Заполните все поля' });
        }


        const existingUser = await db.Operator.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Этот email уже занят' });
        }


        const operatorRole = await db.Role.findOne({ where: { title: 'OPERATOR' } });

        if (!operatorRole) {
            return res.status(500).json({ status: 'error', message: 'Критическая ошибка: Роль OPERATOR не найдена в БД' });
        }


        const newUser = await db.Operator.create({
            name,
            email,
            password_hash: password,
            role_name_id: operatorRole.role_name_id
        });


        req.session.userId = newUser.operator_id;
        req.session.userName = newUser.name;

        res.json({ status: 'ok', message: 'Успешно зарегистрирован', user: { name: newUser.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Ошибка сервера' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Заполните все поля' });
        }

        const user = await db.Operator.findOne({ where: { email } });

        if (!user || user.password_hash !== password) {
            return res.status(400).json({ status: 'error', message: 'Неверный email или пароль' });
        }

        req.session.userId = user.operator_id;
        req.session.userName = user.name;

        res.json({ status: 'ok', message: 'Успешный вход', user: { name: user.name } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Ошибка сервера' });
    }
});


router.get('/me', (req, res) => {
    if (req.session.userId) {
        res.json({ status: 'ok', user: { id: req.session.userId, name: req.session.userName } });
    } else {
        res.json({ status: 'error', message: 'Не авторизован' });
    }
});


router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ status: 'ok' });
});

module.exports = router;