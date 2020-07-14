// Initialize express
const express = require('express');
const methodOverride = require('method-override');
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

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));


app.engine('handlebars', hbs.engine);

// Use handlebars to render
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
var hikes = [
    { name: "California", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1548625361-1adcab316530?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" },
    { name: "Washington", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1583295598793-1d1c520ad40c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" },
    { name: "Oregon", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1548008807-49e00c814b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" }
  ]
  

// Index using async
app.get('/', async (req, res) => {
    try {
        hikes = await models.Event.findAll();
        return res.render('hikes-index', { hikes:hikes });
    } catch(err) {
        return console.log(err)
    }
})
// app.get('/', (req, res) => {
//     res.render('hikes-index', { hikes: hikes });
// })
// app.get('/', (req, res) => {
//     models.Hike.findAll({ order: [['createdAt', 'DESC']] }).then(hikes => {
//       res.render('hikes-index', { hikes: hikes });
//     })
// })


  
// CREATE
app.post('/hikes', (req, res) => {
    models.Hike.create(req.body).then(hike => {
        // Redirect to hikes/:id
      res.redirect(`/hikes/${hike.id}`);
    }).catch((err) => {
      console.log(err)
    });
})

// NEW
app.get('/hikes/new', (req, res) => {
    res.render('hikes-new', {});
})

// SHOW
app.get('/hikes/:id', (req, res) => {
    // Search for the hike by its id that was passed in via req.params
    models.Hike.findByPk(req.params.id).then((hike) => {
      // If the id is for a valid hike, show it
      res.render('hikes-show', { hike: hike })
    }).catch((err) => {
      // if the id was for a hike not in our db, log an error
      console.log(err.message);
    })
})

// EDIT
app.get('/hikes/:id/edit', (req, res) => {
    models.Hike.findByPk(req.params.id).then((hike) => {
      res.render('hikes-edit', { hike: hike });
    }).catch((err) => {
      console.log(err.message);
    })
});

// UPDATE
app.put('/hikes/:id', (req, res) => {
    models.Hike.findByPk(req.params.id).then(hike => {
      hike.update(req.body).then(hike => {
        res.redirect(`/hikes/${req.params.id}`);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
});

// DELETE
app.delete('/hikes/:id', (req, res) => {
    models.Hike.findByPk(req.params.id).then(hike => {
      hike.destroy();
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err);
    });
})



// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})