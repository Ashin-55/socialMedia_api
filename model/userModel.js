const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

    userName:{type:String},
    myPostId:[{type: mongoose.Schema.Types.ObjectId, ref:"POST"}],
    likedItems:[{type: mongoose.Schema.Types.ObjectId, ref:"POST"}],
    followers:[{type: mongoose.Schema.Types.ObjectId, ref:"USER"}]

},{timeseries:true,collection:"USER"})
const USER = mongoose.model("USER",userSchema)
module.exports =USER