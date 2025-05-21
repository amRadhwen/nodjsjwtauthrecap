const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next)=>{
	const token = req.cookies.acctoken;
	if(token) {
		jwt.verify(token, "amradhwenjwtcoursesecretcode", (err, decodedToken)=>{
			if(err){
				res.redirect("/signin");
			}
			else {
				next();
			}
		})
	}
	else {
		res.redirect("/signin");
	}
}

//check current user
const checkUser = (req, res, next) => {
	const token = req.cookies.acctoken;
	if(token) {
		jwt.verify(token, "amradhwenjwtcoursesecretcode", async (err, decodedToken)=>{
			if(err) {
				res.locals.user = null;
				next();
			}
			else {
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		})
	}
	else {
		res.locals.user = null;
		next();
	}
}

module.exports = {requireAuth, checkUser};