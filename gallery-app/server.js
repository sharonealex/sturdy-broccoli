const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session')
console.log(session.Session)

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require("./utils/helper");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const sess = {
  secret: 'Super secret secret',
  resave: false,  //if the data hasnt changed there is no need to keep resaving the session.
  saveUninitialized: false,  //does not allow null or undefined
};

app.use(session(sess));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
