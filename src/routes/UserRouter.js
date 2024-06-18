const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {
  adminRoleMiddleware,
  userRoleMiddleware,
} = require("../middleware/authMiddleware");

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.logInUser);
router.post("/log-out", UserController.logOutUser);

router.put("/update-user/:id", userRoleMiddleware, UserController.updateUser);
router.delete(
  "/delete-user/:id",
  adminRoleMiddleware,
  UserController.deleteUser
);
router.get("/get-detail/:id", userRoleMiddleware, UserController.getDetail);

router.get("/get-all-user", adminRoleMiddleware, UserController.getAllUser);
router.post("/refresh-token", UserController.refreshToken);

module.exports = router;
