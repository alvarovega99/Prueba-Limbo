const server = require('./src/app.js')
// Sincronizar todos los modelos a la vez
server.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001')
})
