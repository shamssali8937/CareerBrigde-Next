import mongoose from "mongoose";

const Schema=mongoose.Schema;

const appliedJobs=new Schema({
     apId:{
        type:Number
     },
     seeker:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"seeker"
     },
     job:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"jobs"
     },
     applyDate:{
        type:Date,
        required:true,
        default:Date.now()
     },
     screeningAnswers:[String],
     cv:{
        url: String,
        publicId: String
     },
     status:{
       type: String, 
       enum: ["Pending", "Hired", "Rejected","Shortlisted"], 
       default: "Pending"
     },
     isViewed:{
         type: Boolean,
         default: false 
     },
     isdelete:{
      type: Boolean,
      default: false
     }
     
},{timestamps:true});


export default mongoose.models.appliedJobs || mongoose.model("appliedJobs",appliedJobs);