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

  server.delete('/venda/:token/:_id?', async (req, res) => {
    let token = req.params.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    const filter     = { _id: req.params._id}
    const venda      = await db.findOne(filter)
    if (!venda)        return res.status(404).send('Not found')
    const count      = await db.remove(filter)
    res.json(venda)
  })


/**
  ROTAS ACESSÍVEIS AO USUÁRIO
 */
  server.post('/venda', async (req, res) => {
    const DATABASEPRODUTO = require('../db.connection.js')("produtos.db")
    let VENDA     = req.body
    VENDA.lucro   = 0 
    VENDA.valor   = 0 
    let itemOld
    let preco 

    //Percorrendo os produtos e atualizando quantidade no banco
    for(let produto of VENDA.itens_vendidos )
    {
      itemOld       = await DATABASEPRODUTO.findOne({_id: produto._id})
      itemOld.quantidade = (itemOld.quantidade - produto.quantidade)
      await DATABASEPRODUTO.update({_id: produto._id }, itemOld)
      
      preco = produto.promocao.status === true ? produto.promocao.oferta : produto.preco_venda

      VENDA.lucro  += parseFloat( (preco - produto.preco_compra) * produto.quantidade )
      VENDA.valor  += parseFloat( preco * produto.quantidade )
    }

    try {
      res.json( await db.insert({VENDA}) )
    } catch (err) {
      res.status(500).send(err.message)
    }
  })
}
