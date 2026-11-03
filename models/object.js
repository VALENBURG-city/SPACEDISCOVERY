module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Object', {
        object_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        distance: { type: DataTypes.FLOAT },
        mass: { type: DataTypes.FLOAT },
        radius: { type: DataTypes.FLOAT },
        diameter: { type: DataTypes.FLOAT },
        average_density: { type: DataTypes.FLOAT },
        first_cosmic_velocity: { type: DataTypes.FLOAT },
        rotation_speed: { type: DataTypes.FLOAT },
        description: { type: DataTypes.TEXT }
    }, {
        tableName: 'objects',
        timestamps: false
    });
};