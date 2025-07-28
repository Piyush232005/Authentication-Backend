const express = require('express');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
// post/auth/register
// post/auth/login
// post/auth/logout
// post/auth/user

app.use('/auth',authRoutes);

module.exports = app;