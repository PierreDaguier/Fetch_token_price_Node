// front user login

const express = require("express");
const bodyParser = require("body-parser");

const app = express();


const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
}); 

