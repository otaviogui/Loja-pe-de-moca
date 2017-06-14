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
  const db = require('../db.connection.js')("admin.db")


  server.get("/admin", async (req, res) => 
  {
    fs.readFile( 'client/admin.html', (err, data) => res.end(data))
  })


  server.post("/admin", async (req, res) => 
  {
    let token = req.body.token
    await jwt.verify(token, secret, (err, data) =>{if(err)return res.status(401).send('Unauthorized')})
    
    res.json( {'dados':'<p>dados para carregar no admin</p>'} )
  })



  server.post('/admin/login', async (req, res) => 
  {
    let login   = req.body.login
    let pass    = req.body.pass
    const admin = await db.findOne({login:login})

    if( !admin || login !== admin.login || pass !== admin.pass )
        res.status(401).json({error: 'Credenciais inválidas'}) 
    else
        res.json({ token: jwt.sign({ user_id: admin._id}, secret)  })
  })



  server.put('/admin', async (req, res) => 
  {
    const filter    = { _id: req.body._id }
    const count     = await db.update(filter, req.body)
    if (count === 0)  return res.status(404).send('Not found')
    const admin     = await db.findOne(filter)
    res.json(admin)
  })
  
}