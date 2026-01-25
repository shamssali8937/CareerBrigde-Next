import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import autoincreamfactory from "mongoose-sequence"

const autoincreament=autoincreamfactory(mongoose);


const schema=mongoose.Schema;

const users=new schema({
     userId:{
        type:Number
     },
     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     photo:{
        type:String,
        required:true
     },
     role:{
        type:String,
        enum:["jobseeker","jobprovider"],
        required:true
     },
     password:{
        type:String,
        required:function (){return !this.googleId;}
     },
     googleId:{
        type:String,
        default:null
     },
     isdelete:{
        type:Boolean,
        default:false
     },
     forgetToken:{
        type:String,
        default:""
     },
     otp:{
        type:Number,
        default:""
     }
},{timestamps:true});

users.pre("save", async function (next) {
    if(!this.isModified("password")||!this.password){
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});


users.plugin(autoincreament,{inc_field:"userId"});

export default mongoose.models.user||mongoose.model("user",users);