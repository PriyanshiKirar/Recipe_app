import mongoose from "mongoose";
import config  from "../config/config.js";

export const connect=()=>{
    mongoose.connect(config.MONGO_URI)
    .then(()=>{
      console.log("connected to db");
        
    }).catch((err=>{
        console.log("Error",err.message);
        
    }))
}

export default connect;
