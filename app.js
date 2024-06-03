const express= require("express");
const app= express();
const mongoose= require("mongoose");
const Listing= require("../MAJORPROJECT/models/listing.js");
const path= require("path");
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()                        //DATABASE ko create kiya
  .then(()=>{
     console.log("connected to DB");
  })
  .catch((err)=>{
    console.log(err);
  });

async function main() {
    await mongoose.connect(MONGO_URL);
}  


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("__method"));
app.engine('ejs', ejsMate);  
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{      //API create kari with GET method
    res.send("Hi! I am root");
});

//INDEX ROUTE
app.get("/listings",async (req,res)=>{
  const allListings= await Listing.find({});
  res.render("../views/listings/index.ejs",{allListings});
 // Listing.find({}).then((res)=>{
 //   console.log(res);
  });


//NEW ROUTE
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");     //error isiliye aaya kyuki /new lo vo /id samaj raha hai
  });                                 // ki new ek id hai so NEW ROUTE ko uppar rakho SHOW ROUTE ke uppar



//SHOW ROUTE
app.get("/listings/:id", async(req,res)=>{
  let {id}= req.params;
  const listing= await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
});


//CREATE ROUTE
app.post("/listings",async (req,res)=>{
  const newListing= new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");

  // let {title,description,image,price,country,location}= req.body
 // let listing= req.body.listing;
 // console.log(listing);
});


//EDIT ROUTE
app.get("/listings/:id/edit",async(req,res)=>{
  let {id}= req.params;            //id li fir listing ko find kiya
  const listing= await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
});


//UPDATE ROUTE
app.put("/listings/:id", async (req,res)=>{
  let {id}= req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect("/listings");
});


app.listen(8080,()=>{
  console.log("server is listening to port 8080");
  //console.log("sample was saved");
});



//app.get("/testListing", async (req,res)=>{
//   let sampleListing= new Listing({
//        title: "My New  Villa",
//        description: "By the beach",
//        price: 1200,
//        location:"Mumbai",
//        country:"India",
//    });
// res.send("success");
//    await sampleListing.save();
//});



//app.get("/testListings",(req,res)=>{    //listing define nai thi toh define kiya
//  res.send("successful testing");
//});