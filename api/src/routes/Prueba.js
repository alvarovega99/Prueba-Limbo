const express = require('express')
const router = express.Router()
const axios = require('axios')
const ccxt = require('ccxt')
const kraken = new ccxt.kraken()
router.get('/ventas', async (req, res) => {
  const precioUsd = await kraken.fetchTicker('BTC/USD')
  try {
    const ventas = await axios.get('https://localbitcoins.com/sell-bitcoins-online/cop/.json')
    const ventasMostrar = ventas.data.data.ad_list.map(venta => {
      const obj = {
        name: venta.data.profile.username,
        precio: venta.data.temp_price / precioUsd.bid,
        max: new Intl.NumberFormat('de-DE').format(venta.data.max_amount)
      }
      return obj
    })
    res.status(200).json(ventasMostrar)
  } catch (err) {
    res.send(err.message)
  }
})
router.get('/compras', async (req, res) => {
  const precioUsd = await kraken.fetchTicker('BTC/USD')
  try {
    const compras = await axios.get('https://localbitcoins.com/buy-bitcoins-online/cop/.json')
    /* const comprasCop = compras.data.data.ad_list.filter(compra => compra.data.currency === 'COP') */
    const comprasMostrar = compras.data.data.ad_list.map(compra => {
      const obj = {
        name: compra.data.profile.username,
        precio: compra.data.temp_price / precioUsd.bid,
        max: new Intl.NumberFormat('de-DE').format(compra.data.max_amount)
      }
      return obj
    })
    res.status(200).json(comprasMostrar)
  } catch (err) {
    res.send(err.message)
  }
})
module.exports = router
