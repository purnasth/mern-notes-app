const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
