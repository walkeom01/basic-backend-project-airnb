const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        
        default: "https://plus.unsplash.com/premium_photo-1692641346503-730862a6d3a2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=> v=== "https://plus.unsplash.com/premium_photo-1692641346503-730862a6d3a2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ? "" :v,
    },
    price:{
        type: Number,
        
    },
    location: {
        type:String,
        required:false,
    },
    country: {
        type:String,
        required:false,
    },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;