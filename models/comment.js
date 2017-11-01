var mongoose = require("mongoose");

// SCHEMA SETUP
var commentSchema = new mongoose.Schema({
    text: String,
    rating: Number,
    date: Date,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
});

module.exports =  mongoose.model('Comment',commentSchema);
