import mongoose from "mongoose";
const Schema=mongoose.Schema;

const provider=new Schema({
     providerId:{
        type:Number
     },
     user:{
        type:mongoose.Schema.ObjectId,
         required:true,
        ref:"users"
     },
     contact:{
        type:String,
        required:true
     },
      companyName:{
        type:String,
        required:true
     },
     goalOfCompany:{
        type:String,
        required:true
     },
     address:{
        type:String,
        required:true
     },
     positionInCompany:{
        type:String,
        required:true
     },
      tenureInTimePeriod:{
        type:String,
        required:true
     },
     aboutCompany:{
        type:String,
        required:true
     },
     isdelete:{
        type:Boolean,
        default:false
    }
     
},{timestamps:true});


export default mongoose.models.provider || mongoose.model("provider",provider);