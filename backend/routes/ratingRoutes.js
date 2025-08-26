const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/:storeId/ratings', ratingController.getRatings);
router.post('/:storeId/rate', ratingController.saveRating);
router.put('/:storeId/rate', ratingController.updateRating);

module.exports = router;