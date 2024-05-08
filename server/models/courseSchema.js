const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A course must have a name"],
  },
  instructor: {
    type: String,
    required: [true, "A course must have an instructor"],
  },
  description: {
    type: String,
    required: [true, "A course must have a description"],
  },
  enrollmentStatus: {
    type: String,
    required: [true, "A course must have an enrollment status"],
    enum: ["open", "closed", "In Process"],
    default: "open",
  },
  thumbnail: {
    type: String,
    required: [true, "A course must have a thumbnail"],
  },
  duration: {
    type: String,
    required: [true, "A course must have a duration"],
  },
  schedule: {
    type: String,
    //required: [true, "A course must have a schedule"],
  },
  location: {
    type: String,
    required: [true, "A course must have a location"],
    emum: ["Online", "Offline"],
  },
  prerequisities: {
    type: Array,
    //required: [true, "A course must have a prerequisities"],
  },
  syllabus: {
    type: Array,
    required: [true, "A course must have a syllabus"],
  },
  students: {
    type: Array,
    //required: [true, "A course must have a students"],
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
