const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Загружаем переменные из .env

// 1. Подключение к PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // Поставь true, если хочешь видеть SQL-запросы в консоли
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 2. Импорт моделей
db.Role = require('./role')(sequelize, DataTypes);
db.Operator = require('./operator')(sequelize, DataTypes);
db.Object = require('./object')(sequelize, DataTypes);
db.Monitoring = require('./monitoring')(sequelize, DataTypes);
db.Logbook = require('./logbook')(sequelize, DataTypes);
db.Session = require('./session')(sequelize, DataTypes);
db.Note = require('./note')(sequelize, DataTypes);

// 3. Связи (как мы обсуждали ранее)
db.Role.hasMany(db.Operator, { foreignKey: 'role_name_id' });
db.Operator.belongsTo(db.Role, { foreignKey: 'role_name_id' });

db.Operator.hasMany(db.Logbook, { foreignKey: 'operator_id' });
db.Logbook.belongsTo(db.Operator, { foreignKey: 'operator_id' });

db.Operator.belongsToMany(db.Object, { through: db.Monitoring, foreignKey: 'operator_id' });
db.Object.belongsToMany(db.Operator, { through: db.Monitoring, foreignKey: 'object_id' });

db.Operator.hasMany(db.Session, { foreignKey: 'operator_id' });
db.Session.belongsTo(db.Operator, { foreignKey: 'operator_id' });
db.Object.hasMany(db.Session, { foreignKey: 'object_id' });
db.Session.belongsTo(db.Object, { foreignKey: 'object_id' });

db.Operator.hasMany(db.Note, { foreignKey: 'operator_id' });
db.Note.belongsTo(db.Operator, { foreignKey: 'operator_id' });
db.Object.hasMany(db.Note, { foreignKey: 'object_id' });
db.Note.belongsTo(db.Object, { foreignKey: 'object_id' });

// 4. Проверка подключения (опционально, но полезно)
sequelize.authenticate()
    .then(() => console.log('✅ Подключение к PostgreSQL успешно установлено.'))
    .catch(err => console.error('❌ Ошибка подключения к БД:', err));

module.exports = db;