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
  try {
    const ventas = await axios.get('https://localbitcoins.com/sell-bitcoins-online/cop/.json')
    ventas.data.data.ad_list.map(async (venta) => {
      const validar = await Ventas.find({ idVenta: venta.data.ad_id })
      if (validar.length === 0) {
        const obj = new Ventas({
          idVenta: venta.data.ad_id,
          name: venta.data.profile.username,
          price: venta.data.temp_price / precioUsd.bid,
          max: new Intl.NumberFormat('de-DE').format(venta.data.max_amount)
        })
        obj.save()
        return obj
      } else {
        return venta
      }
    })

    res.status(200).json('Ventas actualizadas')
  } catch (err) {
    res.send(err.message)
  }
})

router.get('/actualizarCompras', async (req, res) => {
  const precioUsd = await kraken.fetchTicker('BTC/USD')
  try {
    const compras = await axios.get('https://localbitcoins.com/buy-bitcoins-online/cop/.json')
    /* const comprasCop = compras.data.data.ad_list.filter(compra => compra.data.currency === 'COP') */
    compras.data.data.ad_list.map(async (compra) => {
      const validar = await Compras.find({ idCompra: compra.data.ad_id })

      if (validar.length === 0) {
        const obj = new Compras({
          idCompra: compra.data.ad_id,
          name: compra.data.profile.username,
          price: compra.data.temp_price / precioUsd.bid,
          max: new Intl.NumberFormat('de-DE').format(compra.data.max_amount)
        })
        obj.save()
        return obj
      } else {
        return compra
      }
    })

    res.status(200).json('Compras actualizadas')
  } catch (err) {
    res.send(err.message)
  }
})
router.get('/ventas', async (req, res) => {
  try {
    const ventas = await Ventas.find()
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
  try {
    const compras = await Compras.find()
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
