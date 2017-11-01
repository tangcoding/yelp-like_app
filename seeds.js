var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    { name: "Paradise Campground",
      image: "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg",
      description: "blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah blah blah blahblah blah blah blah blah blah"
        
    },
    { name: "Hoosier National Forest",
      image: "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg",
      description: "blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah blah blah blahblah blah blah blah blah blah"
        
    },
    { name: "Carl Spindler Campground",
      image: "http://www.fondulacpark.com/wp-content/uploads/2015/01/campground-pic-1.jpg",
      description: "blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah blah blah blahblah blah blah blah blah blah"
        
    }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){});
    // Campground.remove({},function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");
        // //add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err,campground){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log("added a campground");
        //             Comment.create({
        //                 text: "This place is great, but I wish there was internet.",
        //                 author: "Homer"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 }else{
        //                     campground.comments.push(comment);
        //                     campground.save();    
        //                     console.log("create new comment");
        //                 }
        //             });
        //         }
            // })        
        // });
    // });   
    
    //add a few comments
}

module.exports = seedDB;
