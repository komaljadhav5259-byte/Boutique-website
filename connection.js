var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    host: "bhd3cwuw3v3bm590pylw-mysql.services.clever-cloud.com",
    user: "upsgdteqbtwvfmrj",
    password: "lU39qnJFdQnh7EPB8lpV",
    database: "bhd3cwuw3v3bm590pylw"
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;
