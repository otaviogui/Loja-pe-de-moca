/*
  CRUD DE CLIENTE
*/


module.exports = (server, db) => {

  server.get('/test', async (req, res) => {
      const clientes = await db.find({})
      res.json(clientes)
  })


//CRUD
  server.get('/clientes', async (req, res) => {
    res.json("retornar clientes")
  })

  server.get('/cliente/:_id', async (req, res) => {
    res.json("retornar cliente")
  })

  server.post('/cliente', async (req, res) => {
    res.json("manter cliente")
  })

  server.put('/cliente', async (req, res) => {
    res.json("alterar cliente")
  })

  server.delete('/cliente/:_id?', async (req, res) => {
    res.json("deletar cliente")
  })


//LOGIN
  server.get('/cliente/login', async (req, res) => {
    res.json("validar login")
  })

  server.post('/cliente/loggout', async (req, res) => {
    res.json("fazer loggout")
  })

  server.put('/cliente/pass', async (req, res) => {
    res.json("alterar login e pass")
  })
}
