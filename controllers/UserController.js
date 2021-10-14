const AppUser = require("../models/AppUserModel");
const Friend = require("../models/FriendModel");
const Posts = require("../models/PostsModel");
const UserModel = require("../models/UserModel");
const Messages = require("../models/MessagesModel");
const Posts_report = require("../models/Posts_reportModel");
const Comment = require("../models/commentModel");

// Get Home
// const GetUserHome = (req, res, next) => {
//   let user = {};
//   let info = {};

//   AppUser.findOne({ _id: req.session.userId })
//     .exec()
//     .then((value) => {
//       user = {
//         _id: value._id,
//         username: value.username,
//       };
//       User.findOne({ account_id: req.session.userId })
//         .exec()
//         .then((data) => {
//           info = {
//             // Avatar: data.Avatar,
//             // Phone: data.Phone,
//             // Address: data.Address,
//             // Age: data.Age,
//             // name: data.name,
//             // email: data.email,
//             // gender: data.gender,
//           };
//         })
//         .catch((err) => {
//           console.log(err);
//           res.render("./usersViews/HomePage");
//         });
//     });
// };

const GetUserHome = async (req, res, next) => {
  try {
    const User = await UserModel.findOne({ account_id: req.session.userId });
    const UserAcc = await AppUser.findOne({ _id: req.session.userId });
    const PostsModel = await Posts.find({}).populate("author").sort({timeCreated:-1});
    // .populate({ path: 'author', select: 'Avatar'})
    // .populate({ path: 'author', select: 'name'});
    console.log(PostsModel);
    return res.render("usersViews/HomePage", {
      Posts: PostsModel,
      User: User,
      UserAcc: UserAcc,
    });
  } catch (error) {
    console.log(error);
  }
  //return res.render("usersViews/HomePage");
};

