const express = require("express");
const {
  getARandomUser,
  getAllUser,
  saveUser,
  updateUser,
  updateMultipleUser,
  deleteUser,
} = require("../../controllers/users.controller");

const router = express.Router();

router.route("/random").get(getARandomUser);
router.route("/all").get(getAllUser);
router.route("/save").post(saveUser);
router.route("/update/:id").patch(updateUser);
router.route("/bulk-update").patch(updateMultipleUser);
router.route("/delete/:id").delete(deleteUser);

module.exports = router;
