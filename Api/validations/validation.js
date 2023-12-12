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

const userChangePasswordValidate = (data) => {
    const userSchema = Joi.object({
        currentPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
        passwordConfirm: Joi.string().valid(Joi.ref('newPassword')).required(),
    });
    return userSchema.validate(data);
};

const userChangeProfileInfoValidate = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().min(6).max(24).required(),
        gender: Joi.string().valid('male', 'female', 'other'),
        dob: Joi.date().iso().max('now'),
        address: Joi.string(),
        phoneNumber: Joi.string().pattern(new RegExp('^[0-9]{10}$')), // Assume 10-digit phone number
    });
    return userSchema.validate(data);
};

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
    userChangePasswordValidate,
    userChangeProfileInfoValidate,
    userCreateNFTValidate
}