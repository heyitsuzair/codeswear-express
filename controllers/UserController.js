const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

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
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.AUTH_NODEMAILER_USER,
          pass: process.env.AUTH_NODEMAILER_PASSWORD,
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
      });

      var mailOptions = {
        from: "Codeswear " + process.env.AUTH_NODEMAILER_USER,
        to: email,
        subject: "Signup On Codeswear",
        text: "Congratulations! You Have Successfully Signed Up On Codeswear.",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        }
      });
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
