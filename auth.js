const router = require('express').Router
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validation');


route.post('/todo', async(req, res) => {
    //Lets validate data from user
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
const Email_IdExist = await User.findOne({Email_Id : req.body.Email_Id});
if (Email_IdExist) return  res.status(400).send('Email already exits');

//Hash Passwords
const salt = await bcrypt.gensalt(10);
const hashedPassword = await bcrypt.hash(req.body.Password, salt);

//Create a new User
const user = new User({
    First_Name: req.body.First_Name,
    Email_Id: req.body.Email_Id,
    Password: hashedPassword
});

try {
    const savedUser = await user.save();
    res.send(savedUser);
} catch (err) {
    res.status(400).send(err);
}
});
module.exports = router;