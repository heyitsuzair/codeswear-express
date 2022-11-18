const ProductModel = require("../models/ProductModel");

module.exports.addProduct = async (req, res) => {
  try {
    const {
      title,
      desc,
      img,
      category,
      size,
      color,
      price,
      availableQty,
      slug,
    } = req.body;

    /**
     * @slug Slug Is Unique For Each Product So Validate That It Should Not Already Exists
     *
     * If Slug Already Exists. Return An Error Else Insert Data In Database
     */

    const isSlugAlreadyInDB = await ProductModel.findOne({ slug });

    if (isSlugAlreadyInDB) {
      return res.status(400).json({ error: true, msg: "Slug Must Be Unique!" });
    }

    const isProductAdded = await ProductModel.create({
      title,
      desc,
      img,
      category,
      size,
      color,
      price,
      availableQty,
      slug,
    });
    if (isProductAdded) {
      return res.status(200).json({ error: false, msg: "Product Added!" });
    } else {
      return res.status(400).json({ error: true, msg: "Something Went Wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const {
      title,
      desc,
      img,
      category,
      size,
      color,
      price,
      availableQty,
      slug,
    } = req.body;
    const { id } = req.params;

    const isProductUpdated = await ProductModel.findByIdAndUpdate(id, {
      title,
      desc,
      img,
      category,
      size,
      color,
      price,
      availableQty,
      slug,
    });
    if (isProductUpdated) {
      return res.status(200).json({ error: false, msg: "Product Updated!" });
    } else {
      return res.status(400).json({ error: true, msg: "Something Went Wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
};
module.exports.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    return res.status(200).json({ error: false, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
};
module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const isProductDeleted = await ProductModel.findByIdAndDelete(id);
    if (isProductDeleted) {
      return res.status(200).json({ error: false, msg: "Product Deleted!" });
    } else {
      return res.status(400).json({ error: true, msg: "Something Went Wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
};
