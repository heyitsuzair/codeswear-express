const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { sendEmail } = require("../mail");

module.exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /**
     * @email Is Unique
     *
     * So If It Is Already In Database Return A 400 Bad Request With A Message
     */

    const isEmailAlreadyInDB = await UserModel.findOne({ email });

    if (isEmailAlreadyInDB) {
      return res
        .status(400)
        .json({ error: true, msg: "User With This Email Already Exists!" });
    }

    /**
     * @email Is Unique
     *
     * So If It Is Already In Database Return A 400 Bad Request With A Message
     */

    // Adding User Info To Database ---------------------------------------->
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const isUserAdded = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    // Adding User Info To Database ---------------------------------------->

    if (isUserAdded) {
      // Sending Email ------------------->
      sendEmail(
        email,
        "Signup On Codeswear!",
        "Congratulations You Have Successfully Signedup On Codeswear!"
      );
      // Sending Email ------------------->

      // Returning Response ---------------------------------------->
      return res.status(200).json({ error: false, msg: "User Created!" });
      // Returning Response ---------------------------------------->
    } else {
      // Returning Response ---------------------------------------->
      return res.status(400).json({ error: true, msg: "Something Went Wrong" });
      // Returning Response ---------------------------------------->
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
};
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    /**
     * Select User From DB By @email
     */

    const isUserAvailableInDB = await UserModel.findOne({ email });

    /**
     * If User Not Available In Database Return An Error ----------->
     */
    if (!isUserAvailableInDB) {
      return res.status(400).json({ error: true, msg: "User Doesnot Exists!" });
    }

    /**
     * If User Not Available In Database Return An Error ----------->
     */

    /**
     * If User Available In Database Then Execute The Code ----------->
     */

    /**
     * Authenticate User --------------->
     */

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserAvailableInDB.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: true, msg: "Invalid Credentials!" });
    }

    /**
     * Authenticate User --------------->
     */

    /**
     * Create @jwt Token --------------->
     */

    const jwtSecretKey = process.env.JWT_SECRET;
    const data = {
      userId: isUserAvailableInDB._id,
    };

    const token = jwt.sign(data, jwtSecretKey);

    /**
     * Create @jwt Token --------------->
     */

    /**
     * Return @response -------------->
     */

    return res.status(200).json({ error: false, token });

    /**
     * Return @response -------------->
     */

    /**
     * If User Available In Database Then Execute The Code ----------->
     */
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
};
