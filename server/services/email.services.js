const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE_NAME,   // e.g. "gmail"
      port: process.env.EMAIL_PORT || 465, // 465 for secure, 587 for TLS
      secure: process.env.EMAIL_PORT == 465, // true for 465
      auth: {
        user: process.env.USER_EMAIL,      // your email
        pass: process.env.USER_PASSWORD,   // your email password / app password
      },
      tls: {
        rejectUnauthorized: false, // allow self-signed certs if needed
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,         // sender address
      to: options.email,                    // recipient(s)
      subject: options.subject,             // subject line
      text: options.message,                // plain text
      // html: options.html,                 // optional: send HTML mail
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
