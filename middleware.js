const Event = require("./models/event.js");
const Review = require("./models/review.js");
const {eventSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js")

module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be loggeIn!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next)=>{
    let {id} = req.params;
    let event = await Event.findById(id);
    if(!event.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have access!");
        return res.redirect(`/events/${id}`);
    }
    next();
}


module.exports.isReviewAuthor = async(req, res, next)=>{
    let {reviewId, id} = req.params;
    let review = await Review.findById(reviewId);
    if(!review){
        req.flash("error", "Review Not Found!");
        return res.redirect(`/events/${id}`);
    }
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the author of this review!");
        return res.redirect(`/events/${id}`);
    }
    next();
}

module.exports.validateEvent = (req, res, next) =>{
    let result = eventSchema.validate(req.body);
    console.log(result);
    if(result.error){
        let errMsg = result.error.details.map((element) => element.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req, res, next) =>{
    let result = reviewSchema.validate(req.body);
    console.log(result);
    if(result.error){
        let errMsg = result.error.details.map((element) => element.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}
