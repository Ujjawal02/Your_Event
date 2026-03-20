const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Event = require("../models/event.js");
const Review = require("../models/review.js");
const {isReviewAuthor, validateReview, isLoggedIn} = require("../middleware.js");
const reviewController = require("../controllers/review.js");


//Review Routes
router.post("/",
    isLoggedIn, 
    validateReview,
    wrapAsync(reviewController.postReview)
);

router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.distroyReview)
);

module.exports = router;