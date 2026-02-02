import mongoose from "mongoose";

const Schema=mongoose.Schema;

const appliedJobs=new Schema({
     apId:{
        type:Number
     },
     seeker:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"Seeker"
     },
     job:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"Jobs"
     },
     applyDate:{
        type:Date,
        required:true,
        default:Date.now()
     },
     screeningAnswers:[String],
     cv:{
        type:String,
        required:true
     },
     status:{
       type: String, 
       enum: ["Pending", "Accepted", "Rejected","Shortlisted"], 
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