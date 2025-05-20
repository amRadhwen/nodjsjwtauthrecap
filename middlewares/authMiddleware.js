const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next)=>{
	const token = req.cookies.acctoken;
	if(token) {
		jwt.verify(token, "amradhwenjwtcoursesecretcode", (err, decodedToken)=>{
			if(err){
				console.log(err.message);
				res.redirect("/signin");
			}
			else {
				console.log(decodedToken);
				next();
			}
		})
	}
	else {
		res.redirect("/signin");
	}
}

module.exports = {requireAuth};