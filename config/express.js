var express = require('express')
    , mongoStore = require('connect-mongo')(express)
    , flash = require('connect-flash')

module.exports = function (app, config) {
    app.set('showStackError', true)
    app.use(express.compress({
        filter:function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level:9
    }))
    app.use(express.static(config.root + '/public'))
    app.use(express.logger('dev'))
    app.set('views', config.root + '/app/views')
    app.set('view engine', 'jade')

    app.configure(function () {
        app.use(express.cookieParser ())
        app.use(express.bodyParser())
        app.use(express.methodOverride())
        app.use(express.session({
            secret:'gdgistanbul',
            store:new mongoStore({
                url:config.db,
                collection:'sessions'
            })
        }))
        app.use(flash())
        app.use(express.favicon())
        app.use(app.router)
        app.use(function (err, req, res, next) {
            if (~err.message.indexOf('not found')) return next()
            console.error(err.stack)
            res.status(500).render('500', { error:err.stack })
        })
        app.use(function (req, res, next) {
            res.status(404).render('404', { url:req.originalUrl })
        })
    })
}