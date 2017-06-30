const Express    = require('express')
const BodyParser = require('body-parser')
const server     = Express()
const fs         = require("fs")
const request    = require("request")

server.use(BodyParser.json())
server.use(Express.static('client'))
server.use(Express.static('node_modules'))

require('./api/admin.js')(server)
require('./api/clientes.js')(server)
require('./api/fornecedores.js')(server)
require('./api/newsletter.js')(server)
require('./api/novidadepromocao.js')(server)
require('./api/produtos.js')(server)
require('./api/vendas.js')(server)

server.get("/soriano", (req, res) =>{
    const id_produto = "wwCfBffCGHo8CIsT"

    request(`http://localhost:3000/produto/${id_produto}`, (err, resp, body) =>{
        if (err) return res.status(404).send('Not found')
        res.json( JSON.parse(resp.body) )
    })
})

server.listen(3000, () => console.log('Server listening at http://localhost:3000'))
