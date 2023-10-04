const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please tell us your name!"],
    },
    email: {
        type: String,
        require: [true, "Please provide your email!"],
        unique: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        require: [true, "Please provide a password!"],
    },
    passwordConfirm: {
        type: String,
        require: [true, "Please confirm your password!"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!",
        },
    },
}, {timestamps: true});

userSchema.pre("save", async function (next){
    // only run this func if password was actually modified
    if(!this.isModified("password")){
        return next();
    }
    // hash password
    this.password = await bcrypt.hash(this.password, 12);
    // delete passwordConfirm field
    this.passwordConfirm = undefined;
    next()
});

userSchema.pre("save", function (next){
    if(!this.isModified("password") || this.isNew){
        return next();
    }
    
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    // this points to the current query
   this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;