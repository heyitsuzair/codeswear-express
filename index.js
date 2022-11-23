const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const productRoutes = require("./routes/ProductsRoute");
const userRoutes = require("./routes/UserRoute");
const orderRoutes = require("./routes/OrderRoute");

const app = express();
require("./cron");

app.use(cors());
app.use(express.json());

app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log("Connected");
});
