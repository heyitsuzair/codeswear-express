const nodemailer = require("nodemailer");
module.exports.sendEmail = (email, subject, text) => {
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
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
  // Sending Email ------------------->
};
