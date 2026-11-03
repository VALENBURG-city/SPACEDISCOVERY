module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Role', {
        role_name_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'roles',
        timestamps: false
    });
};