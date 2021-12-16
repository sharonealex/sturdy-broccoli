const sequelize = require("../config/connection");
const Dish = require("../models/Dish");

const DishSeedData = require("./dish-seed.json");


const seedData = async(req, res)=>{
await sequelize.sync({force: true});
await Dish.bulkCreate(DishSeedData, {
    indvidualHooks: true,
    returning: true
});
process.exit(0);
}

seedData();