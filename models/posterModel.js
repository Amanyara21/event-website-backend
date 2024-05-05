const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    link:{
        type:String,
        required:true
    },
});

const Poster = mongoose.model('Poster',posterSchema)
module.exports = Poster
