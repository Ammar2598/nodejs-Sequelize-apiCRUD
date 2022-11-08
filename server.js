const express = require("express");
const app = express();
const db = require("./models");
const userRoutes = require("./routers/user-routes");
const productRoutes = require("./routers/product-routes");
const profileRoutes = require("./routers/profile-routes");

//handle data encoded or json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", profileRoutes);
app.use((req, res, next) => {
  //allow any port in front
  res.setHeader("Access-Control-Allow-Origin", "*");
  //allow any request method
  res.setHeader("Access-Control-Request-Methods", "*");
  //allow any header
  res.setHeader("Access-Control-Allow-Headers", "*");
  //allow any  method
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});
//connection
db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log("server is running on port 3000"));
});
