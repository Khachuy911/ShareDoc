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
        subject: 'ShaDoc',
        text: `Ấn vào đường đường dẫn để lấy lại mật khẩu (Đường dẫn tồn tại trong 15 phút):  ${option.link}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
