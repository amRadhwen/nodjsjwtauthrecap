const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: [true, "Email address already in use"],
        lowercase: true,
        validate: [isEmail, "Please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 caracters length"]
    }
})

userSchema.post("save", (doc, next)=>{
    next();
});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = model("user", userSchema);

module.exports = User;