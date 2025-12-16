import express from "express";
const app = express();
const PORT = 3000;

app.get("/home", (req, res) => {
  res.send("welcome to express server");
});

app.listen(PORT, () => {
  console.log(`express server running on port ${PORT}`);
});
