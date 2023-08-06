const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "mdm326040@gmail.com",
      pass: "fHdgQPBDhYZxcEMa",
    },
  });

  const mailOptions = {
    from: "mdm326040@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendMail;
