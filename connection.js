var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    host: "blwkncl5qtrxudus3obt-mysql.services.clever-cloud.com",
    user: "ubz56qok9icxw5mf",
    password: "jnDNiubNCtU7ZxpIgRgP",
    database: "blwkncl5qtrxudus3obt"
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;
