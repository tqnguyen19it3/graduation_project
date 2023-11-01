const bcrypt = require('bcryptjs');
const User = require("../Models/userModel");
const { userChangePasswordValidate, userChangeProfileInfoValidate } = require('../validations/validation');

// [GET] / GET USER PROFILE INFO
exports.userProfile =  async (req, res, next) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: "This user profile was not found", 
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                user,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', error: 'Internal server error' });
    }
};

// [PUT] / CHANGE PROFILE INFO
exports.changeProfileInfo = async (req, res, next) =>{
    try {
        const userInfo = { 
            name: req.body.name,
            email: req.body.email,
        }

        const { error } = userChangeProfileInfoValidate(req.body);
        if(error){
            return res.status(400).json({
                status: 'fail',
                message: error.details[0].message,
            });
        }
        // check user exits
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: "This user could not be found", 
            });
        }

        // update db
        const userData = await User.findOneAndUpdate({ _id: req.params.id }, userInfo, { new: true });

        return res.status(200).json({
            status: "success",
            message: "Password changed successfully",
            data: {
                userData,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', error: 'Internal server error' });
    }
};

// [PUT] / CHANGE PASSWORD
exports.changePassword = async (req, res, next) =>{
    try {

        const { currentPassword, newPassword } = req.body;

        const { error } = userChangePasswordValidate(req.body);
        if(error){
            return res.status(400).json({
                status: 'fail',
                message: error.details[0].message,
            });
        }
        // check user exits
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: "This user could not be found", 
            });
        }

        //check password
        const isPassValid = await bcrypt.compareSync(currentPassword, user.password);
        if(!isPassValid){
            return res.status(400).json({
                status: 'fail',
                message: "Your current password does not match", 
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        console.log(newPassword);
        console.log(hashedPassword);

        // update new password in db
        await User.updateOne({ _id: req.params.id }, { password: hashedPassword });

        return res.status(200).json({
            status: "success",
            message: "Password changed successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', error: 'Internal server error' });
    }
};