var express = require("express");
var router = express.Router();

var { isAdmin } = require("../middleware/RequiresLogin");
var {
    getListUser,
    adminPostDetail,
    listPost,
} = require("../controllers/AdminController");

// Get homepage
router.get("/getListUser", isAdmin, getListUser);

router.get("/listPost", isAdmin, listPost);

router.get("/Post_Detail/:id", isAdmin, adminPostDetail);

router.get('/admin_home', isAdmin, function(req, res, next){
    res.render("./adminViews/admin_home");
});


module.exports = router;