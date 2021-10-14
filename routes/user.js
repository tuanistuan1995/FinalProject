var express = require("express");
var router = express.Router();

var { isUser } = require("../middleware/RequiresLogin");
var {
    getChangePassword,
    ChangePassword,
    updateInfo,
    getupdateInfo,
    getPostDetail,
    addPost,
    getPost,
    GetUserHome,
    getUserProfile,
    getRankingPost,
    getMessages,
    doComment,
} = require("../controllers/UserController");
var { multerInstance } = require("../middleware/upload");

// Get Homepage
router.get("/HomePage", isUser, GetUserHome);



//Get Ranking Post
router.get("/Ranking_Post", isUser, getRankingPost);


//get Message
router.get("/Messages", isUser, getMessages);

// Get user Profile
router.get("/Profile", isUser, getUserProfile);

// update password   Note (/ChangePassword/:id)
router.get("/ChangePassword/:id", isUser, getChangePassword);
router.put("/ChangePassword", isUser, ChangePassword);

// Update Information
router.get("/UpdateInfo/:id", isUser, getupdateInfo);
router.post("/UpdateInfo", multerInstance, isUser, updateInfo);


// Get  Post Detail
router.get("/Post_Detail/:id", isUser, getPostDetail);

// Add new Posts
router.get("/getPost/:id", isUser, getPost);
router.post("/addPost", multerInstance , isUser, addPost);

//Do Comment
router.post("/doComment", isUser, doComment);

module.exports = router;