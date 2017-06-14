const NeDB = require('nedb-promise')

module.exports = (banco) => 
{
    const db   = new NeDB({
        filename: './data/'+banco,
        timestampData: true,
        autoload: true
    })
    return db
}
