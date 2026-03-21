if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = 'mongodb://127.0.0.1:27017/event';
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const events = require("./routes/event.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
main()
.then(()=>{
    console.log("DataBase Connection Done")
})
.catch((err) =>{
    console.log("Somthing error in DataBase");
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);


const sessionOptions = {
    secret: "musupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.get("/", (req, res) =>{
    res.send("Root Listening");
});


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());//user se related jitne bhi information hai use session ke andr store krana 
passport.deserializeUser(User.deserializeUser());//unstore -> remove after session completion

app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.use("/events", events);
app.use("/events/:id/reviews", reviews);
app.use("/", users);


app.use((req, res, next) =>{
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) =>{
    let {statusCode=500, message="Something went wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", {err});
});

//Review Routes




app.listen(port, ()=>{
    console.log("App is listening on port::", port);
});