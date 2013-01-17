var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var ActivitySchema = new Schema({
    title:{type:String, trim:true},
    body:{type:String, trim:true},
    user:{type:String, trim:true},
    pic:{type:String, trim:true},
    loc:{type:[Number], index:'2d'},
    createdAt:{type:Date, default:Date.now}
})

mongoose.model('Activity', ActivitySchema)





