/*
  CONFIGURAÇÕES DO ADMIN
*/
const fs       = require("fs")
const jwt      = require('jsonwebtoken')

/*
  secret do admin - alguns endPoints só serão executados pelo admin
 */
let secret     = 'admin_secret'

module.exports = server => {
  const db = require('../db.connection.js')("novidadepromocao.db")

  server.get("/novidadepromocao", async (req, res) => 
  {
    const novidadepromocao = await db.find({})
    res.json(novidadepromocao)
  })


  server.post('/novidadepromocao', async (req, res) => 
  {
    let token = req.body.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).end('Not found')})

    try {
      const count            = await db.remove({})
      const novidadepromocao = await db.insert(req.body)
      res.json(novidadepromocao)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })


  server.put('/novidadepromocao', async (req, res) => 
  {
    let token = req.body.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter = { _id: req.body._id }
    const count  = await db.update(filter, req.body)
    if (count === 0) return res.status(404).send('Not found')
    const novidadepromocao = await db.findOne(filter)
    res.json(novidadepromocao)
  })
  

  server.delete('/novidadepromocao/:token', async (req, res) => 
  {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const count  = await db.remove({})
    if (count === 0) return res.status(404).send('Not found')
    else res.status(200).send(count)
    
  })
}