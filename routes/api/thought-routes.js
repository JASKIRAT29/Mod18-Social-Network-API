const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-Controller');

// /api/applications
router.route('/').get(getThoughts).post(getSingleThought);

// /api/applications/:applicationId
router
  .route('/:thoughtId')
  .get(createThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/applications/:applicationId/tags
router.route('/:thoughtId/reaction').post(addReaction);

// /api/applications/:applicationId/tags/:tagId
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

module.exports = router;
