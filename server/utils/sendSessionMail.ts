import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';

dotenv.config();

interface SessionOptions {
  email: string;
  subject: string;
  data: { [key: string]: any };
}

const sendSessionMail = async (options: SessionOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, data } = options;

  // Define the correct path to the email template
  const templatePath = path.join(__dirname, '../mails/session-mail.ejs');

  // Render the EJS template with session data
  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendSessionMail;
