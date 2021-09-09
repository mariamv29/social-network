const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  createUser,
  addFriend,
  updateUser,
  deleteUser,
  removeFriend,
} = require("../../controllers/User-controller");

// Set up GET all and POST at /api/Users
// /api/Users
router.route("/").get(getAllUser).post(createUser);

// Set up GET one, PUT, and DELETE at /api/Users/:id
// /api/Users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

//api/users/:id
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
