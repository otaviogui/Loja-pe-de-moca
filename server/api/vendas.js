/*
  CRUD DE VENDAS
*/

const jwt      = require('jsonwebtoken')

/*
  secret do admin - alguns endPoints só serão executados pelo admin
 */
let secret     = 'admin_secret'



module.exports = (server) => {
  const db = require('../db.connection.js')("vendas.db")

  server.get('/vendas/:token', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const vendas = await db.find({})
    res.json(vendas)
  })

  server.get('/venda/:token/:_id', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter    = { _id: req.params._id }
    const venda     = await db.findOne(filter)
    if (!venda)      return res.status(404).send('Not found')
    res.json(venda)
  })

  server.post('/venda', async (req, res) => {

    /**
      Pegar os produtos que chegarem aqui e atualizar a quantidade que esta saindo do estoque
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSlBFSzJlajBjaFhDS2NERCIsImlhdCI6MTQ5NzA3MDg1NX0.7vAmmVZm7A78fKoBN4P_pR3GZcMZ_nbiTjWwhhbwfnk'
     */

    try {
      const venda = await db.insert(req.body)
      res.json(venda)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

  server.delete('/venda/:token/:_id?', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter     = { _id: req.params._id}
    const venda      = await db.findOne(filter)
    if (!venda)        return res.status(404).send('Not found')
    const count      = await db.remove(filter)
    res.json(venda)
  })
}
