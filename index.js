const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const cors = require('cors');

const auth = require('./routes/auth');

// ENV
dotenv.config({ path: 'config.env' });

// DB
connectDB();

const app = express();

var corsOption = {
    origin: process.env.CORS,
    optionSuccessStatus: 200
};

app.use(cors(corsOption));

// Body Parser
app.use(express.json());

// Mount Routers
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening to ${PORT} `)
})