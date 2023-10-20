const Joi = require('joi');

const userRegisterValidate = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().min(6).max(24).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        passwordConfirm: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string()
    });
    return userSchema.validate(data);
};

const userLoginValidate = (data) => {
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return userSchema.validate(data);
}

module.exports = {
    userRegisterValidate,
    userLoginValidate
}