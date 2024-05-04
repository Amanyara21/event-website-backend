const Team = require('../models/teamModel');
const User = require('../models/authModel');
const randomstring = require('randomstring');
const bcryptjs = require('bcryptjs')

exports.createTeam = async (req, res) => {
    try {
        const { teamName, numberOfMembers, members } = req.body;

        let leadCount = 0;
        let leadMail = null;
        members.forEach((member, index) => {
            if (member.isLead) {
                leadCount++;
                leadMail = member.email;
            }
        });

        if (leadCount !== 1) {
            return res.status(400).json({ success: false, error: 'Exactly one team member should be marked as lead' });
        }

        const team = new Team({ teamName, numberOfMembers, members });
        await team.save();


        const username = `${team.teamName.toLowerCase().replace(/\s+/g, '_')}_${randomstring.generate(8)}`;
        const password = randomstring.generate(12);
        console.log(password)

        // send mail will do after okk
        // sendMail(leadMail, username, password)

        const salt = await bcryptjs.genSalt(10);
        const secPassword = await bcryptjs.hash(password, salt);

        const user = await User({ username, password: secPassword })
        await user.save()
        res.status(201).json({ success: true, data: { team, credentials: { user } } });

    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.teamName === 1) {
            res.status(400).json({ success: false, error: 'Team name is already taken.' });
        } else {
            res.status(400).json({ success: false, error: err.message });
        }
    }
};

// Send Mail Function to be implemented here

