import { Router } from "express";
import { addNew, allNews, deleteNews, updateNews } from "./new.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";

const newRouter = Router();
newRouter.route('/').get(allNews)
    .post(uploadMixOfFiles([{ name: 'mainImg', maxCount: 1 }, { name: 'images', maxCount: 8 }]), addNew);
    newRouter.route('/:id')
    .put(uploadMixOfFiles([{ name: 'mainImg', maxCount: 1 }, { name: 'images', maxCount: 8 }]), updateNews)
    .delete(deleteNews);
export default newRouter;
