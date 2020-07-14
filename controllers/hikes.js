// hikes.js
// const moment = require('moment')

module.exports = function (app, models) {
    // Index using async
    // app.get('/', async (req, res) => {
    //     try {
    //         hikes = await models.Event.findAll();
    //         return res.render('hikes-index', { hikes:hikes });
    //     } catch(err) {
    //         return console.log(err)
    //     }
    // })

    app.get('/', (req, res) => {
        res.render('hikes-index', { hikes: hikes });
    })
    // app.get('/', (req, res) => {
    //     models.Hike.findAll({ order: [['createdAt', 'DESC']] }).then(hikes => {
    //       res.render('hikes-index', { hikes: hikes });
    //     })
    // })
}
