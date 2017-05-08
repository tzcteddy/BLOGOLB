/**
 * Created by Administrator on 2017/4/8.
 */
let express=require("express");
let Article=require("../model").Article;
let router=express.Router();
let ware=require("../ware");
let {checkLogin,checkNotLogin}=ware;
router.get("/add",checkLogin,function (req,res) {
     res.render("article/add",{title:"发表文章",article:{}})
});
router.post("/add",checkLogin,function (req,res) {
     let article=req.body;//得到客户端提交的文章对象
    article.user=req.session.user._id;
    Article.create(article,function (err,doc) {
        if(err){
            req.flash("error","发表失败");
            res.redirect("back");
        }else {
            req.flash("success","发表成功");
            res.redirect("/");
        }
    })
});
router.get("/detail/:_id",function (req,res) {
  let _id=req.params._id;
    Article.findById(_id,function (err,article) {
        res.render("article/detail",{title:"文章详情",article});
    })
});
router.get("/delete/:_id",function (req,res) {
    let _id=req.params._id;
    Article.remove({_id},function (err,result) {
        if(err){
            req.flash("error","删除失败");
            res.redirect("back");
        }else {
            req.flash("success","删除成功");
            res.redirect("/");
        }
    })
});
router.get("/update/:_id",function (req,res) {
   let _id=req.params._id;
    console.log(_id);
    Article.findById(_id,function (err,article) {
        console.log(article);
        res.render("article/add",{title:"修改文章",article})
    })
});
router.post("/update/:_id",function(req,res){
    let _id=req.params._id;
    let article=req.body;
    Article.update({_id},article,function (err,result) {
        if(err){
            req.flash("error","更新失败");
            res.redirect("back");
        }else {
            req.flash("success","更新成功");
            res.redirect(`/article/detail/${_id}`);
        }
    })
});
module.exports=router;