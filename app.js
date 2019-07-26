var createError = require('http-errors');
var express = require('express');
const dotenv = require('dotenv');
var Twit = require('twit');

dotenv.config();

const sequelize = require('./config/db')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

app.get('/:tweetid', async (req, res) => {
  try {
    const dm = await sequelize.query(`SELECT * FROM jeketifess_dm.DBO.DirectMessages WHERE content_dm LIKE '${req.params.tweetid}'`)

    if (!dm[0].length) {
      res.status(400).json({
        message: 'kadit ada cuy'
      })
    } else {
      res.status(200).json(dm[0][0])
    }

  } catch (err) {
    res.status(500).json(err)
  }  
})

app.get('/sikat/:tweetid', async (req, res) => {
  try {
    T.post('statuses/destroy/:id', { id: req.params.tweetid }, function (err, data, response) {
      res.status(200).json({
        message: 'dah keapus cuyy'
      })
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
