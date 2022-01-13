'use strict';

const {
  db,
  models: { User, Product, ProductInfo },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Products
  const productMap = {
		Nike: [
			{
				Name: "Air Max",
				Description: "Description for Air Max.",
				Type: "runner",
				Image: "",
        UnitPrice: 150 * 100 // in cents
			},
			{
				Name: "Jordans",
				Description: "Description for Jordans.",
				Type: "basketball",
				Image: "",
        UnitPrice: 200 * 100 // in cents
			},
		],
		Adidas: [
			{
				Name: "Yeezy",
				Description: "Description for Yeezy.",
				Type: "runner",
				Image: "",
        UnitPrice: 300 * 100 // in cents
			},
			{
				Name: "Ultra Boost",
				Description: "Description for Ultra Boost.",
				Type: "runner",
				Image: "",
        UnitPrice: 160 * 100 // in cents
			},
		],
		Reebok: [
			{
				Name: "Classic",
				Description: "Description for Classic.",
				Type: "lifestyle",
				Image: "",
        UnitPrice: 120 * 100 // in cents
			},
			{
				Name: "Nano X",
				Description: "Description for Nano X.",
				Type: "runner",
				Image: "",
        UnitPrice: 130 * 100 // in cents
			},
		],
	};

  const productBrands = Object.keys(productMap); // ['Nike', 'Adidas', 'Reebok']
  let instancesInProduct = 0;

  for (let i = 0; i < productBrands.length; i++) {
    const thisBrand = productBrands[i];
    for (let j = 0; j < productMap[thisBrand].length; j++) {
      const thisShoe = productMap[thisBrand][j];
      let product = {
        brand: thisBrand,
        name: thisShoe.Name,
        description: thisShoe.Description,
        type: thisShoe.Type,
        unit_price: thisShoe.UnitPrice,
      };
      await Product.create(product);
      instancesInProduct++;
    }
  }

  // Creating ProductInfos
  const productColors = ['black', 'white', 'multi'];
  const productSize = ['7', '7.5', '8', '8.5', '9', '10'];

  for (let i = 0; i < 100; i++) {
    let testProductInfo = {
      size: productSize[Math.floor(Math.random() * productSize.length)],
      color: productColors[Math.floor(Math.random() * productColors.length)],
      productId: Math.ceil(Math.random() * instancesInProduct)
    }
    let productInfo = {
      stock: 1,
      size: testProductInfo.size,
      color: testProductInfo.color,
      productId: testProductInfo.productId
    }

    const instance = await ProductInfo.findOne({ where: testProductInfo });
    if (instance) { // already exists
      await instance.update({ stock: instance.stock + 1 })
    } else {
      await ProductInfo.create(productInfo);
    }
  }

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '111',
      email: `cody@gmail.com`,
      address: `123 Lane Street NewYork, NY 11100`,
      phone: `111-111-1111`,
    }),

    User.create({
      isAdmin: true,
      username: 'Johan',
      password: '222',
      email: `johan@gmail.com`,
      address: `222 Main Street New York, NY 30000`,
      phone: `222-222-2222`,
    }),

    User.create({
      isAdmin: true,
      username: 'Luke',
      password: '333',
      email: `luke@gmail.com`,
      address: `333 Main Street New York, NY 20000`,
      phone: `333-333-3333`,
    }),

    User.create({
      isAdmin: true,
      username: 'blaine',
      password: '444',
      email: `blaine@gmail.com`,
      address: `444 Left Street New York, NY 50000`,
      phone: `444-444-4444`,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
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
