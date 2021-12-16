const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const sequelize = require("./config/connection")
const dish = require("./models/Dish");
const router = require("./controllers/")


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(router)


const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const PORT = process.env.PORT || 3001;

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, ()=>{
        console.log("server up and running on" + PORT)
    })
}).catch((err) => {
    
});

