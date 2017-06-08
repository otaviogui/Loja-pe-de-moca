/*
  CRUD DE FORNECEDOR
*/


module.exports = (server, db) => {

  server.get('/fornecedores', async (req, res) => {
    res.json("retornar fornecedores")
  })

  server.get('/fornecedor/:_id', async (req, res) => {
    res.json("retornar fornecedor")
  })

  server.post('/fornecedor', async (req, res) => {
    res.json("manter fornecedor")
  })

  server.put('/fornecedor', async (req, res) => {
    res.json("alterar fornecedor")
  })

  server.delete('/fornecedor/:_id?', async (req, res) => {
    res.json("deletar fornecedor")
  })
}
