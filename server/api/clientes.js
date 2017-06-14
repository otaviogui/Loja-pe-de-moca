/*
  GERENCIAMENTO DE CLIENTES
*/
const jwt      = require('jsonwebtoken')

/*
  secret do admin - alguns endPoints só serão executados pelo admin
 */
let secret     = 'admin_secret'

module.exports = server => {
  const db = require('../db.connection.js')("clientes.db")

/**
  ROTAS RESTRITAS
 */
  server.get('/clientes/:token', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const clientes = await db.find({})
    res.json(clientes)
  })

  server.get('/cliente/:token/:_id', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter  = { _id: req.params._id }
    const cliente = await db.findOne(filter)
    if (!cliente) return res.status(404).send('Not found')
    res.json(cliente)
  })

  server.put('/cliente', async (req, res) => {
    let token = req.body.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter = { _id: req.body._id }
    const count  = await db.update(filter, req.body)
    if (count === 0) return res.status(404).send('Not found')
    const cliente = await db.findOne(filter)
    res.json(cliente)
  })

  server.delete('/cliente/:token/:_id?', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter  = { _id: req.params._id }
    const cliente = await db.findOne(filter)
    if (!cliente) return res.status(404).send('Not found')
    const count   = await db.remove(filter)
    res.json(cliente)
  })

/**
  ROTAS ACESSÍVEIS AO USUÁRIO
 */
  server.post('/cliente', async (req, res) => {
    try {
      const cliente = await db.insert(req.body)
      res.json(cliente)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

/**
    QUANDO O USUÁRIO FIZER LOGIN, SE VÁLIDO, RETORNAREI TODOS SEUS DADOS (INCLUSIVE SEU HISTÓRICO DE COMPRAS), SERA MANTIDO SESSIONSTORAGE 
 */
  server.post('/cliente/login', async (req, res) => {
    let login     = req.body.login
    let pass      = req.body.pass
    const cliente = await db.findOne({login:login})

    if( !cliente || login !== cliente.login || pass !== cliente.pass )
        res.status(401).json({error: 'Credenciais inválidas'}) 
    else
        res.json(cliente)
  })
}