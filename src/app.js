const express = require('express')
const http = require('http')
const router = require('./router')

const app = express()
const PORT = 4000


const server = http.createServer(app)

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('dist'))

app.all('*', async (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers
  const allowOrigin = origin || Origin || referer || Referer || '*'

  res.header('Access-Control-Allow-Origin', allowOrigin)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Authentication')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true') // with cookies
  res.header('X-Powered-By', 'Express')

  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// 设置路由
router(app)

// catch exception and log out error message
app.use((err, req, res, next) => {
  if (err) {
    const status = err.code ? 200 : 500
    res.status(status).json({
      code: err.code || 500,
      msg: err.msg || 'Bad Request',
    })
  }
})

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`INFSCI2560 Server Started on port ${PORT}!`)
})