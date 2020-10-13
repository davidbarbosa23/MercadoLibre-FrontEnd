const express = require("express");
const cors = require("cors");

/**
 * Environment
 */
require("dotenv").config();

/**
 * App
 */
const app = express();
const port = process.env.PORT || 5000;

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());

/**
 * Routes
 */
const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

/**
 * Server
 */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
