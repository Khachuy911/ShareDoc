var nodemailer = require('nodemailer');

module.exports = (option)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.MY_EMAIL,
        to: option.email,
        subject: 'Forgot password on ShareDocs website',
        text: `Click link here to reset password:  ${option.link}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
