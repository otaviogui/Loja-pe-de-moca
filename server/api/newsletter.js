/*
  GERENCIA NEWSLETTER
*/
const jwt      = require('jsonwebtoken')

/*
  secret do admin - alguns endPoints só serão executados pelo admin
 */
let secret     = 'admin_secret'

module.exports = (server) => {
  const db = require('../db.connection.js')("newsletter.db")

/**
  ROTAS RESTRITAS
 */
  server.get('/newsletter/:token', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const newsletter = await db.find({})
    res.json(newsletter)
  })

  server.get('/newsletter/:token/:_id', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter      = { _id: req.params._id }
    const newsletter  = await db.findOne(filter)
    if (!newsletter)    return res.status(404).send('Not found')
    res.json(newsletter)
  })

  server.delete('/newsletter/:token/:_id?', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter     = { _id: req.params._id}
    const newsletter = await db.findOne(filter)
    if (!newsletter)   return res.status(404).send('Not found')
    const count      = await db.remove(filter)
    res.json(newsletter)
  })

  server.post('/newsletter/send', async (req, res) => {
    res.json("ENVIAR E-MAILS NEWSLETTER")
  })


/**
  ROTAS ACESSÍVEIS AO USUÁRIO
 */
  server.post('/newsletter', async (req, res) => {
    try {
      const newsletter = await db.insert(req.body)
      res.json(newsletter)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })
}
