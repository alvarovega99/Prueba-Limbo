const { Schema, model } = require('mongoose')

const Ventas = new Schema({
  idVenta: {
    type: Number
  },
  name: String,
  price: {
    type: Number,
    default: 0
  },
  max: String,
  date: {
    type: Number
  }
}
)
module.exports = model('Ventas', Ventas)
