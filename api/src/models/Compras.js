const { Schema, model } = require('mongoose')

const Compras = new Schema({
  idCompra: {
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
module.exports = model('Compras', Compras)
