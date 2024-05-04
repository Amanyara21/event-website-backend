const mongoose = require('mongoose');
const TeamMember = require('./teamMemberModel');


const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        unique: true 
    },
    numberOfMembers: {
        type: Number,
        required: true
    },
    members: {
        type: [TeamMember.schema], 
        validate: {
            validator: function(v) {
                return v.length === this.numberOfMembers;
            },
            message: 'Number of team members should match numberOfMembers'
        }
    }
});


const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
