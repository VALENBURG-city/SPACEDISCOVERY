module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Object', {
        object_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        type: { type: DataTypes.STRING(50), allowNull: false },
        distance: { type: DataTypes.FLOAT },
        mass: { type: DataTypes.STRING(50) },
        radius: { type: DataTypes.FLOAT },
        average_density: { type: DataTypes.FLOAT },
        first_cosmic_velocity: { type: DataTypes.FLOAT },
        rotation_speed: { type: DataTypes.FLOAT },
        temperature: { type: DataTypes.FLOAT },
        air_pressure: { type: DataTypes.FLOAT },
        gravity: { type: DataTypes.FLOAT },
        moons_count: { type: DataTypes.INTEGER },
        description: { type: DataTypes.TEXT },
        image_urls: { type: DataTypes.JSON, defaultValue: [] },
        composition: { type: DataTypes.JSON },
        notes: { type: DataTypes.TEXT },
    }, {
        tableName: 'objects',
        timestamps: false
    });
};