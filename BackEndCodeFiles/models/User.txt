const mongoose = require('mongoose');

const UserScheema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:255,
        min:5
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    password:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',UserScheema);
