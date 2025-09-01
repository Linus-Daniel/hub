import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("Email server connection error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

export default transporter;
