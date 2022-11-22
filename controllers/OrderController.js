const jwt = require("jsonwebtoken");
const OrderModel = require("../models/OrderModel");

module.exports.addOrder = async (req, res) => {
  try {
    /**
     * @token JWT Token To Ensure That User Is Authorized ------------>
     */

    const { token } = req.headers;

    const isTokenVerified = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * @token JWT Token To Ensure That User Is Authorized ------------>
     */

    if (isTokenVerified) {
      const isOrderAdded = await OrderModel({});
      return res.status(200).json(isVerified.userId);
    }
  } catch (error) {
    return res.status(401).json({ error: true, msg: "Unauthorized" });
  }
};
module.exports.getOrders = async (req, res) => {
  try {
    /**
     * @token JWT Token To Ensure That User Is Authorized ------------>
     */

    const { token } = req.headers;

    const isTokenVerified = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * @token JWT Token To Ensure That User Is Authorized ------------>
     */

    if (isTokenVerified) {
      const orders = await OrderModel.find();
      return res.status(200).json({ error: false, orders });
    }
  } catch (error) {
    return res.status(401).json({ error: true, msg: "Unauthorized" });
  }
};
