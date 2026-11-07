const db = require('./models');

async function seedRoles() {
    try {
        await db.sequelize.sync();


        const [operatorRole, createdOp] = await db.Role.findOrCreate({
            where: { title: 'OPERATOR' },
            defaults: { title: 'OPERATOR' }
        });


        const [adminRole, createdAdm] = await db.Role.findOrCreate({
            where: { title: 'ADMINISTRATOR' },
            defaults: { title: 'ADMINISTRATOR' }
        });

        console.log(' Роли в базе данных проверены/созданы!');
        console.log(`ID роли OPERATOR: ${operatorRole.role_name_id}`);
        console.log(`ID роли ADMINISTRATOR: ${adminRole.role_name_id}`);

        process.exit(0);
    } catch (error) {
        console.error(' Ошибка:', error);
        process.exit(1);
    }
}

seedRoles();