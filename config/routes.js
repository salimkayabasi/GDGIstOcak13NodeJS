var mongoose = require('mongoose')
    , Activity = mongoose.model('Activity')

module.exports = function (app) {
    var activities = require('../app/controllers/activity')
    app.get('/', activities.index)
    app.get('/new', activities.new)
    app.post('/api/activity/new',activities.apinew)
    app.get('/api/activity/new',activities.notget)
    app.get('/api/activity',activities.apiget)
    app.get('/near',activities.index)
    app.get('/last',activities.index)
}
