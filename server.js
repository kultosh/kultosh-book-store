if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const app = express();



// Router
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authorRoutes');
const bookRouter = require('./routes/bookRoutes');


// view setup
app.use(expressLayouts);
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: false
}));



// database setup
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))



// routes
app.use(indexRouter);
app.use('/author', authorRouter);
app.use('/book', bookRouter);

app.listen(process.env.PORT || 3000)