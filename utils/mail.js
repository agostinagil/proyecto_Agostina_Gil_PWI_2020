"use strict";
const nodemailer = require ('nodemailer');


async function main(obj) {

  try {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP,
        port: process.env.PORT_MAIL,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.USER_MAIL, // generated ethereal user
          pass: process.env.PASSWORD_MAIL, // generated ethereal password
        },
        
        tls:{
            rejectUnauthorized: false
        }  
    });
    
    let info = await transporter.sendMail({
        to: obj.to,
        subject: obj.subject, // Subject line
        html: obj.html, // html body
    });
    
    console.log("Message sent: %s", info.messageId);

    return info.messageId;

  } catch (error) {
      console.log(error)
    }

}

module.exports = {
    main
}
