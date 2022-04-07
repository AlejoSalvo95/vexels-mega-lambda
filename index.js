var express = require("express");
var app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res, next) => {
    res.json({message: "Hola"});
});
app.get("/names", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});
app.post('/login',(req, res, next)=> {
    console.log(req.body, "req.body")
    var user_name = req.body.user;
    var password = req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
});
app.get("/upload-image", (req, res, next) => {
    res.json({message: "Hola"});
});
app.listen(process.env.PORT || 5000, () => {
 console.log("Server running on port 3000");
});