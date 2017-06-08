/*
  CRUD DE PRODUTOS
*/

module.exports = (server, db) => {

  server.get('/produtos', async (req, res) => {
    res.json("alterar produto")
  })

  server.get('/produto/:_id', async (req, res) => {
    res.json("retornar produtos")
  })

  server.post('/produto', async (req, res) => {
    res.json("manter produto")
  })

  server.put('/produto', async (req, res) => {
    res.json("alterar produto")
  })

  server.delete('/produto/:_id?', async (req, res) => {
    res.json("apagar produto")
  })
}