// Get Post
const addPost = async (req, res, next) => {
  const { title, postImage, desc, timeCreated, Like, Comment, author } =
    req.body;
  const User = await UserModel.findOne({ account_id: req.session.userId });
  console.log(req.session.userId);
  try {
    const newPost = new Posts({
      title: title,
      postImage: req.file.filename,
      desc: desc,
      timeCreated: timeCreated,
      Like: Like,
      Comment: Comment,
      author: User._id,
    });
    await newPost.save();
    const msg = "Succsessfully!";
    return res.redirect(`/user/HomePage?msg=${msg}`);
  } catch (err) {
    console.log(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const User = await UserModel.findOne({ account_id: req.session.userId });
    const UserAcc = await AppUser.findOne({ _id: req.session.userId });
    const PostsModel = await Posts.find({ author: User._id });
    console.log(PostsModel);
    return res.render("usersViews/getPost", {
      Posts: PostsModel,
      UserAcc: UserAcc,
      User: User,
    });
  } catch (error) {
    console.log(error);
  }
};
// exports.getArticles = async (req, res, next) => {
//   //const _id = req.query.id;
//   try {
//     const articles = await article
//       .find({ author: req.session.userId, status: "draft" })
//       .populate("category_name", "name")
//       .exec();
//     return res.render("users/articles", {
//       article: articles,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// Get User Profile
const getUserProfile = async (req, res, next) => {
  const UserAcc = await AppUser.findOne({ _id: req.session.userId });
  const User = await UserModel.findOne({ account_id: req.session.userId });
  try {
    return res.render("usersViews/Profile", {
      UserAcc: UserAcc,
      User: User,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Ranking Post
const getRankingPost = (req, res, next) => {
  return res.render("./usersViews/Ranking_Post");
};

// Get Messages
const getMessages = (req, res, next) => {
  return res.render("./usersViews/Messages");
};

// Get Update Inormation
const getupdateInfo = (req, res, next) => {
  const _id = req.params.id;
  AppUser.findOne({ _id: _id })
    .exec()
    .then((UserAcc) => {
      UserModel.findOne({ account_id: _id })
        .exec()
        .then((User) => {
          return res.render("usersViews/UpdateInfo", {
            UserAcc: UserAcc,
            User: User,
          });
        });
    });
};
const updateInfo = async (req, res, next) => {
  const { Avatar, Phone, Address, Age, name, email, gender, _id } = req.body;
  const newValue = {};
  //if (Avatar) newValue.Avatar = Avatar;
  if (req.file) {
    const image = req.file.filename;
    newValue.Avatar = image;
  }
  if (Phone) newValue.Phone = Phone;
  if (Address) newValue.Address = Address;
  if (Age) newValue.Age = Age;
  if (name) newValue.name = name;
  if (email) newValue.email = email;
  if (gender) newValue.gender = gender;

  const UserAcc = await AppUser.findOne({ _id: req.session.userId });

  UserModel.findOneAndUpdate(
    { account_id: UserAcc._id },
    { $set: newValue },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.redirect("/user/UpdateInfo");
      } else {
        console.log(data);
        return res.redirect(`/user/UpdateInfo/${UserAcc._id}`);
      }
    }
  );
};

// Get Post Detail
const getPostDetail = async (req, res, next) => {
  // const _id = req.params._id;
  const _id = req.params.id;
  try {
    const User = await UserModel.findOne({ account_id: req.session.userId });
    // const UserAcc = await AppUser.findOne({ _id: req.session.userId });
    const PostsModel = await Posts.findOne({ _id: _id }).populate("author");
    const Comments = await Comment.find({ posts:PostsModel }).populate("author");
    return res.render("usersViews/Post_Detail", {
      Posts: PostsModel,
      // UserAcc: UserAcc,
      User: User,
      Comment: Comments,
    });
  } catch (error) {
    console.log(error);
  }
  // return res.render("./usersViews/Post_Detail");
};

// Get Change Password
const getChangePassword = (req, res, next) => {
  const _id = req.params.id;
  AppUser.findOne({ _id: _id })
    .exec()
    .then((UserAcc) => {
      UserModel.findOne({ account_id: _id })
        .exec()
        .then((User) => {
          return res.render("./usersViews/ChangePassword", {
            UserAcc: UserAcc,
            User: User,
          });
        });
    });
};
const ChangePassword = async (req, res, next) => {
  const { pwd, pwd2, _id } = req.body;
  const newValue = {};
  if (pwd) newValue.password = pwd;
  AppUser.findOne({ _id: req.session.userId }).exec(async (err, data) => {
    if (err) {
      return console.log(err);
    } else if (pwd.length < 4) {
      const errorPassword = "Password must be at least 4 characters !!!";
      return res.redirect(`/user/ChangePassword/${_id}?msg=${errorPassword}`);
    } else if (pwd2 != pwd) {
      const errorPassword = "Confirm Password Error!";
      return res.redirect(`/user/ChangePassword/${_id}?msg=${errorPassword}`);
    } else {
      const UserAcc = await AppUser.findOne({ _id: req.session.userId });
      AppUser.findOneAndUpdate(
        { _id: data._id },
        { $set: newValue },
        { new: true },
        (err, data) => {
          if (err) {
            console.log(err);
            return res.redirect(`user/ChangePassword`);
          } else {
            console.log(data);
            const msg = "Succsessfully!";
            return res.redirect(
              `/user/ChangePassword/${UserAcc._id}?msg=${msg}`
            );
          }
        }
      );
    }
  });
};

// Do Comment
const doComment = async (req, res, next) => {
  const { content, blog_id } = req.body;
  const User = await UserModel.findOne({ account_id: req.session.userId });
  const PostsModel = await Posts.findOne({ _id: blog_id });
  try {
    const com = {
      author: User._id,
      content: content,
      posts : PostsModel._id,
    }
    const newComment = await Comment.create(com)
    const saveCom = await newComment.save();
    // const newComment = await new Comment({
    //   author: User._id,
    //   content: content,
    // });
    await PostsModel.Comment_id.push(saveCom);
    await PostsModel.save();
    res.redirect(`/user/Post_Detail/${PostsModel._id}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getChangePassword,
  ChangePassword,
  updateInfo,
  getupdateInfo,
  addPost,
  getPost,
  GetUserHome,
  getUserProfile,
  getRankingPost,
  getMessages,
  getPostDetail,
  doComment,
};
