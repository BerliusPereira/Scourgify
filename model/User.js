const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    First_Name: {
        type: String,
        required: true,
    },
    Last_Name: {
        type: String,
        required: true,
    },
    Email_Id: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    Phone_number:{
        type:String,
        required:true,
        min:10
    },
    date_of_Birth:{
        type:String,
        required:true,
        min:10,
        max:20
    },
    // gender: {
    //     type: String,
    //     required: true,
    //     min: 6,
    //     max: 255
    // },
    Password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);