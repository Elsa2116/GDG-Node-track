import express from "express";
const app = express();
const PORT = 5000;

app.get("/home", (req, res) => {
  res.status(200).type("text/plain").send("yeah it is me");
});

app.get("about", (req, res) => {
  res.status(200).type("text/html").send("<h1>welcome</h1");
});
app.listen(PORT, () => {
  console.log(`i am listening talk to me ${PORT}`);
});
