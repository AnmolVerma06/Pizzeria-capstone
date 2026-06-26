require('dotenv').config();
const mongoose = require('mongoose');
const Pizza = require('../models/Pizza');
const Ingredient = require('../models/Ingredient');
const connectDB = require('../config/db');

const pizzas = [
  {
    name: 'Paneer Tikka',
    description:
      'This is popular italian pizza flavoured with marinated tikka sauce and paneer',
    image:
      'https://thumb9.shutterstock.com/display_pic_with_logo/376831/127528958/stock-photo-delicious-italian-pizza-over-white-127528958.jpg',
    price: 290,
    ingredients: ['dough/flour', 'pizza saucce', 'pizza sauce seasoning', 'cheese'],
    toppings: ['Paneer', 'Fried Onion', 'Green olive', 'Capsicum', 'Red peprika'],
    category: 'veg',
    isVeg: true,
  },
  {
    name: 'Chicken Italiaona',
    description:
      'This is popular italian pizza flavoured with light sugary taste and creamy touch',
    image:
      'https://thumb7.shutterstock.com/display_pic_with_logo/96886/96886,1274350207,7/stock-photo-pizza-53553874.jpg',
    price: 350,
    ingredients: [
      'deep dish pizza mix',
      'pizza saucce',
      'pizza sauce seasoning',
      'cheese',
      'sugar and cinnomon blend',
      'plain butter',
    ],
    toppings: ['Pepperoni', 'Chicken Sausage', 'Mushroom', 'Capsicum', 'Black beans'],
    category: 'non-veg',
    isVeg: false,
  },
  {
    name: 'Veggie Supreme',
    description:
      'This is popular italian pizza flavoured with crushed garlic, with multiple herbs topped up with sweet corn',
    image:
      'https://thumb1.shutterstock.com/display_pic_with_logo/1003451/770556520/stock-photo-hot-pizza-with-pepperoni-sausage-on-a-dark-background-with-copy-space-pizza-with-mushrooms-770556520.jpg',
    price: 310,
    ingredients: [
      'deep dish pizza mix',
      'pizza saucce',
      'pizza sauce seasoning',
      'cheese',
      'garlic herbs',
      'flavored butter',
    ],
    toppings: ['Fried Onion', 'Sweet corn', 'Mushroom', 'Capsicum', 'Black olive '],
    category: 'veg',
    isVeg: true,
  },
  {
    name: 'Tripple Chicken Feast',
    description:
      'This is popular italian pizza flavoured with unique greek dressing topped up with keema and meat ball',
    image:
      'https://thumb9.shutterstock.com/display_pic_with_logo/2793292/332497832/stock-photo-mixture-pizza-italian-food-332497832.jpg',
    price: 400,
    ingredients: [
      'low carb pizza dough',
      'pizza saucce',
      'pizza sauce seasoning',
      'cheese',
      'greek dressing',
      'cajun',
    ],
    toppings: ['Chicken keema', 'Fried Onion', 'Chicken Meat ball', 'Capsicum', 'Sweet corn'],
    category: 'non-veg',
    isVeg: false,
  },
  {
    name: 'Ultimate Chicken',
    description:
      'This is popular italian pizza flavoured with BBA sauce, flavored butter. it has spongy base which gives unique taste with multiple toppings',
    image:
      'https://thumb7.shutterstock.com/display_pic_with_logo/2793292/246331354/stock-photo-pizza-margherita-italian-246331354.jpg',
    price: 625,
    ingredients: [
      'deep dish pizza mix',
      'pizza saucce',
      'pizza sauce seasoning',
      'cheese',
      'BBQ sauce',
      'cajun',
      'flavored butter',
    ],
    toppings: [
      'Pepperoni',
      'Fried Onion',
      'Chicken Meat ball',
      'Chicken Sausage',
      'Chicken keema',
    ],
    category: 'non-veg',
    isVeg: false,
  },
];

