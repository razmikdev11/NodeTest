const { sequelize, Sequelize } = require("../database");
const Photo = sequelize.models.photos;
const { Op } = Sequelize;

class PhotoService {
  static insertDb = async (data) => {
    Photo.truncate();
    const photo = data[0];
    for(let i = 0; i < data.length; i++) {
      const photo = data[i];
      try {
        await Photo.create({ publishedDate: new Date(photo.dateupload * 1000), tags: photo.tags, url: photo.url_o })
      } catch (error) {
        console.log(error);
      }
    }

    return true;
  }

  static getPhotos(offset, limit, tag) {
    return Photo.findAll({
      offset,
      limit,
      order: [
        ["publishedDate", "DESC"]
      ],
      where: {
        url: {
          [Op.ne]: null,
        },
        ...(tag && {tags: { [Op.like]: `%${tag}%` }})
      }
    })
  }

  static deleteById(photoId) {
    return Photo.destroy({
      where: {
        id: photoId
      }
    })
  }
}

module.exports = PhotoService;