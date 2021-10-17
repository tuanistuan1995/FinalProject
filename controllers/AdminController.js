const AppUser = require("../models/AppUserModel");
const Posts = require("../models/PostsModel");
const UserModel = require("../models/UserModel");
const Messages = require("../models/MessagesModel");
const Posts_report = require("../models/Posts_reportModel");

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
  
module.exports = {
    getListUser,
}
