const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    isLead: {
        type: Boolean,
        default: false
    }
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
module.exports = TeamMember 