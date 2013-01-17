module.exports = {
    development:{
        root: require('path').normalize(__dirname + '/..'),
        app: {
            name: 'GDG İstanbul'
        },
        db:'mongodb://127.0.0.1/gdg'
    }, test:{

    }, production:{

    }
}
