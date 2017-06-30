const Express    = require('express')
const BodyParser = require('body-parser')
const server     = Express()
const fs         = require("fs")

server.use(BodyParser.json())
server.use(Express.static('client'))
server.use(Express.static('node_modules'))

const db = require('./db.connection.js')
require('./api/clientes.js')(server, db)
require('./api/fornecedores.js')(server, db)
require('./api/newsletter.js')(server, db)
require('./api/produtos.js')(server, db)
require('./api/promocoes.js')(server, db)
require('./api/vendas.js')(server, db)
require('./api/admin.js')(server, db)

server.listen(4000, () => console.log('Server listening at http://localhost:4000'))
