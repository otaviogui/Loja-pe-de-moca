/*
  CRUD DE VENDAS
*/


module.exports = (server, db) => {

  server.get('/vendas', async (req, res) => {
    res.json("retornar vendas")
  })

  server.get('/venda/:_id', async (req, res) => {
    res.json("retornar venda")
  })

  server.post('/venda', async (req, res) => {
    res.json("manter venda")
  })

  server.put('/venda', async (req, res) => {
    res.json("alterar venda")
  })

  server.delete('/venda/:_id?', async (req, res) => {
    res.json("deletar venda")
  })
}
