const userSeeds = require('./userSeed.json');
const itemSeeds = require('./itemSeed.json');
const db = require ('../config/connection');
const { Item, User } = require('../models');

db.once('open', async () => {
    try {
        await Item.deleteMany({});
        await User.deleteMany({});

        await User.create(userSeeds);

        for (let i = 0; i < itemSeeds.length; i++) {
            const { _id, itemOwner } = await Item.create(itemSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: itemOwner },
                {
                    $addToSet: {
                        items: _id,
                    },
                }
            );
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
})