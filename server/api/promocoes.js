/*
  GERENCIA PRODUTOS EM PROMOÇÃO
*/

module.exports = (server, db) => {

  server.get("/codPromocional/:cod", (req, resp) => {
      resp.send("CÓDIGO INFORMADO: " + req.params.cod )
  })

  server.get('/promocoes', async (req, res) => {
    res.json("retornar promocoes")
  })

  server.get('/promocao/:_id', async (req, res) => {
    res.json("retornar promoção")
  })

  server.post('/promocao', async (req, res) => {
    res.json("manter promoção")
  })

  server.put('/promocao', async (req, res) => {
    res.json("alterar promoção")
  })

  server.delete('/promocao/:_id?', async (req, res) => {
    res.json("deletar promoção")
  })
}
