const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Error handler
const handleError = (err) =>{
    let errors = {email: "", password: ""};

    if(err.message.includes("user validation failed")) {
    	Object.values(err.errors).forEach(({properties})=>{
    		errors[properties.path] = properties.message;
    	})
    }
    else {
    	errors = err.message;
    }
    return errors;
}

// jsonwebtoken
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return token = jwt.sign({id}, "amradhwenjwtcoursesecretcode");
}

const signup_get = (req, res) => {
	res.render("signup");
}

const signin_get = (req, res) => {
	res.render("signin");
}

const signup_post = async (req, res) => {
	const {email, password} = req.body;
	try {
		const user = await User.create({email, password});
		const token = createToken(user._id);
		res.cookie("acctoken", token, {httpOnly: true, maxAge: maxAge});
		res.status(201).json({user: user._id});
	} catch(err) {
		const errors = handleError(err);
		res.status(400).json(errors);
	}
}

const signin_post = async(req, res) => {
	res.send("New signin");
}

module.exports = {
	signup_get,
	signin_get,
	signup_post,
	signin_post
}