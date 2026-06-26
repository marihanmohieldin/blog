const {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  deleteGategoryCtrl,
} = require("../controllers.js/categoriesController");
const validateObjectId = require("../middlewares.js/validateObjectId");
const { verifyTokenAndAdmin } = require("../middlewares.js/verifyToken");

const router = require("express").Router();

// /api/categories
router
  .route("/")
  .post(verifyTokenAndAdmin, createCategoryCtrl)
  .get(getAllCategoriesCtrl);

// /api/categories/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyTokenAndAdmin, deleteGategoryCtrl);

module.exports = router;
