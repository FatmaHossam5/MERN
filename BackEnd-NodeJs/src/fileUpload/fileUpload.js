import multer from"multer";
import { v4 as uuidv4 } from 'uuid';



const fileUpload=()=>{
    const storage =multer.diskStorage({
        destination:(req,res,cb)=>{
            cb(null,'uploads/')
        },
        filename:(req,file,cb)=>{
            cb(null,uuidv4()+'_'+file.originalname)
        }
    })
    function fileFilter(req,file,cb){
        if(file.mimetype.startsWith('image/')){
            cb(null,true)
        }else{
            cb (null,false)
        }
    }
    const upload=multer({
        storage,
        fileFilter,
        limits:{
            fieldSize:1*1024*1024
        }
    })
    return upload
}
export const uploadMixOfFiles = (fields) => fileUpload().fields(fields);
