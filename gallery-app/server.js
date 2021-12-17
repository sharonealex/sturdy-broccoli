const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");

const {Gallery, Paintings} = require("./models/");
const routes = require("./controllers/homeRoutes")


const app = express();
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlbars");

app.use(routes);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(), path.join(__dirname, "public"));

const PORT = process.env.port || 3001;

sequelize.sync({force: false}).then(()=>{
app.listen(PORT, ()=>{
console.log(`server running on ${PORT}`);
})
})
