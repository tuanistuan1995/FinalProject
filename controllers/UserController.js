const AppUser = require("../models/AppUserModel");
const Friend = require("../models/FriendModel");
const Posts = require("../models/PostsModel");
const UserModel = require("../models/UserModel");
const Messages = require("../models/MessagesModel");
const Posts_report = require("../models/Posts_reportModel");

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

const GetUserHome = (req, res, next) => {
  res.render("./usersViews/HomePage");
};

// addPost new
// const addPost = async (req, res, next) => {
//   const { title, postImage, desc, timeCreated, Like, Comment } = req.body;
//   User = await account_id.findById(req.params.id);
//   try {
//     const value = await Posts.findOne({ postImage: postImage }).exec();
//     if (value) {
//       const msg = "This post Image is already exist !!! Please Try again";
//       return res.redirect(`/user/HomePage?msg=${msg}`);
//     } else {
//       const newPost = new Posts({
//         title: title,
//         postImage: req.file.filename,
//         desc: desc,
//         timeCreated: timeCreated,
//         Like: Like,
//         Comment: Comment,
//         author: req.session.userId,
//       });
//       await newPost.save();
//       const msg = "Succsessfully!";
//       return res.redirect(`/user/HomePage?msg=${msg}`);
//     }
//   } catch (error) {
//     next(err);
//   }
// };

//addPost Success
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

// Get User Profile
const getUserProfile = async (req, res, next) => {
  const User = await AppUser.findOne({_id : req.session.userId})
  try {
    return res.render("usersViews/Profile", {
      User : User,
    });
  } catch (error){
    console.log(error)
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

// Get Change Password
const getChangePassword = (req, res, next) => {
  return res.render("./usersViews/ChangePassword");
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
            User: User,
          });
        });
    });
};

// const getupdateInfo = (req, res, next) => {
//     return res.render("./usersViews/UpdateInfo");
// }

const updateInfo = (req, res, next) => {
  const { Avatar, Phone, Address, Age, name, email, gender, _id } = req.body;
  const newValue = {};
  if (Avatar) newValue.Avatar = Avatar;
  if (Phone) newValue.Phone = Phone;
  if (Address) newValue.Address = Address;
  if (Age) newValue.Age = Age;
  if (name) newValue.name = name;
  if (email) newValue.email = email;
  if (gender) newValue.gender = gender;

  UserModel.findOneAndUpdate(
    { _id: _id },
    { $set: newValue },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.redirect("./usersViews/UpdateInfo");
      } else {
        console.log(data);
        return res.render("./usersViews/HomePage");
      }
    }
  );
};

// Get Post Detail
const getPostDetail = async (req, res, next) => {
  return res.render("./usersViews/Post_Detail");
};

const getPost = async (req, res, next) => {
  return res.render("./usersViews/addPost");
};

// const getUpdateAccount = (req, res, next) => {
//     let user = {};
//     const _id = req.params.id;
//     const { msg } = req.query;

//     AppUser.findOne({ _id: _id })
//         .exec()
//         .then((value) => {
//             user = {
//                 _id: _id,
//                 username: value.username,
//             };
//             User.findOne({ account_id: _id })
//                 .exec()
//                 .then((info) => {
//                     res.render("usersViews/addPost", {
//                         err: msg,
//                         title: "Change password",
//                         data: {
//                             _id: _id,
//                             info: info,
//                             user: user,
//                         },
//                     });
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     res.redirect("/user/home");
//                 });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.redirect("/user/home");
//         });
// };

// const updateAccount = async (req, res, next) => {
//     const { usr, pwd, pwd2, _id } = req.body;
//     const newValue = {};
//     if (usr) newValue.username = usr;
//     if (pwd) newValue.password = pwd;

//     await AppUser.findOne({ _id: _id }).exec(async (err, user) => {
//         if (err) {
//             return console.log(err);
//         } else if (pwd.length < 4) {
//             const errorPassword = "Password must be at least 4 characters !!!";
//             return res.redirect(`/user/update_account/${_id}?msg=${errorPassword}`);
//         } else if (pwd2 != pwd) {
//             const errorPassword = "Confirm Password Error!";
//             return res.redirect(`/user/update_account/${_id}?msg=${errorPassword}`);
//         } else {
//             User.findOne({ account_id: _id })
//                 .exec()
//                 .then((value) => {
//                     AppUser.findOneAndUpdate(
//                         { _id: _id },
//                         { $set: newValue },
//                         { new: true },
//                         (err, data) => {
//                             if (err) {
//                                 console.log(err);
//                                 return res.render("usersViews/addPost");
//                             } else {
//                                 console.log(data);
//                                 return res.redirect("/user/home");
//                             }
//                         }
//                     );
//                 });
//         }
//     });
// };

module.exports = {
  getChangePassword,
  // updateAccount,
  updateInfo,
  getupdateInfo,
  addPost,
  getPost,
  GetUserHome,
  getUserProfile,
  getRankingPost,
  getMessages,
  getPostDetail,
};
