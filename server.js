const express = require('express')
const session = require('express-session')
const PORT = 3000;
const bcrypt = require('bcrypt')
const pool = require('./db')
const app = express()
const path = require('path')

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(session({

    secret: 'secret',
    resave: false,
    saveUninitialized: false

}));

app.get('/', (req, res) => {
    res.sendFile('/index.html')
});

app.listen(PORT, () => {
    console.log(`server start http://localhost:${PORT}`)
});