var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    host: "ba4qwbjvesfhhyumzzbj-mysql.services.clever-cloud.com",
    user: "ba4qwbjvesfhhyumzzbj",
    password: "j14QCHsitVk12tHzeMjw",
    database: "utyqbsxw6erwnqop"
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;
