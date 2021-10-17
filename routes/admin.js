var express = require("express");
var router = express.Router();

var { isAdmin } = require("../middleware/RequiresLogin");
var {
    getListUser,
} = require("../controllers/AdminController");

// Get homepage
router.get("/getListUser", isAdmin, getListUser);

router.get('/admin_home', isAdmin, function(req, res, next){
    res.render("./adminViews/admin_home");
});



module.exports = router;