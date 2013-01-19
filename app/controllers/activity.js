var mongoose = require('mongoose')
    , Activity = mongoose.model('Activity')
    , _ = require('underscore')
    , fs = require('fs')

exports.index = function (req, res) {
    res.render('activity/index', {
        title:'Anasayfa'
    })
}

exports.new = function (req, res) {
    res.render('activity/new', {
        title:'Yeni Aktivite', activity:new Activity({})
    })
}


exports.apiget = function (req, res) {
    Activity.find().sort({'createdAt':-1}).exec(function (err, docs) {
        if (err) res.send(err, false)
        res.send(docs)
    })
}

exports.apinew = function (req, res) {
    var activity = new Activity(req.body)
    activity.loc = req.body.geo.split(',')
    publicPath = './public/imgs/upload/';

    if (req.files && typeof req.files.pic !== 'undefined' && req.files.pic.size != 0) {
        fs.readFile(req.files.pic.path, function (err, data) {
            fs.writeFile(publicPath + req.files.pic.name, data, function (err) {
                if (err) res.send(err)
                activity.pic = publicPath.substr(8) + req.files.pic.name
                save(req, res, activity)
            })
        })
    }
    else if (req.body.file) {
        var imgName = require('crypto').randomBytes(16).toString('hex') + '.jpg'
        fs.writeFile(publicPath + imgName, req.body.file, 'base64', function (err) {
            if (err) res.send(err)
            activity.pic = publicPath.substr(8) + imgName
            save(req, res, activity)
        })

    }
    else
        save(req, res, activity)
}


save = function (req, res, activity) {
    activity.save(function (err) {
        if (err)
            res.send(err)
        else
            res.send(true)
    })
}

exports.notget = function (req, res) {
    res.send({error:{message:'This method cannot use for "get" only "post"'}})
}