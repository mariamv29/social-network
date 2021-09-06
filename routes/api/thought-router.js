const router = require("express").Router();

const {
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require("../../controllers/thought-controller");

// /api/thoughts/<userId>
router.route("/:userId").post(addThought);


router.route("/:userId/:thoughtId/:reactionId").delete(removeReaction);

// /api/thoughts/<userId>/<thoughtId>
router.route("/:userId/:thoughtId").put(addReaction).delete(removeThought);

module.exports = router;
