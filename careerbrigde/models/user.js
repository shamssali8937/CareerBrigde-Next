import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AutoIncrementFactory from "mongoose-sequence";

const connection = mongoose.connection;
const AutoIncrement = AutoIncrementFactory(connection);
const Schema = mongoose.Schema;

const users = new Schema({
  userId: { 
    type: Number
 },
  name: { 
    type: String, required: true 
 },
  email: {
     type: String, required: true, unique: true 
 },
  photo: { 
    url: String,
    publicId: String 
 },
  role: {
     type: String, enum: ["jobseeker", "jobprovider"], required: true 
 },
  password: {
     type: String, required: function() { return !this.googleId; } 
 },
  googleId: {
     type: String, default: null 
 },
  isdelete: {
     type: Boolean, default: false 
 },
  forgetToken: {
     type: String, default: "" 
 },
  otp: { 
    type: String, default: null 
 }
}, { timestamps: true });

users.pre("save", async function() {
  if (!this.isModified("password") || !this.password) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// users.plugin(AutoIncrement, { inc_field: "userId", start_seq: 1 });

export default mongoose.models.users || mongoose.model("users", users);
