require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 2020;
const host = "localhost";
const routes = require("./router/routes");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use("/api", routes);

mongoose
  .connect(
    "mongodb+srv://admin:helloworld@edureka.wtadj.mongodb.net/TestDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => {
    app.listen(port, host, () => {
      console.log(`Server Running at - ${host}:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });