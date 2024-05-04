const User = require('../models/authModel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(username)
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ sucess: false, 'error': "User not Found" });
        }
        const passwordCompare = await bcryptjs.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ sucess: false, 'error': "Wrong Credentials" });
        }
        const token = jwt.sign({id:user._id}, process.env.MY_SECRET, { expiresIn: '7d' });
        await res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ sucess: true, msg: "Login successful" })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal Server Error Occured");
        console.log(error.message);
    }
}

