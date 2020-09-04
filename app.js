const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require('./config/config.json');

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb', extended: true}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});
// db.sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.dbName};`).then((res) => {
//   console.info("Database create or successfully checked");
//   process.exit(0);
// });

// defined routes in files
require("./routes/user.routes")(app);
require("./routes/category.routes")(app);
require("./routes/categoryContent.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});