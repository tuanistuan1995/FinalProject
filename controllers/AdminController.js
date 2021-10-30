const AppUser = require("../models/AppUserModel");
const Posts = require("../models/PostsModel");
const UserModel = require("../models/UserModel");
const Messages = require("../models/MessagesModel");
const Posts_report = require("../models/Posts_reportModel");
const Comment = require("../models/commentModel");

const getListUser = async (req, res, next) => {
  try {
    const User = await UserModel.find({}).populate("account_id");
    return res.render("adminViews/listUser", {
      User: User,
    });
  } catch (error) {
    console.log(error);
  }
};

const adminPostDetail = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const User = await UserModel.findOne({ account_id: req.session.userId });
    const PostsModel = await Posts.findOne({ _id: _id }).populate("author");
    const Comments = await Comment.find({ posts: PostsModel }).populate("author");
    const comcount = await Comment.countDocuments({ posts: PostsModel._id });
    return res.render("adminViews/admin_PostDetail", {
      Posts: PostsModel,
      User: User,
      Comment: Comments,
      comcount: comcount,
    });
  } catch (error) {
    console.log(error);
  }
};

const listPost = async (req, res, next) => {
  try {
    const User = await UserModel.findOne({ account_id: req.session.userId });
    const PostsModel = await Posts.find({}).populate("author");
    return res.render("adminViews/listPost", {
      Posts: PostsModel,
      User: User,
    });
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getListUser,
  adminPostDetail,
  listPost,
};
