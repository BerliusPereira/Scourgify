//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = {
        First_Name: Joi.string()
                .min(6)
                .required(),
        Last_Name: Joi.string()
                .min(6)
                .required(),
        Email_Id: Joi.string()
                .min(6)
                .required(),
        Password: Joi.string()
                .min(6)
                .required()
    };
    return Joi.validate(data, schema);
};

const loginValidation = (data) => {
    const schema = {
        Email_Id: Joi.string()
                .min(6)
                .required()
                .Email_Id(),
        Password: Joi.string()
                .min(6)
                .required()
    };
    return Joi.validate(data, schema);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;