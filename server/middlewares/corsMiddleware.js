module.exports = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // If you're allowing credentials
  next();
};
