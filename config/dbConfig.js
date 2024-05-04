const mongoose = require("mongoose");

const MongoConnection = () => {
    const dbURI = process.env.MONGODB_URI;
    
    mongoose.connect(dbURI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
        });
}

module.exports = MongoConnection;
