var express = require('express');
var router = express.Router();

var { Login, Logout, Register } = require("../controllers/LoginControllers");

const { route } = require(".");

// /* GET account listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Get login page
router.get("/login", (req, res, next) => {
  const { msg } = req.query;
  res.render("login", { err: msg, title: "Login to your Account" });
});

// Get login / logout request
router.post("/login", Login);
router.get("/logout", Logout);
router.post("/register", Register);

module.exports = router;
