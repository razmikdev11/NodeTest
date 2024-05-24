const Flickr = require("flickr-sdk");

class FlickrService {
  flickr;
  endPoints = {
    searchPhoto: "flickr.photos.getRecent"
  }
  constructor() {
    this.flickr = Flickr.createFlickr(process.env.FLICKR_API_KEY).flickr;
  }

  getPhotoByTags = async () => {
    return this.flickr(this.endPoints.searchPhoto, {
      per_page: 500,
      format: "json",
      extras: "url_o,tags,date_upload"
    })
  }


}

module.exports = FlickrService;