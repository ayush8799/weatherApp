var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
var routes=require("./api/routes/index");
app.use(routes);

app.listen(process.env.PORT || 8080,function(){
    console.log("running on port 8080")
})