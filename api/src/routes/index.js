const { Router } = require('express')
const prueba = require('./Prueba')
const router = Router()
router.use('/prueba', prueba)
module.exports = router
