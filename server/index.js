const Express    = require('express')
const BodyParser = require('body-parser')
const server     = Express()

server.use(BodyParser.json())
server.use(Express.static('client'))
server.use(Express.static('node_modules'))

require('./api/admin.js')(server)
require('./api/clientes.js')(server)
require('./api/fornecedores.js')(server)
require('./api/newsletter.js')(server)
require('./api/produtos.js')(server)
require('./api/vendas.js')(server)

server.listen(3000, () => console.log('Server listening at http://localhost:3000'))
