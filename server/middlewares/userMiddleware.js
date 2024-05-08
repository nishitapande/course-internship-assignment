const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Course = require("../models/courseSchema");
//const nodemailer = require("nodemailer");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("User already exists");
    }
    // const hashPassword= await bcrypt.hash(password,10)
    const newUser = await User.create({
      name,
      email,
      password,
    });
    //await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = () => {
      if (password == user.password) {
        return true;
      } else {
        return false;
      }
    };
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);
    res.status(200).json({
      message: "User logged in",
      id: user._id,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCourseToUser = async (req, res) => {
  try {
    // Extract the user ID and course ID from the request body
    const { userId, courseId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // const course = await user.courses.find({ courseId });

    // if (course) {
    //   res.status(200).json(user, course);
    // }

    // Check if the course already exists in the user's courses
    if (user.courses.includes(courseId)) {
      return res.status(400).json({ message: "Course already added to user" });
    }

    // // Add the course ID to the user's courses array
    user.courses.push(courseId);
    course.students.push(userId);
    // User.findByIdAndUpdate(
    //   userId, // First argument should be the ID of the user
    //   { $push: { courses: courseId } }, // Second argument is the update operation
    //   { new: true } // Options object, if you want to return the updated document
    // );
    // // Save the updated user object
    user.save();
    course.save();

    // res.status(200).json({ message: "Course added successfully" });
    res.status(200).json({ message: "Course added successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserCourses = async (req, res) => {
  try {
    // Assuming you're passing the user's ID in the request
    const { userId } = req.params;

    // Find the user by ID and populate the 'courses' field to get the course details
    const user = await User.findById(userId).populate("courses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userId = res.locals.id;
    console.log(res.locals.id);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
