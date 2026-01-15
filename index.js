var express = require("express");
var bodypaser = require("body-parser");
var session = require("express-session");
var upload = require("express-fileupload");

var user_route = require("./routes/user_route");
var admin_route = require("./routes/admin_route");
 //var login_route = require("./routes/login_route");
 



var app = express();


app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodypaser.urlencoded({extended:true}));
app.use(express.static('public/'));
app.use(upload());
app.use(session({
    secret:'abcdxyz',
    resave:true,
    saveUninitialized:true
}));

app.use("/", user_route);
app.use("/admin", admin_route);



app.listen(1000);

