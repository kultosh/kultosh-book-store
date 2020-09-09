const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const env = require('dotenv').config();

const app = express();

const indexRouter = require('./routes/indexRouter');

// view setup
app.use(expressLayouts);
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.set('view engine', 'ejs');

// database setup
mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


// routes
app.use(indexRouter);