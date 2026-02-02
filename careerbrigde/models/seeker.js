import mongoose from "mongoose";
mongoose.connection.name
const Schema= mongoose.Schema; 

const experience=new Schema({
    expId:{
        type:Number
     },
     title:{
        type:String,
        required:true
     },
    company:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     }
});

const education=new Schema({
     eduId:{
        type:Number
     },
     degree:{
        type:String,
        required:true
     },
     institute:{
        type:String,
        required:true
     },
     year:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     }
});


const SocialLinks=new Schema({
    slId:{
        type:Number
     },
     label:{
        type:String,
        required:true
     },
     link:{
        type:String,
        required:true
     }
});


const seeker=new Schema({
     seekerId:{
        type:Number
     },
     user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"users"
     },
     headline:{
        type:String,
        required:true
     },
     about:{
        type:String,
        required:true
     },
     address:{
        type:String,
        required:true
     },
     city:{
        type:String,
        required:true
     },
      country:{
        type:String,
        required:true
     },
      phone:{
        type:String,
        required:true
     },
     skills:[String],
     education:[education],
     experience:[experience],
     socialLinks:[SocialLinks],
     isdelete:{
        type:Boolean,
        default:false
    },
     cv:{
        url: String,
        publicId: String 
     }
},{timestamps:true});

export default mongoose.models.seeker || mongoose.model("seeker", seeker);
