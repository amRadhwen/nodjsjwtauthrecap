const { Router } = require("express");
const { signup_get, signin_get, signup_post, signin_post, signout_get } = require("../controllers/authController");


const router = Router();

router.get("/signup", signup_get);
router.post("/signup", signup_post);
router.get("/signin", signin_get);
router.post("/signin", signin_post);
router.get("/signout", signout_get);


module.exports = router;