var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/");
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
//   // Optional depending on the providers
//   httpAdapter: 'https', // Default
//   apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
//   formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);
 
// Get all campgrounds
router.get('/', function(req, res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex},function(err, allcampgrounds){
            if(err){
                console.log(err);
            }else{
                if(allcampgrounds.length < 1){
                    res.render('campgrounds/index',{campgrounds:allcampgrounds, error: "No result found. Please try again."});
                }else{
                    res.render('campgrounds/index',{campgrounds:allcampgrounds});
                }
            }
        });  
    }else{
        Campground.find({},function(err, allcampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render('campgrounds/index',{campgrounds:allcampgrounds});
            }
        });        
    }
});

//Add campground to the database
router.post('/', middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var disc = req.body.description;
    var author = {id:req.user._id, username:req.user.username};
    // create a new campground and save
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCampground = {name:name, price: price, image:image, description: disc, author:author, location: location, lat: lat, lng: lng};
        // Create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                //redirect back to campgrounds page
                // console.log(newlyCreated);
                res.redirect("/campgrounds");
            }
        });
    });
});
    
//Display form to create new campground   
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new');
});

// Show more info for one campground  
router.get('/:id', function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err || !foundCampground){
            console.log(err);
            req.flash("error", "Campground not found");
            return res.redirect("back");
        }else{
            // render show template
            var tot_rating = 0, tot_comments = 0;
            for(var i =0; i< foundCampground.comments.length; i++){
                tot_comments += 1;
                tot_rating += foundCampground.comments[i].rating;
            }
            if(tot_comments == 0){
                foundCampground.rating = 0;
            }else{
                foundCampground.rating = tot_rating/tot_comments;
            }
            foundCampground.tot_comments = tot_comments;
            res.render('campgrounds/show', {campground: foundCampground});
        }
        
    });
});

// edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// update campground route
router.put("/:id", function(req, res){
  geocoder.geocode(req.body.campground.location, function (err, data) {
    var newCampground = req.body.campground;
    newCampground.location = data[0].formattedAddress;  
    newCampground.lat = data[0].latitude;
    newCampground.lng = data[0].longitude;
    Campground.findByIdAndUpdate(req.params.id, newCampground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

// destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;