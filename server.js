// server.js
// where your node app starts

// init project
const express = require('express');
// const { Router } = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path')
const dotEnv = require('dotenv')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const pathsDotenv = resolveApp('.env')
dotEnv.config({ path: `${pathsDotenv}` })

app.use(express.static(path.join(__dirname, 'views')))
// app.use(express.static('styles'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(session({
  secret : 'secret',
  resave : true,
  saveUninitialized: false,
  cookie : {
    maxAge : 1000 * 60 * 30, // 30minrs
  },
}))

// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const mongoDB = ("mongodb+srv://"+
  process.env.USERNAME+
  ":"
  +process.env.PASSWORD+
  "@"
  +process.env.HOST+
  "/"
  +process.env.DATABASE);
mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true, useUnifiedTopology: true});

app.use(express.json({ limit: '20mb' }))

app.all('*', async (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers
  const allowOrigin = origin || Origin || referer || Referer || '*'

  res.header('Access-Control-Allow-Origin', allowOrigin)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With', 'auth') // with token
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true') // with cookies
  res.header('X-Powered-By', 'Express')

  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

const router = require("./router");

router(app)

app.use((err, req, res, next) => {
  if (err) {
    console.log(err)
    res.status(err.code || 500).json({
      code: err.code || 500,
      msg: err.message || 'server error',
    })
  }
})




// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + process.env.PORT);
});
