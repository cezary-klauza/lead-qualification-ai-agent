import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport/index.js";

async function sendMail(mailOptions: MailOptions) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Use environment variable for SMTP host
    auth: {
      user: process.env.SMTP_USER, // Use environment variable for SMTP username
      pass: process.env.SMTP_PASS, // Use environment variable for SMTP password
    },
    port: 465, // Use environment variable if port needs to be dynamic
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM, // Use environment variable for sender email
    ...mailOptions,
  });

  transporter.close();
}

export default sendMail;
