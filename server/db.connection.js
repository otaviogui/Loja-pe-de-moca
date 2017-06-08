const NeDB = require('nedb-promise')

const db   = new NeDB({
    filename: './data/banco.db',
    timestampData: true,
    autoload: true
})

module.exports = db