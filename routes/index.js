
const { Router } = require('express');
const PhotoController = require('../controller/phtoto.controller');

const router = Router();

router.get('/photos', PhotoController.getPhotos);
router.delete('/photos', PhotoController.deleteById);

module.exports = router;