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

  server.post('/newsletter/send', async (req, res) =>{
    const nodemailer  = require('nodemailer')
    const newsletters = await db.find({})
    const assunto     = req.body.assunto
    const mensagem    = req.body.mensagem

    if(!assunto || !mensagem)return res.status(404).send('Falta assunto ou mensagem no email')

    const conta = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
          user: 'email@gmail.com',
          pass: ''
      }
    })

    let listaEmails = []
    for( let e of newsletters )listaEmails.push(e.email)

    let mailOptions = {
        from: 'pedemoca@gmail.com',
        to: listaEmails.join(),
        subject: assunto,
        html: mensagem
    }

    conta.sendMail(mailOptions, (error, info) => {
        if (error) res.json( {"err":error} )
        res.json( {"lista":listaEmails.join()} )
    })

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
