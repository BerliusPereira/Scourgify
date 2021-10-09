const express = require('express');
const bodyParser = require("body-parser");
// const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const User = require('./model/User');
const Upload = require('./model/Upload');
const bcrypt = require('bcryptjs');
const { getMaxListeners } = require('./model/User');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));

var db;


// MongoClient.connect('mongodb+srv://Scourgifytest:Scourgifytest123@cluster0.5wjme.mongodb.net/Cluster0?retryWrites=true&w=majority', function (err, database) {
//     if(err) return console.log(err);net/tes
//     db = database;
//     app.listen(3000, function(){
//         console.log('listening to port 3000');
//     });   
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://Scourgifytest:Scourgifytest123@cluster0.5wjme.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true }, () => {console.log('DB connected...')});
app.get('/', function (req, res) {
   // res.send('This is a Get');
//    res.sendFile(__dirname + '/Mmain.html');
    res.render('Mmain')
});

app.get('/Mlog', function (req,res){
    res.render('Mlog');
});
app.get('/MCushome', function (req,res){

    res.render('MCushome');
});

app.get('/Mupload', function(req, res){
    res.render('Mupload')
});
app.get('/MClehome', async function(req, res){
    res.render('MClehome')
});
app.get('/Mcontact', function(req, res){
    res.render('Mcontact')
});
app.get('/index', async function(req, res){
    const upload = await Upload.find();
    res.render('index', {data : upload})
});
app.get('/Mmain', function(req, res){
    res.render('Mmain')
});

app.post('/todo', async(req, res) => {
   
//Hash Passwords
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.Password, salt);

//Create a new User
const user = new User({
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Email_Id: req.body.Email_Id,
    Phone_number:req.body.Phone_number,
    date_of_Birth:req.body.date_of_Birth,
    Password: hashedPassword
});
console.log(user);
try{
    const savedUser = await user.save();
    res.redirect('/MCushome');
}catch(err){
    res.status(400).send(err);
}

});

app.post('/upload', async(req, res) => {

//Uplaod details
const upload = new Upload({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    Address: req.body.Address,
    message: req.body.message
});
console.log(upload);
try{
    const savedUpload = await upload.save();
    res.redirect('/MCushome');
}catch(err){
    res.status(400).send(err);
}
});

//login
app.post("/login", async(req, res) => {
     try {
         const user = await User.findOne({Email_Id:req.body.Email_Id});
         if (!user) return res.redirect('/Mlog');
         const validPass = await bcrypt.compare(req.body.Password, user.Password);
         if(!validPass) return res.redirect('/Mlog');
        return res.status(200).redirect('/MCushome');
   
    }catch (error) {
       // res.status(400).send(error)
       console.log(error);
    }
})

app.post("/cleanlog", async(req, res) => {
  console.log(req.body);
  const cleanerdata = 
  {
  cleanemail:'berliuspereira619@gmail.com',
  cleanpassword:'berlius'
} 
console.log(cleanerdata.cleanemail)
console.log(cleanerdata.cleanpassword)
      if (cleanerdata.cleanemail === String(req.body.cleanemail) && cleanerdata.cleanpassword === String(req.body.cleanpassword))
      
      {
        res.redirect('/MClehome');  
      } 
      else{
        res.redirect('/Mlog');  
      }  
});

    
app.listen(process.env.PORT || 3000, function(){
    console.log('listening to port 3000');
});
