const sequelize = require("../config/connection");
const Dish = require("../models/Dish")

const dishData = require("./dish-seed.json");

const seedDish = async()=>{
    await sequelize.sync({force: true});
    await Dish.bulkCreate(dishData, {
        individualHooks: true,
        returning: true
    })
    process.exit(0);
};

seedDish();