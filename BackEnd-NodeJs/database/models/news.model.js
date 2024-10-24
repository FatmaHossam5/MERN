import { model, Schema } from "mongoose";


const schema = new Schema ({
    title:String,

    body:String,

    mainImg:String,
    images:[String],
},{timestamps:true,versionKey:false})

schema.post('init', function(doc){
   
    
    doc.mainImg  ='http://localhost:3000/uploads/'+doc.mainImg;
    doc.images=doc.images.map(img=>'http://localhost:3000/uploads/'+img)
       


})
export const New = model('New',schema)