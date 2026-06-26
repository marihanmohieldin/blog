const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectToDB } = require("./config/connectToDB");
const helmet = require("helmet");
const rateLimting = require("express-rate-limit");
const { errorHandler, notFound } = require("./middlewares.js/error");
connectToDB();
const app = express();
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      },
    },
  }),
);

// Rate Limting
app.use(
  rateLimting({
    windowMs: 10 * 60 * 1000,
    max: 100,
  }),
);

// cors policy
app.use(cors());

// Routes
app.use("/api/auth", require("./routes.js/authRoute"));
app.use("/api/users", require("./routes.js/usersRoute"));
app.use("/api/posts", require("./routes.js/postsRout"));
app.use("/api/comments", require("./routes.js/commentsRoute"));
app.use("/api/categories", require("./routes.js/categoriesRoute"));
app.use("/api/password", require("./routes.js/passwordRoute"));

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`),
);

module.exports = app;
