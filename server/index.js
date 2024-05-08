const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/dbConfig");
const courseRoute = require("./routes/courseRoutes");
const userRoute = require("./routes/userRoutes");
const corsMiddleware = require("./middlewares/corsMiddleware");
env.config();

connectDb();

const app = express();
app.use(cookieParser());

app.use(express.json());

//const allowedOrigins = "http://localhost:3000";

// Middleware to enable CORS with specific origins
app.use(corsMiddleware);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials (cookies) to be sent and received
  })
);

app.get("/", (req, res, next) => {
  res.json({
    message: "Api is running",
  });
});

app.use("/v1/api/user", userRoute);
app.use("/v1/api/course", courseRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
