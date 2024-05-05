const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    file:{
        type:String,
        required:true
    },
});

const File = mongoose.model('File',fileSchema)
module.exports = File
