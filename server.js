var express = require('express')
    , fs = require('fs')

require('express-namespace')

var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config')[env]
    , mongoose = require('mongoose')

mongoose.connect(config.db, {safe:true})

var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path+'/'+file)
})

var app = express()
require('./config/express')(app, config)
require('./config/routes')(app)

var port = process.env.PORT || 3001
app.listen(port)
console.log('GDG İstanbul is burning now ' + port)