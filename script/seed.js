'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Products
  const productDescriptions = [
    'Cool Shoe',
    'Comfy Shoe',
    'Stylish Shoe',
  ];
  const productTypes = ['basketball', 'runner', 'boot', 'other'];
  const productBrands = ['Nike', 'Adidas', 'Reebok', 'other'];
  const productColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'white',
    'black',
    'brown',
    'multi',
  ];
  const productSize = ['7', '7.5', '8', '8.5', '9', '10'];

  for (let i = 0; i < 51; i++) {
    let product = {
      description:
        productDescriptions[
          Math.floor(Math.random() * productDescriptions.length)
        ],
      type: productTypes[
        Math.floor(Math.random() * productTypes.length)
      ],
      brand:
        productBrands[
          Math.floor(Math.random() * productBrands.length)
        ],
      color:
        productColors[
          Math.floor(Math.random() * productColors.length)
        ],
      stock: 1,
      size: productSize[
        Math.floor(Math.random() * productSize.length)
      ],
      unit_price: 100 * Math.floor(Math.random() * (200 - 50) + 50),
    };

    await Product.create(product);
  }

  // Creating Users
  // const users = await Promise.all([
  //   User.create({ username: 'cody', password: '123' }),
  //   User.create({ username: 'murphy', password: '123' }),
  // ]);

  // console.log(`seeded ${users.length} users`);
  // console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
