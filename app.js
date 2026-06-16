const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

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

app.get("/", (req, res) => {
    res.send("i am on root");
});

//index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
});


app.listen(8080, () => {
    console.log("server running on port no. 8080");
});


// app.get("/testlisting", async(req, res) => {
//     let sampleListing = new Listing({
//         title: "my first click",
//         description: "by om walke",
//         price: 1200,
//         location: "goa",
//         country: "india",
//     });
//     await sampleListing.save();
//     console.log("sample was saved ");
//     res.send("successful testing");
// });