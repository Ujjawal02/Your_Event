const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const eventSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    description: {
        type : String,
        required : true,
    },
    image: {
        filename: { 
        type: String, 
        default: "listingimage" 
        }, 
        url: {
            type: 
            String, default: "https://images.unsplash.com/photo-1658591049748-4937f0a9051a?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
    },
    price: {
        type : Number,
        required : true,
    },
    ticketsAvailable: {
        type : Number,
        required : true,
        min : 0,
    },
    venue: {
        type : String,
        required : true,
    },
    date: {
        type : String,
        required : true,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;