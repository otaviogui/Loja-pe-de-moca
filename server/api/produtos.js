/*
  CRUD DE PRODUTOS
*/
const jwt      = require('jsonwebtoken')

/*
  secret do admin - alguns endPoints só serão executados pelo admin
 */
let secret     = 'admin_secret'


module.exports = server => {
  const db = require('../db.connection.js')("produtos.db")


/**
  ROTAS RESTRITAS
 */
  server.post('/produto', async (req, res) => {
    let token = req.body.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    try {
      const produto = await db.insert(req.body)
      res.json(produto)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

  server.put('/produto', async (req, res) => {
    let token = req.body.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter    = { _id: req.body._id }
    const count     = await db.update(filter, req.body)
    if (count === 0)  return res.status(404).send('Not found')
    const produto   = await db.findOne(filter)
    res.json(produto)
  })

  server.delete('/produto/:token/:_id?', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter  = { _id: req.params._id}
    const produto = await db.findOne(filter)
    if (!produto)   return res.status(404).send('Not found')
    const count   = await db.remove(filter)
    res.json(produto)
  })




/**
  ROTAS ACESSÍVEIS AO USUÁRIO
 */
  server.get('/produtos', async (req, res) => {
    const produtos = await db.find({})
    res.json(produtos)
  })

  server.get('/produto/:_id', async (req, res) => {
    const filter    = { _id: req.params._id }
    const produtos  = await db.findOne(filter)
    if (!produtos)    return res.status(404).send('Not found')
    res.json(produtos)
  })


}
