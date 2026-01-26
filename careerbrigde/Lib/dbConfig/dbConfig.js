import mongoose from "mongoose";

export default async function connect() {
    try{
         await mongoose.connect(process.env.MONGO_URI);
         const connection = mongoose.connection;

         connection.on('connected',()=>{
            console.log('✅ MongoDB Connected Succesfully');
         });

         connection.on('error',(err)=>{
            console.log("❌ MongoDB Connection Failure" + err);
            process.exit();
         });

    }catch(err){
        console.log("Error in establishing connection with DB");
        console.log(err);
    }
}