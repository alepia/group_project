const Pool = require("pg").Pool;

const pool = new Pool({
user: "bishnu",
host: "localhost",
database: "edatabase",
password: "",
port: 5432
})

module.exports = pool;