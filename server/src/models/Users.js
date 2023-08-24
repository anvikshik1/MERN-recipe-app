import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    savedRecipe:[{type:mongoose.Schema.Types.ObjectId ,ref: "recipe"}]
})

export const userModel = mongoose.model("users",userSchema)