const server = require('./src/app.js')
const mongoose = require('mongoose')
// Sincronizar todos los modelos a la vez
const uri = 'mongodb://localhost:27017/api'
const CronJob = require('cron').CronJob
const axios = require('axios')
const db = mongoose.connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
server.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001')
})
db.once('open', _ => {
  console.log('Conectado a la base de datos', uri)
})
db.on('error', err => {
  console.log('Error de conexión', err)
}
)

const job = new CronJob('4 * * * * *', async function () {
  const resVentas = await axios.get('http://localhost:3001/prueba/actualizarVentas')
  const resCompras = await axios.get('http://localhost:3001/prueba/actualizarCompras')
  console.log(resVentas.data)
  console.log(resCompras.data)
})
job.start()
