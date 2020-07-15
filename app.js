// Initialize express
const express = require('express');
const methodOverride = require('method-override');
const app = express();

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static("public"));

// const models = require('./db/models');

// require handlebars
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});


//the task array with initial placeholders for added task
var task = ["buy socks", "practice with nodejs"];


require('./data/hikes-db')

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));


app.engine('handlebars', hbs.engine);

// Use handlebars to render
app.set('view engine', 'handlebars');


require('./controllers/hikes')(app);

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})