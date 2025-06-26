const { Router } = require("express");
const {
  createUser,
  deleteById,
  updateById,
  findAll,
} = require("../controller/user.controller");

const router = Router();

router.get("/", findAll);

router.post("/", createUser);

router.delete("/:id", deleteById);

router.patch("/:id", updateById);

module.exports = router;
