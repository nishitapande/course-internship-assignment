const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  courses: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "Course",
  },
});

userSchema.pre("save", async function () {
  if (this.isModified(this.password)) return next();
  this.password = await bcrypt.hash(this.password, 12);
});
const User = mongoose.model("User", userSchema);

module.exports = User;
