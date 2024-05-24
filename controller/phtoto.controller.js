const PhotoService = require("../services/photo.service");
const ResponseService = require("../services/response.service");

class PhotoController {
  static async getPhotos(req, res) {
    try {
      const { page = 1, perPage = 10, tag } = req.query;
      const photos = await PhotoService.getPhotos((page - 1) * perPage, perPage, tag);
  
      res.status(200).json(new ResponseService(photos, "photo succed"))
    } catch (error) {
      res.status(500).json(new ResponseService(null, error.message, true))
    }
  }

  static async deleteById(req, res) {
    try {
      const { photoId } = req.query;
      const result = await PhotoService.deleteById(photoId);
  
      res.status(200).json(new ResponseService(result, "photo succed"))
    } catch (error) {
      res.status(500).json(new ResponseService(null, error.message, true))
    }
  }
}

module.exports = PhotoController;