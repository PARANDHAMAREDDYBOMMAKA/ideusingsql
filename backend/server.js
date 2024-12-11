const express = require("express");
const cors = require("cors");
const { initDatabase } = require("./database");
const codeRoutes = require("./api/codeRoutes");

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.options("*", cors());

initDatabase();

app.use("/api/code", codeRoutes);

app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} request to ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
