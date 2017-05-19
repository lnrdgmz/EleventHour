// load .env file
require('dotenv').config();

// create express app
const express = require('express');

const app = express();

require('./config/auth')(app);

// connect to database

// require middleware
require('./config/middleware')(app, express);

// start server
app.listen(process.env.PORT || 8000)
