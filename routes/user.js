/**
 * Created by Administrator on 2017/4/8.
 */
let express=require("express");
let User=require("../model").User;
let multer=require("multer");
let upload=multer({dest:"./public/uploads"});
let router=express.Router();
let ware=require("../ware");
let {checkLogin,checkNotLogin}=ware;
router.get("/signup",function (req,res) {
   res.render("user/signup",{title:"注册"});//渲染模板用render
});
router.post("/signup",upload.single("avatar"),function (req,res) {
  let user=req.body;
    let avatar=req.file;
    //给头像图片的路径赋值
    user.avatar=`/uploads/${req.file.filename}`;
    User.findOne({username:user.username},function (err,doc) {
        if(doc){
            req.flash("error","此用户名已注册");
            res.redirect("back");
        }else {
            User.create(user,function (err,doc) {
                if(err){
                    req.flash("error",err.toString());
                    res.redirect("back");
                }else {
                    req.flash("success","注册成功");
                    res.redirect("/user/signin");
                }
            })
        }
    });
});
router.get("/signin",checkNotLogin,function (req,res) {

    res.render("user/signin",{title:"登录"})
});
router.post("/signin",function (req,res) {
    let  user=req.body;
    User.findOne(user,function (err,doc) {
        if(err){
            req.flash("error",err.toString());
            res.redirect("back");
        }else {
            if(doc){
                req.flash("success","登陆成功");
                 req.session.user=doc;
                res.redirect("/");
            }else {
                req.flash("error","登陆失败");
                res.redirect("back");
            }
        }
    })
});
router.get("/signout",checkLogin,function (req,res) {
    req.session.user=null;
    res.redirect("/user/signin");
});
module.exports=router;