var express = require("express");
var router = express.Router();

var { isAdmin } = require("../middleware/RequiresLogin");

// Get homepage
router.get('/admin_home', isAdmin, function(req, res, next){
    res.render("./adminViews/admin_home");
});



module.exports = router;