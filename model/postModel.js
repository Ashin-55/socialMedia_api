const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({

    authorid:{type:mongoose.Schema.Types.ObjectId,ref:"USER"},
    likes:{type:Number,default:0},
    comments:[{type:String}],
    title:{type:String},
    description:{type:String}
},{timestamps:true,collection:"POSTS"})
const POST = mongoose.model("POST",postSchema)
module.exports =POST