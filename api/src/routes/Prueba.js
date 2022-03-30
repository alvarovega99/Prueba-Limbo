const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.send('hola mundo')
  } catch (err) {
    res.send(err.message)
  }
})
module.exports = router
