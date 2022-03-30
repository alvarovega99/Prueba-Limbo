const express = require('express')
const router = express.Router()
const ccxt = require('ccxt')
const axios = require('axios')
const kraken = new ccxt.kraken()

router.get('/ventas', async (req, res) => {
  const precioUsd = await kraken.fetchTicker('BTC/USD')
  console.log(precioUsd.bid)
  try {
    const ventas = await axios.get('https://localbitcoins.com/buy-bitcoins-online/CO/{country_name=COLOMBIA}/.json')
    const ventasCop = ventas.data.data.ad_list.filter(venta => venta.data.currency === 'COP')
    const ventasMostrar = ventasCop.map(venta => {
      const obj = {
        name: venta.data.profile.username,
        precio: venta.data.temp_price / precioUsd.bid,
        max:new Intl.NumberFormat('de-DE').format(venta.data.max_amount)
      }
      return obj
    })
    res.json(ventasMostrar)
  } catch (err) {
    res.send(err.message)
  }
})
router.get('/compras', async (req, res) => {
  const precioUsd = await kraken.fetchTicker('BTC/USD')
  try {
    const compras = await axios.get('https://localbitcoins.com/sell-bitcoins-online/CO/{country_name=COLOMBIA}/.json')
    const comprasCop = compras.data.data.ad_list.filter(compra => compra.data.currency === 'COP')
    const comprasMostrar = comprasCop.map(compra => {
      const obj = {
        name: compra.data.profile.username,
        precio: compra.data.temp_price / precioUsd.bid,
        max:new Intl.NumberFormat('de-DE').format(compra.data.max_amount)
      }
      return obj
    })
    res.json(comprasMostrar)
  } catch (err) {
    res.send(err.message)
  }
})
module.exports = router
