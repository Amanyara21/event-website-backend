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
    },
    team:{
        type:mongoose.Schema.ObjectId,
        ref:'Team'
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

const Auth = mongoose.model('User',authSchema)
module.exports = Auth
