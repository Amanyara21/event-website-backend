const Poster = require('../models/posterModel');
const File = require('../models/fileModel');


// For Files
exports.createFile = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const { title, file } = req.body;
            const newFile = await File.create({ title, file });
            res.status(201).json(newFile);
        } else {
            res.status(401).json({ error: 'Please authenticate using a valid token' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getFileById = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (file) {
            res.json(file);
        } else {
            res.status(404).json({ message: 'File not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.deleteFileById = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const id = req.params.id
            const file = await File.findOneAndDelete(id);
            res.json({ message: 'File deleted' });
        } else {
            res.status(401).json({ error: 'Please authenticate using a valid token' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




// For posters
exports.createPoster = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const { image, link } = req.body;
            const newPoster = await Poster.create({ image, link });
            res.status(201).json(newPoster);
        } else {
            res.status(401).json({ error: 'Please authenticate using a valid token' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllPosters = async (req, res) => {
    try {
        const posters = await Poster.find();
        res.json(posters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getPosterById = async (req, res) => {
    try {
        const poster = await Poster.findById(req.params.id);
        if (poster) {
            res.json(poster);
        } else {
            res.status(404).json({ message: 'Poster not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.deletePosterById = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const id = req.params.id
            const poster = await Poster.findOneAndDelete(id);
            res.json({ message: 'Poster deleted' });
        } else {
            res.status(401).json({ error: 'Please authenticate using a valid token' });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

