/*
  GERENCIA NEWSLETTER
*/

module.exports = (server, db) => {

  server.get('/newsletter', async (req, res) => {
    res.json("retornar todos newsletter")
  })

  server.get('/newsletter/:_id', async (req, res) => {
    res.json("retornar newsletter")
  })

  server.post('/newsletter', async (req, res) => {
    res.json("manter newsletter")
  })

  server.post('/newsletter/send', async (req, res) => {
    res.json("disparar newsletter")
  })

  server.delete('/newsletter/:_id?', async (req, res) => {
    res.json("deleter newsletter")
  })
}
