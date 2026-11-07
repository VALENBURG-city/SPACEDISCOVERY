const db = require('./models');

async function seed() {
    try {
        await db.sequelize.sync();


        await db.Object.destroy({ where: {} });
        console.log('🗑 База очищена.');


        const objects = [

            {
                name: 'Mercury', type: 'Планета',
                distance: 57.9, mass: '3.3011 × 10^23', radius: 2439.7, average_density: 5.42,
                first_cosmic_velocity: 4.3, rotation_speed: 10.89, temperature: 167,
                air_pressure: 0, gravity: 3.7, moons_count: 0,
                description: 'Меркурий — самая близкая к Солнцу и самая маленькая планета Солнечной системы. У него нет атмосферы, поэтому перепады температур здесь самые экстремальные.',
                image_urls: ['/media/MERCURY1.jpg', '/media/MERCURY2.jpg'],
                composition: [{ element: 'Кислород (O₂)', percent: 42 }, { element: 'Натрий (Na)', percent: 29 }],
                notes: 'Первая планета от Солнца.'
            },
            {
                name: 'Venus', type: 'Планета',
                distance: 108.2, mass: '4.8675 × 10^24', radius: 6051.8, average_density: 5.24,
                first_cosmic_velocity: 10.36, rotation_speed: 6.52, temperature: 464,
                air_pressure: 92, gravity: 8.87, moons_count: 0,
                description: 'Венера — вторая планета от Солнца. Она окутана плотными облаками серной кислоты и имеет мощнейший парниковый эффект, из-за чего это самая горячая планета.',
                image_urls: ['/media/VENUS1.jpg', '/media/VENUS2.jpg'],
                composition: [{ element: 'Углекислый газ (CO₂)', percent: 96.5 }, { element: 'Азот (N₂)', percent: 3.5 }],
                notes: 'Самая горячая планета.'
            },
            {
                name: 'Earth', type: 'Планета',
                distance: 149.6, mass: '5.972 × 10^24', radius: 6371, average_density: 5.51,
                first_cosmic_velocity: 7.9, rotation_speed: 1670, temperature: 15,
                air_pressure: 1, gravity: 9.81, moons_count: 1,
                description: 'Земля — третья планета от Солнца и единственный известный объект во Вселенной, где существует жизнь. Около 71% поверхности покрыто водой.',
                image_urls: ['/media/EARTH1.jpg', '/media/EARTH2.jpg'],
                composition: [{ element: 'Азот (N₂)', percent: 78.08 }, { element: 'Кислород (O₂)', percent: 20.95 }, { element: 'Аргон (Ar)', percent: 0.93 }],
                notes: 'Наш дом.'
            },
            {
                name: 'Mars', type: 'Планета',
                distance: 227.9, mass: '6.4171 × 10^23', radius: 3389.5, average_density: 3.93,
                first_cosmic_velocity: 3.6, rotation_speed: 24.07, temperature: -63,
                air_pressure: 0.006, gravity: 3.71, moons_count: 2,
                description: 'Марс — четвертая планета от Солнца. Из-за ржавчины (оксид железа) на его поверхности его называют «Красной планетой». Это холодная, каменистая пустыня с тонкой атмосферой.',
                image_urls: ['/media/MARS1.jpg', '/media/MARS2.jpg'],
                composition: [{ element: 'Углекислый газ (CO₂)', percent: 95.97 }, { element: 'Аргон (Ar)', percent: 1.93 }],
                notes: 'Красная планета.'
            },
            {
                name: 'Jupiter', type: 'Планета',
                distance: 778.5, mass: '1.898 × 10^27', radius: 69911, average_density: 1.33,
                first_cosmic_velocity: 59.5, rotation_speed: 45330, temperature: -145,
                air_pressure: 0, gravity: 24.79, moons_count: 95,
                description: 'Юпитер — крупнейшая планета Солнечной системы, газовый гигант. Он имеет мощную магнитосферу и знаменитое Большое Красное Пятно — гигантский шторм.',
                image_urls: ['/media/JUPITER1.jpg', '/media/JUPITER2.jpg'],
                composition: [{ element: 'Водород (H₂)', percent: 90 }, { element: 'Гелий (He)', percent: 10 }],
                notes: 'Крупнейшая планета.'
            },
            {
                name: 'Saturn', type: 'Планета',
                distance: 1434, mass: '5.683 × 10^26', radius: 58232, average_density: 0.687,
                first_cosmic_velocity: 35.5, rotation_speed: 36840, temperature: -178,
                air_pressure: 0, gravity: 10.44, moons_count: 146,
                description: 'Сатурн — шестая планета от Солнца, известная своими великолепными кольцами, состоящими из льда и камня. Это газовый гигант с самой низкой плотностью.',
                image_urls: ['/media/SATURN1.jpg', '/media/SATURN2.jpg'],
                composition: [{ element: 'Водород (H₂)', percent: 96 }, { element: 'Гелий (He)', percent: 3 }],
                notes: 'Планета с кольцами.'
            },
            {
                name: 'Uranus', type: 'Планета',
                distance: 2871, mass: '8.681 × 10^25', radius: 25362, average_density: 1.27,
                first_cosmic_velocity: 21.3, rotation_speed: 14760, temperature: -224,
                air_pressure: 0, gravity: 8.69, moons_count: 28,
                description: 'Уран — седьмая планета от Солнца, ледяной гигант. Он уникален тем, что вращается «на боку», а его ось наклонена почти на 98 градусов.',
                image_urls: ['/media/URANUS1.jpg', '/media/URANUS2.jpg'],
                composition: [{ element: 'Водород (H₂)', percent: 83 }, { element: 'Гелий (He)', percent: 15 }, { element: 'Метан (CH₄)', percent: 2 }],
                notes: 'Ледяной гигант.'
            },
            {
                name: 'Neptune', type: 'Планета',
                distance: 4495, mass: '1.024 × 10^26', radius: 24622, average_density: 1.64,
                first_cosmic_velocity: 23.5, rotation_speed: 9648, temperature: -214,
                air_pressure: 0, gravity: 11.15, moons_count: 16,
                description: 'Нептун — восьмая и самая дальняя планета от Солнца. Это ледяной гигант с самыми сильными ветрами в Солнечной системе, скорость которых достигает 2000 км/ч.',
                image_urls: ['/media/NEPTUNE1.jpg', '/media/NEPTUNE2.jpg'],
                composition: [{ element: 'Водород (H₂)', percent: 80 }, { element: 'Гелий (He)', percent: 19 }, { element: 'Метан (CH₄)', percent: 1 }],
                notes: 'Самые сильные ветры.'
            },


            {
                name: 'Moon', type: 'Спутник',
                distance: 0.384, mass: '7.342 × 10^22', radius: 1737.4, average_density: 3.34,
                first_cosmic_velocity: 1.68, rotation_speed: 16.6, temperature: -20,
                air_pressure: 0, gravity: 1.62, moons_count: 0,
                description: 'Луна — единственный естественный спутник Земли. Это пятый по величине спутник в Солнечной системе. Она вызывает приливы и отливы на Земле.',
                image_urls: ['/media/MOON1.jpg'],
                composition: [{ element: 'Кислород (O)', percent: 43 }, { element: 'Кремний (Si)', percent: 21 }],
                notes: 'Спутник Земли.'
            },
            {
                name: 'Phobos', type: 'Спутник',
                distance: 0.009, mass: '1.0659 × 10^16', radius: 11.2, average_density: 1.88,
                first_cosmic_velocity: 0.011, rotation_speed: 7.6, temperature: -40,
                air_pressure: 0, gravity: 0.0057, moons_count: 0,
                description: 'Фобос — один из двух спутников Марса. Он имеет неправильную форму и медленно приближается к Марсу, что в будущем приведет к его разрушению.',
                image_urls: ['/media/PHOBOS1.jpg'],
                composition: [{ element: 'Железо (Fe)', percent: 50 }, { element: 'Кремний (Si)', percent: 20 }],
                notes: 'Спутник Марса.'
            },
            {
                name: 'Deimos', type: 'Спутник',
                distance: 0.023, mass: '1.4762 × 10^15', radius: 6.2, average_density: 1.47,
                first_cosmic_velocity: 0.006, rotation_speed: 1.3, temperature: -40,
                air_pressure: 0, gravity: 0.003, moons_count: 0,
                description: 'Деймос — второй спутник Марса. Он меньше Фобоса и имеет более гладкую поверхность, покрытую реголитом.',
                image_urls: ['/media/DEIMOS1.jpg'],
                composition: [{ element: 'Железо (Fe)', percent: 50 }, { element: 'Кремний (Si)', percent: 20 }],
                notes: 'Спутник Марса.'
            },
            {
                name: 'Io', type: 'Спутник',
                distance: 0.42, mass: '8.93 × 10^22', radius: 1821.6, average_density: 3.52,
                first_cosmic_velocity: 2.55, rotation_speed: 0, temperature: -143,
                air_pressure: 0, gravity: 1.79, moons_count: 0,
                description: 'Ио — один из четырёх крупнейших спутников Юпитера. Это самое вулканически активное тело в Солнечной системе.',
                image_urls: ['/media/IO1.jpg'],
                composition: [{ element: 'Сера (S)', percent: 60 }, { element: 'Кремний (Si)', percent: 20 }],
                notes: 'Спутник Юпитера.'
            },
            {
                name: 'Europa', type: 'Спутник',
                distance: 0.67, mass: '4.8 × 10^22', radius: 1560.8, average_density: 3.01,
                first_cosmic_velocity: 2.02, rotation_speed: 0, temperature: -160,
                air_pressure: 0, gravity: 1.31, moons_count: 0,
                description: 'Европа — один из четырёх крупнейших спутников Юпитера. Под её ледяной корой скрывается глобальный океан жидкой воды, что делает её главным кандидатом на поиск внеземной жизни.',
                image_urls: ['/media/EUROPA1.jpg'],
                composition: [{ element: 'Кислород (O)', percent: 50 }, { element: 'Водород (H)', percent: 30 }],
                notes: 'Океан подо льдом.'
            },
            {
                name: 'Titan', type: 'Спутник',
                distance: 1.2, mass: '1.345 × 10^23', radius: 2574, average_density: 1.88,
                first_cosmic_velocity: 2.64, rotation_speed: 0, temperature: -179,
                air_pressure: 1.5, gravity: 1.35, moons_count: 0,
                description: 'Титан — крупнейший спутник Сатурна и второй по величине в Солнечной системе. Это единственный спутник с плотной атмосферой и озерами из жидкого метана.',
                image_urls: ['/media/TITAN1.jpg'],
                composition: [{ element: 'Азот (N₂)', percent: 95 }, { element: 'Метан (CH₄)', percent: 5 }],
                notes: 'Спутник Сатурна с атмосферой.'
            },
            {
                name: 'Titania', type: 'Спутник',
                distance: 0.43, mass: '3.4 × 10^21', radius: 788.4, average_density: 1.71,
                first_cosmic_velocity: 0.77, rotation_speed: 0, temperature: -203,
                air_pressure: 0, gravity: 0.37, moons_count: 0,
                description: 'Титания — крупнейший спутник Урана. Она состоит из льда и камня и имеет множество кратеров.',
                image_urls: ['/media/TITANIA1.jpg'],
                composition: [{ element: 'Вода (H₂O)', percent: 50 }, { element: 'Камень', percent: 50 }],
                notes: 'Спутник Урана.'
            },
            {
                name: 'Oberon', type: 'Спутник',
                distance: 0.58, mass: '3.0 × 10^21', radius: 761.4, average_density: 1.63,
                first_cosmic_velocity: 0.73, rotation_speed: 0, temperature: -203,
                air_pressure: 0, gravity: 0.35, moons_count: 0,
                description: 'Оберон — второй по величине спутник Урана. Его поверхность покрыта кратерами и имеет темный цвет.',
                image_urls: ['/media/OBERON1.jpg'],
                composition: [{ element: 'Вода (H₂O)', percent: 50 }, { element: 'Камень', percent: 50 }],
                notes: 'Спутник Урана.'
            },
            {
                name: 'Triton', type: 'Спутник',
                distance: 0.35, mass: '2.14 × 10^22', radius: 1353.4, average_density: 2.06,
                first_cosmic_velocity: 1.46, rotation_speed: 0, temperature: -235,
                air_pressure: 0, gravity: 0.78, moons_count: 0,
                description: 'Тритон — крупнейший спутник Нептуна. Он уникален тем, что движется в обратном направлении по отношению к вращению планеты.',
                image_urls: ['/media/TRITON1.png'],
                composition: [{ element: 'Азот (N₂)', percent: 70 }, { element: 'Вода (H₂O)', percent: 30 }],
                notes: 'Спутник Нептуна.'
            },
            {
                name: 'Proteus', type: 'Спутник',
                distance: 0.11, mass: '4.4 × 10^19', radius: 210, average_density: 1.3,
                first_cosmic_velocity: 0.17, rotation_speed: 0, temperature: -220,
                air_pressure: 0, gravity: 0.07, moons_count: 0,
                description: 'Протей — второй по величине спутник Нептуна. Он имеет неправильную форму и темную поверхность.',
                image_urls: ['/media/PROTEUS1.jpg'],
                composition: [{ element: 'Вода (H₂O)', percent: 50 }, { element: 'Камень', percent: 50 }],
                notes: 'Спутник Нептуна.'
            }
        ];


        for (const obj of objects) {
            await db.Object.create(obj);
        }

        console.log(`✅ База данных заполнена ${objects.length} объектами!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Ошибка:', error);
        process.exit(1);
    }
}

seed();