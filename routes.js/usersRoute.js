const router = require("express").Router();
const {
  getAllUsersCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  getUsersContCtrl,
  profilePhotoCtrl,
  deleteUserProfileCtrl,
} = require("../controllers.js/usersController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAnddOnlyUser,
  verifyTokenAndAuthorization,
} = require("../middlewares.js/verifyToken");
const validateObjectId = require("../middlewares.js/validateObjectId");
const photoUpload = require("../middlewares.js/photoUpload");

// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/profile/:id
router
  .route("/profile/:id")
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verifyTokenAnddOnlyUser, updateUserProfileCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl);

// /api/users/profile/profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoCtrl);

// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, getUsersContCtrl);

module.exports = router;
