const express = require('express')
const router = express.Router()
const axios = require('axios')
const ccxt = require('ccxt')
// eslint-disable-next-line new-cap
const kraken = new ccxt.kraken()
const Compras = require('../models/Compras')
const Ventas = require('../models/Ventas')
router.get('/actualizarVentas', async (req, res) => {
  const precioUsd = await kraken.fetchTicker('BTC/USD')
  const data = Math.round(new Date().getTime() / 1000).toString()
  try {
    const ventas = await axios.get('https://localbitcoins.com/sell-bitcoins-online/cop/.json')
    ventas.data.data.ad_list.map(async (venta) => {
      const obj = new Ventas({
        idVenta: venta.data.ad_id,
        name: venta.data.profile.username,
        price: venta.data.temp_price / precioUsd.bid,
        max: new Intl.NumberFormat('de-DE').format(venta.data.max_amount),
        date: data
      })
      obj.save()
      return obj
    })

    res.status(200).json('Ventas actualizadas')
  } catch (err) {
    res.send(err.message)
  }
})

router.get('/actualizarCompras', async (req, res) => {
  const precioUsd = await kraken.fetchTicker('BTC/USD')
  /*   function toTimestamp (strDate) {
    const datum = Date.parse(strDate)
    return datum / 1000
  } */
  const data = Math.round(new Date().getTime() / 1000).toString()
  try {
    const compras = await axios.get('https://localbitcoins.com/buy-bitcoins-online/cop/.json')
    /* const comprasCop = compras.data.data.ad_list.filter(compra => compra.data.currency === 'COP') */
    compras.data.data.ad_list.map(async (compra) => {
      const obj = new Compras({
        idCompra: compra.data.ad_id,
        name: compra.data.profile.username,
        price: compra.data.temp_price / precioUsd.bid,
        max: new Intl.NumberFormat('de-DE').format(compra.data.max_amount),
        date: data
      })
      obj.save()
      return obj
    })

    res.status(200).json('Compras actualizadas')
  } catch (err) {
    res.send(err.message)
  }
})
router.get('/ventas', async (req, res) => {
  const fecha = await Ventas.find().sort({ date: -1 }).limit(1)
  // traer el primer elemento
  try {
    const ventas = await Ventas.find({ date: fecha[0].date })
    res.status(200).json({
      ventas
    })
  } catch (error) {
    res.status(500).send({
      error
    })
  }
})
router.get('/compras', async (req, res) => {
  const fecha = await Compras.find().sort({ date: -1 }).limit(1)
  try {
    const compras = await Compras.find({ date: fecha[0].date })
    res.status(200).json({
      compras
    })
  } catch (error) {
    res.status(500).send({
      error
    })
  }
})

module.exports = router
