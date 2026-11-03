module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Monitoring', {
        monitoring_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'monitoring',
        timestamps: false
    });
};