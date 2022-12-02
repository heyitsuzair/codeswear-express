const jwt = require("jsonwebtoken");
const OrderModel = require("../models/OrderModel");
const stripe = require("stripe")(process.env.STRIPE_SK);
const { sendEmail } = require("../mail");

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

    const { email, card_no, card_exp, card_cvc, card_year } = req.body;

    if (isTokenVerified) {
      // Stripe Card Payment ---------------->
      const stripetoken = await stripe.tokens.create({
        card: {
          number: card_no,
          exp_month: card_exp,
          exp_year: card_year,
          cvc: card_cvc,
        },
      });

      const charge = await stripe.charges.create({
        amount: 500000,
        currency: "pkr",
        description: "Example Desc",
        source: stripetoken.id,
        metadata: { order_id: "6735" },
      });
      // Stripe Card Payment ---------------->

      const isOrderAdded = await OrderModel({});

      sendEmail(
        email,
        "Receipt Of Payment",
        "Your Receipt For Payment On Codeswear " + charge.receipt_url
      );
      return res.status(200).json({
        error: false,
        hasBeenCharged: charge.paid,
        receipt_url: charge.receipt_url,
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: true,
      msg: error.raw ? error.raw.message : "Unauthorized",
    });
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
