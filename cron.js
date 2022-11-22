const UserModel = require("./models/UserModel");
const { sendEmail } = require("./mail");
// Cron JOB ------------------>

var cron = require("node-cron");
// Perform On Every Sunday At 8:05 pm --------->
cron.schedule("5 20 * * 0", async () => {
  const users = await UserModel.find().select("-password");

  users.forEach((user) => {
    sendEmail(
      user.email,
      "Flat 50% Discount",
      "Get Flat 50% Discount On All Codeswear Product!"
    );
  });
});
// Perform On Every Sunday At 8:05 pm ---------->

// Cron JOB ------------------>
