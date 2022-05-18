const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const router = express.Router();

app.set('view engine','hbs')



const url = "mongodb://localhost:27017/plantdb";

mongoose
  .connect(url)
  .then(function () {
    console.log("Connection to DB successful");
  })
  .catch(function (err) {
    console.log("there was an error");
  });

app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, "public")));

app
  .route("/login")
  .get(function (req, res) {
    res.render("login");
  })
  .post(function (req, res) {

    console.log(req.body.username)
    if(req.body.username){
       
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    var user = new users({
      username: username,
      email: email,
      password: password,
    });
    user.save(function (err, user) {
      if (err) {
        console.log("error ", err);
      } else {
        console.log(username);
      }

      res.redirect("/login");
    });
}
else{
    
    const loginemail = req.body.loginemail;
    const loginpassword = req.body.loginpassword;
 
    users.findOne({ email: loginemail }, function (err, user) {
      if (err) {
        console.log("error");
     
      }
      if (user) {
      
        if (user.password == loginpassword) {
       
          res.redirect("/");
        } else {
          return res.json({ error: "user does not exist" });
        }
      } else {
        console.log("invalid credentials");
      }
    });}
  });


  


app.get("/", function (req, res) {
  res.render("index");
});


app.get('/products',(req,res)=>{
    res.render('prodcuts');
});

app.get('/cart',(req,res)=>{
    res.render('cart');
})

app.get('/productdetails',(req,res)=>{
    res.render('productDetails');
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});






const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,    
    required: true,
  },
});


const users = mongoose.model("User", userSchema);


app.listen(3000, function () {
  console.log("listening on port 3000");
});

