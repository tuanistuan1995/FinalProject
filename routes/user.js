var express = require("express");
var router = express.Router();

var { isUser } = require("../middleware/RequiresLogin");
var {
    getUpdateAccount,
    updateAccount,
    updateInfo,
    addPost,
    getPost,
} = require("../controllers/UserController");


// Get Homepage
router.get('/HomePage', isUser, function (req, res, next) {
    res.render("./usersViews/HomePage");
});

// router.get("/addPost", isUser);
// router.get("/updateProfile", isUser);
// router.get('/addPost', isUser, function (req, res, next) {
//     res.render("./usersViews/addPost");
// });

router.get('/updateProfile', isUser, function (req, res, next) {
    res.render("./usersViews/updateProfile");
});

// update password
router.get("/update_account/:id", isUser, getUpdateAccount);
router.put("/update_account", isUser, updateAccount);

router.put("/update_coordinator_information", isUser, updateInfo);


router.get("/getPost", isUser, getPost);
router.post("/addPost", isUser, addPost);



module.exports = router;