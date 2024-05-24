const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const FlickrService = require('./services/flickr.service');
const PhotoService = require('./services/photo.service');

const PORT = process.env.PORT || 8080;
const flickrService = new FlickrService();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

async function start() {
  try {
    const { photos } = await flickrService.getPhotoByTags();
    console.log('start inserting photos');
    await PhotoService.insertDb(photos?.photo)
    console.log('end inserting photos');
    app.listen(PORT, () => console.log(`App runing in: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
