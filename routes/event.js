const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {eventSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Event = require("../models/event.js");
const { isLoggedIn, isOwner, validateEvent } = require("../middleware.js");


// const validateEvent = (req, res, next) =>{
//     let result = eventSchema.validate(req.body);
//     console.log(result);
//     if(result.error){
//         let errMsg = result.error.details.map((element) => element.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }else{
//         next();
//     }
// }

//index route
router.get("/",
    validateEvent,
    wrapAsync(async (req,res) =>{
    const allEvents = await Event.find({});
    res.render("events/index.ejs",{allEvents});
}));

//new route
router.get("/new", 
    isLoggedIn,
    (req, res) =>{
    res.render("events/new.ejs");
})

//show route
router.get("/:id", 
    validateEvent,
    wrapAsync(async(req, res) =>{
    let {id} = req.params;
    const event = await Event.findById(id)
    .populate("reviews")
    .populate("owner");
    if (!event) {
            return res.status(404).send("Event not found"); 
    }
    res.render("events/show.ejs", {event});
}));

//create route
router.post("/", 
    validateEvent,
    wrapAsync(async(req, res) =>{
    if (!req.body.event.image || !req.body.event.image.url) {
        delete req.body.event.image;
    }    
    let event = req.body.event;
    const newEvent = new Event(event);
    await newEvent.save();
    req.flash("success", "Event created successfully!");
    res.redirect("/events");
    console.log("My new Event ::", event);
}));

//edit route
router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    validateEvent,
    wrapAsync(async(req, res) =>{
    let {id} = req.params;
    let event = await Event.findById(id);
    res.render("events/edit.ejs", {event});
}));

//update route
router.put("/:id", 
    validateEvent,
    wrapAsync(async(req, res) =>{
    let {id} = req.params;
    await Event.findByIdAndUpdate(id, {...req.body.event});
    req.flash("success", "Event updated!");
    res.redirect(`/events/${id}`);
}));

//delete route
router.delete("/:id", 
    // validateEvent,
    isLoggedIn,
    isOwner,
    wrapAsync(async(req, res) =>{
    let {id} = req.params;
    let event = await Event.findByIdAndDelete(id);
    console.dir(event);
    req.flash("success", "Event deleted!");
    res.redirect("/events");
}));

module.exports = router;