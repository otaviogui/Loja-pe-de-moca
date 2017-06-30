/*
  CRUD DE PRODUTOS
*/
const jwt      = require('jsonwebtoken')
const multer   = require('multer')

/*
  secret do admin - alguns endPoints só serão executados pelo admin
 */
let secret     = 'admin_secret'


/*
  Configuração necessário para cópia da imagem e alteração no nome
 */
var storage    = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './client/upload')
  },
  filename: function (req, file, cb) {
  let ext = file.originalname.substr( file.originalname.lastIndexOf('.') + 1 ) 
    cb(null, file.fieldname + '-' + Date.now() +'.'+ext)
  }
})
var upload = multer({ storage: storage })

module.exports = server => {
  const db = require('../db.connection.js')("produtos.db")

/**
  ROTAS RESTRITAS
 */
  server.post('/produto', upload.single('imagem'), async (req, res) => {
    let token = req.body.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    let dados = req.body
    if( !!req.file ) dados.img = req.file.filename

    try {
      const produto = await db.insert(dados)
      res.json(produto)
    } catch (err) {
      res.status(500).send(err.message)
    }

  })


  server.put('/produto', upload.single('imagem'), async (req, res) => {
    let token = req.body.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(404).send('Not found')})

    let dados = req.body
    if( !!req.file ) dados.img = req.file.filename

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

    //excluir a imagem no diretório

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


  server.get('/marcasmodelosfornecedores', async (req, res) =>{
    const produtos   = await db.find({})
    let marcas       = []
    let modelos      = []

    const DATABASEFORNECEDORES = require('../db.connection.js')("fornecedores.db")
    const arrfornecedores      = await DATABASEFORNECEDORES.find({})

    for(let p of produtos )
    {
      modelos.push( p.modelo )
      marcas.push( p.marca )
    }

    let arrModelos      = modelos.filter( (este, i) =>{return modelos.indexOf(este) == i})
    let arrMarcas       = marcas.filter(  (este, i) =>{return marcas.indexOf(este)  == i})
    res.json( {"marcas":arrMarcas, "modelos":arrModelos, "fornecedores":arrfornecedores} )
  })

}
