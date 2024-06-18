const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
const mongo_db = process.env.MONGO_DB;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors());
app.use(cookieParser());

routes(app);

mongoose
  .connect(mongo_db)
  .then(() => {
    console.log("Success DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("running" + port);
});
