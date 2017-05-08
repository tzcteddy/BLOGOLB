/**
 * Created by Administrator on 2017/4/8.
 */
let express=require("express");
let path=require("path");
let app=express();
let index=require("./routes/index");
let user=require("./routes/user");
let article=require("./routes/article");
let bodyParser=require("body-parser");
let session=require("express-session");
//这是一个把信息写在session中的中间件
let flash=require("connect-flash");
let MongoStore=require("connect-mongo")(session);

app.use(express.static(path.resolve("public")));
//这个中间件会自动判断请求体的类型，如果是JSON自己就处理，如果不是会走next，是通过请求头中ContentType
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"zfpx",
    cookie:{maxAge:1000*10},
    store:new MongoStore({
        url:require("./config").url
    })
}));
//req.flash(type,msg)写 req.flash(type)读可以读写消息
app.use(flash());
//目标是把success和error从flash取出来
//res.locals渲染模板
app.use(function (req,res,next) {
    res.locals.success=req.flash("success").toString();
    res.locals.error=req.flash("error").toString();
    res.locals.user=req.session.user;
    res.locals.keyword='';
    next();
});
app.set("view engine","html");
app.set("views",path.resolve(__dirname,"views"));
app.engine("html",require("ejs").__express);

app.use("/",index);
app.use("/user",user);
app.use("/article",article);
app.listen(8080);