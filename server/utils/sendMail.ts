// import nodemailer ,{Transporter} from 'nodemailer'
// require('dotenv').config()
// import ejs from'ejs'
// import path from 'path'


// interface EmailOptions{
//     email:string
//     subject:string
//     templet:string
//     data:{[key:string] : any} 
// }

// const sendMail= async (options:EmailOptions):Promise<void>=>{
//     const transpoter:Transporter = nodemailer.createTransport({
//         host:process.env.SMTP_HOST,
//         port:parseInt(process.env.SMTP_PORT || '465'),
//         service:process.env.SMTP_SERVICE,
//         auth:{
//             user:process.env.SMTP_MAIL,
//             pass:process.env.SMTP_PASSWORD
//         }
//     })

//     const {email,subject,templet,data} = options;

//     const templetPath = path.join(__dirname,'../mails',templet)
//     const html:String= await ejs.renderFile(templetPath,data)

//     const mailOptions={
//         from:process.env.SMTP_MAIL || '',
//         to:email,
//         subject,
//         html
//     }
//     await transpoter.sendMail(mailOptions)
// }

// export default sendMail;

import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';

dotenv.config();

interface EmailOptions {
  email: string;
  subject: string;
  templet: string;
  data: { [key: string]: any };
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, templet, data } = options;

  const templatePath = path.join(__dirname, '../mails', templet);
  const html: string = await ejs.renderFile(templatePath, data); // Ensure this returns a string primitive.

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html, // Use string primitive here
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
