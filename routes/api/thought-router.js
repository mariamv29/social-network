const router = require("express").Router();

const {
  getAllThought,
  getThoughtById,
  addThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThought).post(addThought);

//api/<thoughtId>
router.route("/:id").get(getThoughtById);

// /api/thoughts/<userId>
router.route("/:userId").post(addThought);

router.route("/:thoughtId/:reactionId").delete(removeReaction);

// /api/thoughts/<thoughtId>
router.route("/:thoughtId").put(addReaction).delete(removeThought);

module.exports = router;
