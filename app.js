// Initialize express
const express = require('express');
const app = express();

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

const models = require('./db/models');

// require handlebars
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));


app.engine('handlebars', hbs.engine);

// Use handlebars to render
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
var hikes = [
    { name: "I am your first hike", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80" },
    { name: "I am your second hike", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80" },
    { name: "I am your third hike", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80" }
  ]
  

// Index
app.get('/', (req, res) => {
    models.Hike.findAll({ order: [['createdAt', 'DESC']] }).then(hikes => {
      res.render('hikes-index', { hikes: hikes });
    })
})
  
// CREATE
app.post('/hikes', (req, res) => {
    models.Hike.create(req.body).then(hike => {
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err)
    });
  })

// NEW
app.get('/hikes/new', (req, res) => {
    res.render('hikes-new', {});
})


// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})