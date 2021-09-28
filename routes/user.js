var express = require("express");
var router = express.Router();

var { isUser } = require("../middleware/RequiresLogin");
var {
    getChangePassword,
    // updateAccount,
    // updateInfo,
    getupdateInfo,
    addPost,
    getPost,
    GetUserHome,
    getUserProfile,
    getRankingPost,
    getMessages,
} = require("../controllers/UserController");


// Get Homepage
router.get("/HomePage", isUser, GetUserHome);



//Get Ranking Post
router.get("/Ranking_Post", isUser, getRankingPost);


//get Message
router.get("/Messages", isUser, getMessages);

// Get user Profile
router.get("/Profile", isUser, getUserProfile);

// update password   Note (/ChangePassword/:id)
router.get("/ChangePassword", isUser, getChangePassword);
// router.put("/ChangePassword", isUser, ChangePassword);

// Update Information
router.get("/UpdateInfo", isUser, getupdateInfo);
// router.put("/UpdateInfo", isUser, updateInfo);


router.get("/getPost", isUser, getPost);
router.post("/addPost", isUser, addPost);



module.exports = router;