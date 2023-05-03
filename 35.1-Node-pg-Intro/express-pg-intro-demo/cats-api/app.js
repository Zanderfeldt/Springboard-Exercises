/** Express app for cats. */

const express = require("express");
const app = express();
const catRoutes = require("./routes/cats");
const ExpressError = require("./expressError");

app.use(express.json());

app.use("/cats", catRoutes);

/** 404 catch --- passes to next handler. */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass err to the next middleware
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});


module.exports = app;
