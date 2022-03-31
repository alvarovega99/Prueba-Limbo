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
    type: Date,
    default: Date.now
  }
}
)
module.exports = model('Compras', Compras)
