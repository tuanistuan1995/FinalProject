var express = require("express");
var router = express.Router();

var { isUser } = require("../middleware/RequiresLogin");


// Get Homepage
router.get("/home", isUser);

module.exports = router;