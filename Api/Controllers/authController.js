const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const { userRegisterValidate, userLoginValidate} = require('../validations/validation');
const { sendMailCreateAccount } = require('../helpers/sendMail');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie("NFTApi_Token", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    // remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        }
    });
};

exports.signUp = async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;

    const { error } = userRegisterValidate(req.body);
    if(error){
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }

    // check email exits
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({
            status: "fail",
            message: `Create account failed! ${email} already exists`,
        });
    }

    // store 1 user in mongodb
    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm
    });

    // send mail to user
    await sendMailCreateAccount(
        email,
        name,
        "Create account",
        password,
        `<p>Your email is: ${email}</p><p>Your password is: ${password}</p>`
    );

    //Everything ok, send token to client
    createSendToken(newUser, 201, req, res);
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    const { error } = userLoginValidate(req.body);
    if(error){
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }

    //Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))){
        return res.status(401).json({
            status: "fail",
            message: "Incorrect email or password",
        });
    }

    //Everything ok, send token to client
    createSendToken(user, 200, req, res);
};
   
