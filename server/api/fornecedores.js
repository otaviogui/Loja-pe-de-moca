/*
  CRUD DE FORNECEDOR
*/
const jwt      = require('jsonwebtoken')

/*
  secret do admin - alguns endPoints só serão executados pelo admin
 */
let secret     = 'admin_secret'


module.exports = (server) => {
  const db = require('../db.connection.js')("fornecedores.db") 


/**
  ROTAS RESTRITAS
 */
  server.get('/fornecedores/:token', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const fornecedores = await db.find({})
    res.json(fornecedores)
  })

  server.get('/fornecedor/:token/:_id', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter       = { _id: req.params._id }
    const fornecedor   = await db.findOne(filter)
    if (!fornecedor)     return res.status(404).send('Not found')
    res.json(fornecedor)
  })

  server.post('/fornecedor', async (req, res) => {
    let token = req.body.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    try {
      const fornecedor = await db.insert(req.body)
      res.json(fornecedor)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

  server.put('/fornecedor', async (req, res) => {
    let token = req.body.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter       = { _id: req.body._id }
    const count        = await db.update(filter, req.body)
    if (count === 0)     return res.status(404).send('Not found')
    const fornecedor   = await db.findOne(filter)
    res.json(fornecedor)
  })

  server.delete('/fornecedor/:token/:_id?', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter     = { _id: req.params._id}
    const fornecedor = await db.findOne(filter)
    if (!fornecedor)   return res.status(404).send('Not found')
    const count      = await db.remove(filter)
    res.json(fornecedor)
  })
}
