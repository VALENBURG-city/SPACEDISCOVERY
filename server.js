require('dotenv').config(); // Обязательно в самом верху
const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./models'); // Подключаем Sequelize

const apiRoutes = require('./routes/api'); // Подключаем API NASA

const app = express();
const PORT = 3000;

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'space-secret',
    resave: false,
    saveUninitialized: false
}));

// Раздаем статику из папки public
app.use(express.static(path.join(__dirname, 'public')));

// --- Маршруты ---
// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API маршруты (NASA, ISS)
app.use('/api', apiRoutes);

// --- Запуск ---
async function startServer() {
    try {
        // sync({ force: false }) — создает таблицы, если их нет. НЕ удаляет данные!
        await db.sequelize.sync({ force: false });
        console.log('✅ Таблицы синхронизированы с БД.');

        app.listen(PORT, () => {
            console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
            console.log(`Сайт доступен по адресу: http://localhost:${PORT}/index.html`);
        });
    } catch (error) {
        console.error('❌ Не удалось запустить сервер:', error);
    }
}

startServer();