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

const userForgetPasswordValidate = (data) => {
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
    });
    return userSchema.validate(data);
}

const userCreateNFTValidate = (data) => {
    const nftSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        email: Joi.string().email().required(),
        image: Joi.string().required(),
        address: Joi.string().required(),
        category: Joi.string().required()
    });
    return nftSchema.validate(data);
}

module.exports = {
    userRegisterValidate,
    userLoginValidate,
    userForgetPasswordValidate,
    userCreateNFTValidate
}