const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");


router
    .route("/signup")
    .get((req, res) =>{
    res.render("users/signup.ejs");
    })
    .post(wrapAsync(async(req, res,next)=>{
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
}));

router 
    .route("/login")
    .get((req, res) =>{
    res.render("users/login.ejs");
    })
    .post( 
    saveRedirectUrl,
    passport.authenticate("local",
        {failureRedirect: "login",
            failureFlash: true,
        }
    ),
    async(req, res) =>{
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
});

router.get("/logout", (req, res, next)=>{
    req.logout((err) =>{
        if(err){
            next(err);
        }
        req.flash("success", "you logged out successfull");
        res.redirect("/events");
    });
});
module.exports = router;




// router.get("/signup",(req, res) =>{
//     res.render("users/signup.ejs");
// });

// router.post("/signup", wrapAsync(async(req, res,next)=>{
//     try{
//         let {username, email, password} = req.body;
//         let newUser = new User({username, email});
//         let registeredUser = await User.register(newUser, password);
//         req.login(registeredUser, (err) =>{
//             if(err){
//                 req.flash("error", "Something went wrong");
//                 return next(err);
//             }
//             req.flash("success", "user registered successfully");
//             res.redirect("/events");
//         });
//     }
//     catch(e){
//         req.flash("error", e.message);
//         res.redirect("/signup");
//     }
// }));


// router.get("/login",(req, res) =>{
//     res.render("users/login.ejs");
// });

// router.post("/login", 
//     saveRedirectUrl,
//     passport.authenticate("local",
//         {failureRedirect: "login",
//             failureFlash: true,
//         }
//     ),
//     async(req, res) =>{
//         req.flash("success", "You loggeIn!");
//         // if(res.locals.redirectUrl){
//         //     return res.redirect(res.locals.redirectUrl);
//         // }
//         // res.redirect("/events");
//         let redirectUrl = res.locals.redirectUrl || "/events";
//         if (redirectUrl.includes("/reviews")) {
//             redirectUrl = redirectUrl.split("/reviews")[0];
//         }
//         res.redirect(redirectUrl);
// });

// router.get("/logout", (req, res, next)=>{
//     req.logout((err) =>{
//         if(err){
//             next(err);
//         }
//         req.flash("success", "you logged out successfull");
//         res.redirect("/events");
//     });
// });

// module.exports = router;