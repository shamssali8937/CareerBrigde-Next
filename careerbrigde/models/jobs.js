import mongoose from "mongoose";

const Schema=mongoose.Schema;

const jobs=new Schema({
     jobId:{
        type:Number
     },
     provider:{
        type:mongoose.Schema.ObjectId,
         required:true,
        ref:"provider"
     },
      title:{
        type:String,
        required:true
     },
     location:{
        type:String,
        required:true
     },
     jobType:{
        type:String,
        required:true
     },
      salary:{
        type:String,
     },
      description:{
        type:String,
        required:true
     },
     requirements:[String],
     screeningQuestions:[String],
     postDate:{
        type:Date,
        required:true,
        default:Date.now()
     },
    lastDate:{
        type:Date,
        required:true
     },
     isdelete:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export default mongoose.models.jobs || mongoose.model("jobs",jobs);