const ingredients = [
  {
    name: 'Pepperoni',
    image:
      'https://thumb1.shutterstock.com/display_pic_with_logo/55755/161642033/stock-photo-single-slice-of-pepperoni-meat-isolated-on-white-with-path-shot-from-above-161642033.jpg',
    price: 110,
  },
  {
    name: 'Mushroom',
    image:
      'https://thumb9.shutterstock.com/display_pic_with_logo/1207547/568114672/stock-photo-fresh-cultivated-button-mushrooms-and-twigs-of-parsley-in-the-wooden-basket-one-whole-mushroom-and-568114672.jpg',
    price: 35,
  },
  {
    name: 'Black beans',
    image:
      'https://thumb1.shutterstock.com/display_pic_with_logo/180783430/755093356/stock-photo-black-beans-grain-on-white-background-755093356.jpg',
    price: 45,
  },
  {
    name: 'Black olive',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgCjP_CsjbolOlOaIKNIAscO6KyhIcwzXyMQ&s',
    price: 50,
  },
  {
    name: 'Green olive',
    image:
      'https://thumb7.shutterstock.com/display_pic_with_logo/4526794/639321544/stock-photo-stuffed-olives-isolated-on-white-background-639321544.jpg',
    price: 50,
  },
  {
    name: 'Jalapeno',
    image:
      'https://thumb7.shutterstock.com/display_pic_with_logo/999701/250939984/stock-photo-sliced-green-jalapeno-peppers-on-white-background-250939984.jpg',
    price: 45,
  },
  {
    name: 'Chicken',
    image:
      'https://thumb7.shutterstock.com/display_pic_with_logo/371512/583587001/stock-photo-fresh-raw-chicken-isolated-on-white-583587001.jpg',
    price: 60,
  },
  {
    name: 'Tomato',
    image:
      'https://thumb1.shutterstock.com/display_pic_with_logo/721492/400195690/stock-photo-tomatoes-isolated-on-white-background-400195690.jpg',
    price: 20,
  },
  {
    name: 'Red peprika',
    image:
      'https://thumb9.shutterstock.com/display_pic_with_logo/676765/343609895/stock-photo-chili-pepper-isolated-on-a-white-background-343609895.jpg',
    price: 30,
  },
  {
    name: 'Paneer',
    image:
      'https://thumb7.shutterstock.com/display_pic_with_logo/605002/195341264/stock-photo-piece-of-cheese-or-paneer-isolated-on-a-white-background-195341264.jpg',
    price: 45,
  },
  {
    name: 'Fried Onion',
    image:
      'https://thumb1.shutterstock.com/display_pic_with_logo/152950/630261116/stock-photo-delicious-crispy-fried-onion-rings-isolated-on-white-630261116.jpg',
    price: 18,
  },
  {
    name: 'Capsicum',
    image:
      'https://thumb7.shutterstock.com/display_pic_with_logo/259963/259963,1235208469,1/stock-photo-vegetables-bulgarian-pepper-on-a-white-background-isolated-25335661.jpg',
    price: 15,
  },
  {
    name: 'Sweet corn',
    image:
      'https://thumb7.shutterstock.com/display_pic_with_logo/3102608/706329457/stock-photo-sweet-corn-in-wooden-bowl-and-spoon-isolated-on-white-background-706329457.jpg',
    price: 38,
  },
];

const seedDatabase = async () => {
  await connectDB();

  await Pizza.deleteMany({});
  await Ingredient.deleteMany({});

  await Pizza.insertMany(pizzas);
  await Ingredient.insertMany(ingredients);

  console.log('Database seeded successfully!');
  console.log(`  - ${pizzas.length} pizzas added`);
  console.log(`  - ${ingredients.length} ingredients added`);

  await mongoose.connection.close();
  process.exit(0);
};

seedDatabase().catch((err) => {
  console.error('Seed error:', err.message);
  process.exit(1);
});
