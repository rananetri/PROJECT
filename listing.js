const mongoose= require("mongoose");
const Schema= mongoose.Schema;       //mongoode.Schema ko Schema se define kr liya

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:{
        url: String,
        filename: String, 
     //  type: String,
       set: (v)=> v ==="" ? "default link":v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing= mongoose.model("Listing", listingSchema);
module.exports= Listing;   //sara data db mai le jane ke liye export kiya app.js mai kyuki vo db se already connected hai

