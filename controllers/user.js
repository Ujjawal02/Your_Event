const User = require("../models/user.js");


module.exports.renderSignupPage = (req, res) =>{
    res.render("users/signup.ejs");
}


module.exports.userSignup = async(req, res,next)=>{
    try{
        let {username, email, password} = req.body;
        let newUser = new User({username, email});
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) =>{
            if(err){
                req.flash("error", "Something went wrong");
                return next(err);
            }
            req.flash("success", "user registered successfully");
            res.redirect("/events");
        });
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginPage = (req, res) =>{
    res.render("users/login.ejs");
}

module.exports.userLogin = async(req, res) =>{
        req.flash("success", "You loggeIn!");
        // if(res.locals.redirectUrl){
        //     return res.redirect(res.locals.redirectUrl);
        // }
        // res.redirect("/events");
        let redirectUrl = res.locals.redirectUrl || "/events";
        if (redirectUrl.includes("/reviews")) {
            redirectUrl = redirectUrl.split("/reviews")[0];
        }
        res.redirect(redirectUrl);
}

module.exports.userLogout = (req, res, next)=>{
    req.logout((err) =>{
        if(err){
            next(err);
        }
        req.flash("success", "you logged out successfull");
        res.redirect("/events");
    });
}
