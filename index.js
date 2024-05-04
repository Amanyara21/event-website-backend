require('dotenv').config();

const express = require('express')
var cors = require('cors');
const connectToMongo = require('./config/dbConfig');
const cookieParser = require('cookie-parser');

connectToMongo();
const app = express();
const port = 5000;

app.use(cookieParser());
app.use(cors())
app.use(express.json())

// Just for testing
app.get('/',(req, res)=>{
    res.send("Hello")
})
app.use('/api', require('./routes/teamRegistrationRoute'))
app.use('/api', require('./routes/authRoute'))

 
app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`)
})