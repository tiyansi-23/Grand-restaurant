import mongoose from "mongoose";

export const connectDB = async () => {   
    console.log("connected")
    await mongoose.connect('mongodb+srv://tiyansichodavadiya_db_user:tiya123@grant-rastaurant.gseuoua.mongodb.net/').then(()=>console.log("DB connected")).catch((e)=>console.log(e));

}