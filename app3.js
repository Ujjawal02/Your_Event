const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = 'mongodb://127.0.0.1:27017/event';
const port = 8080;
const path = require("path");
const Event = require("./models/event.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const {eventSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js")
main()
.then(()=>{
    console.log("DataBase Connection Done")
})
.catch((err) =>{
    console.log("Somthing error in DataBase");
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

app.get("/", (req, res) =>{
    res.send("Root Listening");
});

const validateEvent = (req, res, next) =>{
    let result = eventSchema.validate(req.body);
    console.log(result);
    if(result.error){
        let errMsg = result.error.details.map((element) => element.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

const validateReview = (req, res, next) =>{
    let result = reviewSchema.validate(req.body);
    console.log(result);
    if(result.error){
        let errMsg = result.error.details.map((element) => element.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}



//index route
app.get("/events",
    validateEvent,
    wrapAsync(async (req,res) =>{
    const allEvents = await Event.find({});
    res.render("events/index.ejs",{allEvents});
}));

//new route
app.get("/events/new", (req, res) =>{
    res.render("events/new.ejs");
})

//show route
app.get("/events/:id", 
    validateEvent,
    wrapAsync(async(req, res) =>{
    let {id} = req.params;
    const event = await Event.findById(id).populate("reviews");
    if (!event) {
            return res.status(404).send("Event not found"); 
    }
    res.render("events/show.ejs", {event});
}));

//create route
app.post("/events", 
    validateEvent,
    wrapAsync(async(req, res) =>{
    if (!req.body.event.image || !req.body.event.image.url) {
        delete req.body.event.image;
    }    
    let event = req.body.event;
    const newEvent = new Event(event);
    await newEvent.save();
    res.redirect("/events");
    console.log("My new Event ::", event);
}));

//edit route
app.get("/events/:id/edit", 
    validateEvent,
    wrapAsync(async(req, res) =>{
    let {id} = req.params;
    let event = await Event.findById(id);
    res.render("events/edit.ejs", {event});
}));

//update route
app.put("/events/:id", 
    validateEvent,
    wrapAsync(async(req, res) =>{
    let {id} = req.params;
    await Event.findByIdAndUpdate(id, {...req.body.event});
    res.redirect(`/events/${id}`);
}));

//delete route
app.delete("/events/:id", 
    validateEvent,
    wrapAsync(async(req, res) =>{
    let {id} = req.params;
    let event = await Event.findByIdAndDelete(id);
    console.log(event);
    res.redirect("/events");
}));

app.use((err, req, res, next) =>{
    let {statusCode=500, message="Something went wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", {err});
});

//Review Routes
app.post("/events/:id/reviews", 
    validateReview,
    wrapAsync(async(req, res) =>{
    let event = await Event.findById(req.params.id);
    let newReview = new Review(req.body.review);
    event.reviews.push(newReview);
    await newReview.save();
    await event.save();
    res.redirect(`/events/${event._id}`);
}));

app.delete("/events/:id/reviews/:reviewId", wrapAsync(async(req, res) =>{
    let {id, reviewId} = req.params;
    await Event.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/events/${id}`);
}));




app.listen(port, ()=>{
    console.log("App is listening on port::", port);
});