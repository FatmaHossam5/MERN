import mongoose from "mongoose";

const dbConnection=mongoose.connect(`mongodb://127.0.0.1:27017/myNews`).then(()=>{
    console.log(` Data base Connected successfully!`);
    
})
export default dbConnection