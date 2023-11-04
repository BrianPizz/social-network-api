const connection = require('../config/connection');
const { User } = require('../models');
const users  = require('./data');

connection.once('open', async () => {
    console.log('connected');
    // delete collections if they exits
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    await User.collection.insertMany(users);

    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})
