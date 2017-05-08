/**
 * Created by Administrator on 2017/4/8.
 */
let express=require("express");
let Article=require("../model").Article;
let router=express.Router();

router.get("/",function (req,res) {
    //需要把user属性从字符串转成对象 populate
    let pageNum=isNaN(req.query.pageNum)?1:parseInt(req.query.pageNum);
    let pageSize=isNaN(req.query.pageSize)?5:parseInt(req.query.pageSize);
    let query={};
    if(req.query.keyword){
        query.title=new RegExp(req.query.keyword);
        console.log(req.query.keyword);
    }
    Article.count(query,function (err,count) {
        Article.find(query).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function (err,articles) {
            console.log(articles);
            res.render("index",{
                title:"首页",
                articles,
                keyword:req.query.keyword,
                pageNum,
                pageSize,
                totalPages:Math.ceil(count/pageSize)})
        });
    })
});

module.exports=router;