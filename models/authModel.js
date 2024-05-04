const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const Auth = mongoose.model('auth',authSchema)
module.exports = Auth
