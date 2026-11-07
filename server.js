require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./models');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'space-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/planet/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'planet.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);


async function startServer() {
    try {

        await db.sequelize.sync({ force: false });
        console.log(' Таблицы синхронизированы с БД.');

        app.listen(PORT, () => {
            console.log(` Сервер запущен: http://localhost:${PORT}`);
            console.log(`Сайт доступен по адресу: http://localhost:${PORT}/index.html`);
        });
    } catch (error) {
        console.error(' Не удалось запустить сервер:', error);
    }
}

startServer();

