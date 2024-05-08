const express = require("express");
const cors = require("cors");
const router = express.Router();
const courseMiddleware = require("../middlewares/courseMiddleware");
const authUtil = require("../util/authUtil");
const corsMiddleware = require("../middlewares/corsMiddleware");
router.use(cors());

router.get("/", corsMiddleware, courseMiddleware.getAllCourses);
router.get("/:id", corsMiddleware, courseMiddleware.getCourseById);


router.post(
  "/create-course",
  corsMiddleware,
  authUtil.protect,
  courseMiddleware.createCourse
);

module.exports = router;
