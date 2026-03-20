const Review = require("../models/review.js");
const Event = require("../models/event.js");


module.exports.postReview = async(req, res) =>{
    let event = await Event.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    event.reviews.push(newReview);
    await newReview.save();
    await event.save();
    req.flash("success", "Review created!");
    res.redirect(`/events/${event._id}`);
}

module.exports.distroyReview = async(req, res) =>{
    let {id, reviewId} = req.params;
    await Event.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/events/${id}`);
}