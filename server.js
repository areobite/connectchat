const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ConnectChat API is running!");
});

app.post("/api/test", (req, res) => {
  res.json({
    message: "Data received!",
    data: req.body
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
