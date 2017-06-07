/*
  CONFIGURAÇÕES DO ADMIN
*/


module.exports = server => {
  const NeDB = require('nedb-promise')

  server.get("/admin", (req, resp) => {
      resp.send("PAINEL ADMINISTRATIVO")
  })

  server.get('/admin/login', async (req, res) => {
    res.json("validar login")
  })

  server.post('/admin/loggout', async (req, res) => {
    res.json("fazer loggout")
  })

  server.put('/admin/pass', async (req, res) => {
    res.json("alterar login e pass")
  })
}
