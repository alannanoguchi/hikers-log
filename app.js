// Initialize express
const express = require('express')
const app = express()

// require handlebars
const exphbs = require('express-handlebars');

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');


// INDEX
app.get('/', (req, res) => {
    res.render('hikes-index', { hikes: hikes });
  })

// OUR MOCK ARRAY OF PROJECTS
var hikes = [
    { title: "I am your first hike", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80" },
    { title: "I am your second hike", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80" },
    { title: "I am your third hike", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80" }
  ]
  
  // INDEX
  app.get('/hikes', (req, res) => {
    res.render('hikes-index', { hikes: hikes });
  })


// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})