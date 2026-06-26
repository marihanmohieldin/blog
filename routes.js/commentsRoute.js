const router = require("express").Router();

const {
  createCommentCtrl,
  getAllCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} = require("../controllers.js/commentsController");
const validateObjectId = require("../middlewares.js/validateObjectId");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares.js/verifyToken");

// /api/comments
router
  .route("/")
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentCtrl);

//   /api/comments/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyToken, deleteCommentCtrl)
  .put(validateObjectId, verifyToken, updateCommentCtrl);

module.exports = router;
