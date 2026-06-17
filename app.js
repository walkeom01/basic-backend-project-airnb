const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wander";

main().then(() => {
    console.log("connected to db ");
})
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended :true}));
app.use(methodOverride("_method"));

//this page may be home or launching page 
app.get("/", (req, res) => {
    res.send("i am on root");
});

//index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
});

//new route
app.get("/listings/new",(req,res)=>{
res.render("listings/new.ejs");
});


// show route
app.get("/listings/:id",async(req,res)=>{
let {id} =req.params;
const listing = await Listing.findById(id);
res.render("listings/show.ejs",{listing});
});

//create route
app.post("/listings", async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    } catch (err) {
        console.error("Error saving listing:", err);
        res.status(500).send("Something went wrong while saving the listing.");
    }
});



// edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});


//update route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
   //also for show route 
   res.redirect(`/listings/${id}`);
    // res.redirect("/listings");
});

app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings")
})

app.listen(8080, () => {
    console.log("server running on port no. 8080");
});


