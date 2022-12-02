const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    products: [
      {
        products: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "Pending" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("orders", orderSchema);
