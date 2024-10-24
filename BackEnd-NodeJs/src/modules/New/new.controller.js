import { New } from "../../../database/models/news.model.js"

const allNews = async (req, res) => {
    let news = await New.find();
    res.status(200).json({ message: 'success', news })

}
const addNew = async (req, res) => {
    req.body.mainImg = req.files.mainImg[0].filename
    req.body.images = req.files.images.map((val) => val.filename)
    let addnews = await New.insertMany(req.body)
    res.status(201).json({ message: 'success', addnews })
}
const updateNews = async (req, res) => {
    const { id } = req.params;
    const updateData = {};
    if (req.files.mainImg) {
        updateData.mainImg = req.files.mainImg[0].filename;
    }
    if (req.files.images) {
        updateData.images = req.files.images.map((val) => val.filename);
    }
    Object.assign(updateData, req.body);
    try {
        const updatedNews = await New.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: 'News article not found' });
        }
        res.status(200).json({ message: 'News updated successfully', updatedNews });
    } catch (error) {
        res.status(500).json({ message: 'Error updating news', error });
    }
};
const deleteNews = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNews = await New.findByIdAndDelete(id);
        if (!deletedNews) {
            return res.status(404).json({ message: 'News article not found' });
        }
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting news', error });
    }
};
export {
    allNews,
    addNew,
    updateNews,
    deleteNews,

}