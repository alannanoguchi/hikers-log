// hikes.js
// const moment = require('moment')
const Hike = require('../models/hike')

module.exports = function (app) {
    // Index 
    app.get('/', (req, res) => {
       Hike.find({}).sort('name') //sorts alphabetical order 
        .then((hikes) => {
            res.render('hikes-index', {hikes})
            // {hikes, currentUser})
        })
        .catch(err => {
            console.log(err.message);
        })
    })

    // NEW
    app.get('/hikes/new', (req, res) => {
        res.render('hikes-new', {});
    })
    
    // Create
    app.post('/hikes', (req, res) => {
        const hike = new Hike(req.body)
        hike.save()
            .then(h => {
                res.redirect('/')
            }) 
    })

    // SHOW
    app.get('/hikes/:id', (req, res) => {
        // Search for the hike by its id that was passed in via req.params
        Hike.findById(req.params.id).then((hike) => {
        // If the id is for a valid hike, show it
            res.render('hikes-show', { hike})
        }).catch((err) => {
            // if the id was for a hike not in our db, log an error
            console.log(err.message);
        })
    })

    // EDIT
    app.get('/hikes/:id/edit', (req, res) => {
        Hike.findById(req.params.id).then((hike) => {
          res.render('hikes-edit', { hike });
        }).catch((err) => {
          console.log(err.message);
        })
    });

    // UPDATE
    app.post('/hikes/:id/edit', (req, res) => {
        Hike.findById(req.params.id).then(hike => {
            hike.location= req.body.location
            hike.visited = req.body.visited
            hike.save()
            .then(h => {
                res.redirect(`/hikes/${req.params.id}`);
            })
            }).catch((err) => {
                console.log(err);
        });
    });

    // DELETE
    app.get('/hikes/:id/delete', (req, res) => {
        Hike.deleteOne({_id: req.params.id}).then(hike => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
        });
    })

    // Add location
    app.post('/hikes/:id/add', function (req, res) {
        Hike.findById(req.params.id).then((hike) => {
            // If the id is for a valid hike, show it
                res.render('hikes-show', { hike })
            }).catch((err) => {
                // if the id was for a hike not in our db, log an error
                console.log(err.message);
            })
        })
}
