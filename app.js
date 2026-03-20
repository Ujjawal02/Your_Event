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


//index route
app.get("/events", async (req,res) =>{
    try {
        const allEvents = await Event.find({});
        res.render("events/index.ejs",{allEvents});
    } catch (error) {
        console.log("Some Error occure in :: /events index route ::", error);
    }
});

//new route
app.get("/events/new", (req, res) =>{
    res.render("events/new.ejs");
})

//show route
app.get("/events/:id", async(req, res) =>{
    try {
        let {id} = req.params;
        const event = await Event.findById(id);
        if (!event) {
             return res.status(404).send("Event not found"); 
        }
        res.render("events/show.ejs", {event});
    } catch (error) {
        console.log("Some Error occure in :: /events show route ::", error);
    }
});

//create route
app.post("/events", async(req, res) =>{
    try {
        let event = req.body.event;
        const newEvent = new Event(event);
        await newEvent.save();
        res.redirect("/events");
        console.log("My new Event ::", event);
    } catch (error) {
        console.log("Some Error occure in :: /events new route ::", error);
    }
});

//edit route
app.get("/events/:id/edit", async(req, res) =>{
    try {
        let {id} = req.params;
        let event = await Event.findById(id);
        res.render("events/edit.ejs", {event});
    } catch (error) {
        console.log("Some Error occure in :: /events edit route ::", error); 
    }
});

//update route
app.put("/events/:id", async(req, res) =>{
    try {
        let {id} = req.params;
        await Event.findByIdAndUpdate(id, {...req.body.event});
        res.redirect(`/events/${id}`);
    } catch (error) {
        console.log("Some Error occure in :: /events update route ::", error);
    }
})

//delete route
app.delete("/events/:id", async(req, res) =>{
    try {
        let {id} = req.params;
        let event = await Event.findByIdAndDelete(id);
        console.log(event);
        res.redirect("/events");
    } catch (error) {
        console.log("Some Error occure in :: /events delete route ::", error);
    }
});



app.listen(port, ()=>{
    console.log("App is listening on port::", port);
});