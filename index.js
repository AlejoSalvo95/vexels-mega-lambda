var express = require("express");
var app = express();
var cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
require('dotenv').config();

const cloudinaryV2 = cloudinary.v2
cloudinaryV2.config({ 
	cloud_name: process.env.CLOUDINARY_NAME, 
	api_key: process.env.CLOUDINARY_KEY, 
	api_secret: process.env.CLOUDINARY_SECRET,
	secure: true
});
// parse application/x-www-form-urlencoded
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
// parse application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.get("/", (req, res, next) => {
    res.json({message: "Hola"});
});

app.post('/login',(req, res, next)=> {
    var user_name = req.body.user;
    var password = req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
});

app.post("/upload-image", async (req, res, next) => {
    try{
        const folder = 'vexels-mega';
        var {picture, email} = req.body;
        const fileName = email + new Date().getTime();
        await cloudinaryV2.uploader.upload(picture,
            { folder, public_id: fileName },
            function(error, result) {
                if(error){
                } else {
                    image = result
                }
            }
        );
        res.json({image});
    } catch (err){
        console.log(err, "err")
    }
});

app.listen(process.env.PORT || 5000, () => {
 console.log("Server running on port:", process.env.PORT || 5000);
});
