const sequelize = require("../config/connection");
const seedGallery = require("./gallerySeed");
const seedPaintings = require("./paintingSeed");


const seedAll = async()=>{
await sequelize.sync({force: true});
await seedGallery();
await seedPaintings();

process.exit(0);
}

seedAll();