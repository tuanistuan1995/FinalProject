const AppUser = require("../models/AppUserModel");
const Friend = require("../models/FriendModel");
const Posts = require("../models/PostsModel");
const User = require("../models/UserModel");
const Messages = require("../models/MessagesModel");
const Posts_report = require("../models/Posts_reportModel");


// const GetUserHome = (req, res, next) => {
//     let user = {};
//     let info = {};

//     AppUser.findOne({ _id: req.session.userId })
//         .exec()
//         .then((value) => {
//             user = {
//                 _id: value._id,
//                 username: value.username,
//             };
//             User.findOne({ account_id: req.session.userId })
//                 .exec()
//                 .then((value) => {
//                     info = {

//                         name: value.name,
//                         email: value.email,
//                     };
//                     if (value.faculty_id) {
//                         Faculty.findOne({ _id: value.faculty_id })
//                             .exec()
//                             .then((assign) => {
//                                 // console.log(assign);
//                                 res.render("studentViews/student_home", {
//                                     title: "Student's Homepage",
//                                     data: {
//                                         _id: value._id,
//                                         user: user,
//                                         info: info,
//                                         assign: assign.name,
//                                     },
//                                 });
//                             });
//                     } else {
//                         res.render("studentViews/student_home", {
//                             title: "Student's Homepage",
//                             data: {
//                                 _id: value._id,
//                                 user: user,
//                                 info: info,
//                             },
//                         });
//                     }
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     res.redirect("/students/home");
//                 });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.redirect("/students/home");
//         });
// };
// };

const addPost = async (req, res, next) => {
    const { title, postImage, desc, timeCreated, Like, Comment, author } = req.body;
    await Posts.findOne({ title: title }).exec(
        async (err, value) => {
        if (err) {
            return console.log(err);
        } else if (value) {
            // const msg = "This post is already exist !!! Please Try again";
            return res.redirect(`/user/HomePage`);
        } else {
            const newPost = new Posts({
                title: title,
                postImage: postImage,
                desc: desc,
                timeCreated: timeCreated,
                Like: Like,
                Comment: Comment,
                author: author,
                // posts_report: 
            });
            await newPost.save();
            return res.redirect(`/user/HomePage`);
        }
    });
};


const getPost = function (req, res, next){
    return res.render("./usersViews/addPost")
}


const updateInfo = (req, res, next) => {

}

const getUpdateAccount = (req, res, next) => {
    let user = {};
    const _id = req.params.id;
    const { msg } = req.query;

    AppUser.findOne({ _id: _id })
        .exec()
        .then((value) => {
            user = {
                _id: _id,
                username: value.username,
            };
            User.findOne({ account_id: _id })
                .exec()
                .then((info) => {
                    res.render("usersViews/addPost", {
                        err: msg,
                        title: "Change password",
                        data: {
                            _id: _id,
                            info: info,
                            user: user,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/user/home");
                });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/user/home");
        });
};

const updateAccount = async (req, res, next) => {
    const { usr, pwd, pwd2, _id } = req.body;
    const newValue = {};
    if (usr) newValue.username = usr;
    if (pwd) newValue.password = pwd;

    await AppUser.findOne({ _id: _id }).exec(async (err, user) => {
        if (err) {
            return console.log(err);
        } else if (pwd.length < 4) {
            const errorPassword = "Password must be at least 4 characters !!!";
            return res.redirect(`/user/update_account/${_id}?msg=${errorPassword}`);
        } else if (pwd2 != pwd) {
            const errorPassword = "Confirm Password Error!";
            return res.redirect(`/user/update_account/${_id}?msg=${errorPassword}`);
        } else {
            User.findOne({ account_id: _id })
                .exec()
                .then((value) => {
                    AppUser.findOneAndUpdate(
                        { _id: _id },
                        { $set: newValue },
                        { new: true },
                        (err, data) => {
                            if (err) {
                                console.log(err);
                                return res.render("usersViews/addPost");
                            } else {
                                console.log(data);
                                return res.redirect("/user/home");
                            }
                        }
                    );
                });
        }
    });
};

module.exports = {
    getUpdateAccount,
    updateAccount,
    updateInfo,
    addPost,
    getPost,
};
