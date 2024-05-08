const express = require("express");
const cors = require("cors");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");
const authUtil = require("../util/authUtil");
const corsMiddleware = require("../middlewares/corsMiddleware");

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
router.get("/", corsMiddleware, authUtil.protect, userMiddleware.getUser);
router.get(
  "/:userId/courses",
  corsMiddleware,
  authUtil.protect,
  userMiddleware.getUserCourses
);
router.post("/register", corsMiddleware, userMiddleware.createUser);
router.post("/login", corsMiddleware, userMiddleware.loginUser);
router.patch(
  "/:userId/:courseId",
  corsMiddleware,
  authUtil.protect,
  userMiddleware.addCourseToUser
);

module.exports = router;
