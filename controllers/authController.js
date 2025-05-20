const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Error handler
const handleError = (err) =>{
    console.log(err.message, err.code);
	let errors = { email: '', password: '' };

	//signin errors
	//email
	if(err.message === "There is no user registered with this Email address") {
		errors.email = err.message;
		return errors;
	}

	//password
	if(err.message = "Incorrect Password") {
		errors.password = err.message;
		return errors;
	}

	// duplicate email error
	if (err.message.includes("Email address already in use")) {
		errors.email = err.message;
	  	return errors;
	}

	// validation errors
	if (err.message.includes('user validation failed')) {
	  	// console.log(err);
	  	Object.values(err.errors).forEach(({ properties }) => {
	    	// console.log(val);
	    	// console.log(properties);
	    	errors[properties.path] = properties.message;
		});
  	}
  return errors;
}

// jsonwebtoken
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return token = jwt.sign({id}, "amradhwenjwtcoursesecretcode" ,{expiresIn: maxAge});
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
		res.cookie("acctoken", token, {httpOnly: true, maxAge: maxAge * 1000});
		res.status(201).json({user: user._id});
	} catch(err) {
		const errors = handleError(err);
		res.status(400).json({errors});
	}
}

const signin_post = async(req, res) => {
	const {email , password} = req.body;
	try {
		const user  = await User.signin(email, password);
		const token = createToken(user._id);
		res.cookie("acctoken", token, {httpOnly: true, maxAge: maxAge * 1000});
		res.status(200).json({user: user._id});
	}
	catch(err) {
		const errors = handleError(err);
		res.status(400).json({errors});
	}
}

const signout_get = (req, res) => {
	res.cookie("acctoken", "", {maxAge: 1});
	res.redirect("/");
}

module.exports = {
	signup_get,
	signin_get,
	signup_post,
	signin_post,
	signout_get
}