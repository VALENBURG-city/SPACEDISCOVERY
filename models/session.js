module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Session', {
        session_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        start_time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        end_time: {
            type: DataTypes.DATE
        },
        duration: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'sessions',
        timestamps: false
    });
};