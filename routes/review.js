const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Event = require("../models/event.js");
const Review = require("../models/review.js");
const {isReviewAuthor, validateReview, isLoggedIn} = require("../middleware.js");

// const validateReview = (req, res, next) =>{
//     let result = reviewSchema.validate(req.body);
//     console.log(result);
//     if(result.error){
//         let errMsg = result.error.details.map((element) => element.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// }


//Review Routes
router.post("/",
    isLoggedIn, 
    validateReview,
    wrapAsync(async(req, res) =>{
    let event = await Event.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    event.reviews.push(newReview);
    await newReview.save();
    await event.save();
    req.flash("success", "Review created!");
    res.redirect(`/events/${event._id}`);
}));

router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(async(req, res) =>{
    let {id, reviewId} = req.params;
    await Event.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/events/${id}`);
}));

module.exports = router;