const express = require("express");
const sequelize = require("./config/connection");
const Dish = require("./models/Dish");
const exphbs = require("express-handlebars");
const path = require("path")


const app = new express();
const PORT = process.env.port || 3001;

const hbs = exphbs.create({})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({force: true}).then(() => {
    app.listen(PORT, ()=>{
        console.log("server running on 3001")
    })
}).catch((err) => {
    
});