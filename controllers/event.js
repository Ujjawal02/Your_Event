const Event = require("../models/event.js");
module.exports.index = async (req,res) =>{
    const allEvents = await Event.find({});
    res.render("events/index.ejs",{allEvents});
}

module.exports.renderNewForm = (req, res) =>{
    res.render("events/new.ejs");
}

module.exports.showEvent =async(req, res) =>{
    let {id} = req.params;
    const event = await Event.findById(id)
    .populate("reviews")
    .populate("owner");
    if (!event) {
            return res.status(404).send("Event not found"); 
    }
    res.render("events/show.ejs", {event});
}

module.exports.createEvent = async(req, res) =>{
    if (!req.body.event.image || !req.body.event.image.url) {
        delete req.body.event.image;
    }    
    let event = req.body.event;
    const newEvent = new Event(event);
    await newEvent.save();
    req.flash("success", "Event created successfully!");
    res.redirect("/events");
    console.log("My new Event ::", event);
}

module.exports.renderEditForm = async(req, res) =>{
    let {id} = req.params;
    let event = await Event.findById(id);
    if (!event) {
        req.flash("error", "Event not found");
        return res.redirect("/events");
    }
    res.render("events/edit.ejs", {event});
}

module.exports.updateEvent = async(req, res) =>{
    let {id} = req.params;
    await Event.findByIdAndUpdate(id, {...req.body.event});
    req.flash("success", "Event updated!");
    res.redirect(`/events/${id}`);
}

module.exports.distroyEvent = async(req, res) =>{
    let {id} = req.params;
    let event = await Event.findByIdAndDelete(id);
    console.dir(event);
    req.flash("success", "Event deleted!");
    res.redirect("/events");
}