/**
 * Created by Administrator on 2017/4/8.
 */
let mongoose=require("mongoose");
let ObjectId=mongoose.Schema.Types.ObjectId;
mongoose.connect(require("./config").url);

let UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
},{collection:"user"});//手工指定集合的名称
let User=mongoose.model("User",UserSchema);
exports.User=User;


let ArticleSchema=new mongoose.Schema({
    title:String,
    content:String,
    createAt:{type:Date,default:Date.now},
    user:{type:ObjectId,ref:"User"}//ref引用表示自己是一个外键，引用的是User集合的主键。
});
exports.Article=mongoose.model("Article",ArticleSchema);
