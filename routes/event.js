const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {eventSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Event = require("../models/event.js");
const { isLoggedIn, isOwner, validateEvent } = require("../middleware.js");
const eventController = require("../controllers/event.js");



//index route
router.get("/",
    wrapAsync(eventController.index)
);

//new route
router.get("/new", 
    isLoggedIn,
    eventController.renderNewForm
);

//show route
router.get("/:id", 
    wrapAsync(eventController.showEvent)
);

//create route
router.post("/", 
    validateEvent,
    wrapAsync(eventController.createEvent)
);

//edit route
router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    validateEvent,
    wrapAsync(eventController.renderEditForm)
);

//update route
router.put("/:id", 
    validateEvent,
    wrapAsync(eventController.updateEvent)
);

//delete route
router.delete("/:id", 
    // validateEvent,
    isLoggedIn,
    isOwner,
    wrapAsync(eventController.distroyEvent)
);

module.exports = router;