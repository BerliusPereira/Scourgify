const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    phone:{
        type: String,
        required:true,
        min:10
    },
    Address:{
        type: String,
        required:true,
        min:10,
        max:50
    },
    message:{
        type: String,
        required:true,
        min:10,
        max:500
    },
    // gender: {
    //     type: String,
    //     required: true,
    //     min: 6,
    //     max: 255
    // },
    // Password: {
    //     type: String,
    //     required: true,
    //     max: 1024,
    //     min: 6
    // },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Upload', uploadSchema);