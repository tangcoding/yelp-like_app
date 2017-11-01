var mongoose = require("mongoose");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    location: String,
    lat: Number,
    lng: Number,
    description: String,
    rating: Number,
    tot_comments: Number,
    
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports =  mongoose.model('Campground',campgroundSchema);
