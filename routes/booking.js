const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {eventSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Event = require("../models/event.js");
const { isLoggedIn, isOwner, validateEvent } = require("../middleware.js");
// const eventController = require("../controllers/event.js");
const bookingController = require('../controllers/booking.js');

router.get('/:bookingId/payment',
    isLoggedIn,
    wrapAsync(bookingController.renderBookingPage)
);

router.post('/:bookingId/payment',
    isLoggedIn,
    wrapAsync(bookingController.processPayment)
)

router.get('/:bookingId',
    isLoggedIn,
    wrapAsync(bookingController.showBooking)
)

module.exports = router;

