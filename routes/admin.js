var express = require("express");
var router = express.Router();

var { isAdmin } = require("../middleware/RequiresLogin");

// Get homepage
router.get("/home", isAdmin, (req, res, next) => {
    res.render("adminViews/admin_home");
  });

module.exports = router;