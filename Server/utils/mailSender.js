const nodemailer = require('nodemailer');
require('dotenv').config();



const mailSender = async(email, title, body) => {
    
    try{
            let transporter = nodemailer.createTransport({
                host : process.env.MAIL_HOST,
                port: 587, // 587 for TLS, 465 for SSL
                secure: false, // Use `true` for 465, `false` for other ports
                auth : {
                    user : process.env.MAIL_USER,
                    pass : process.env.MAIL_PASS
                }
            });
            

            // Ab Maal Send Karna Hai
            let info = await transporter.sendMail({
                from: process.env.MAIL_USER ,
                to: `${email}`,
                subject : `${title}`,
                html: `${body}`
            });
            // If Anyone Wants Then Use That 
            console.log(info);
            return info;
    }
    catch(error) {
        console.error(error);
        console.log("ErroR in Sending Mail")
    }
};

module.exports = mailSender;


// We Using Tha that MAIL sender for Sending  eMAIL