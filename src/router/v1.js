const { Router } = require('express')
const NoRoute = require('./NoRoute')

const router = Router()

// 账号与用户
// router.post('/login', AuthValidator.checkLogin, AuthController.login)
router.post('/login', (req, res, next) => { res.json({ code: 200, msg: 'login' })})

router.all('*', NoRoute)

module.exports = router