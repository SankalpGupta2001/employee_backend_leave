const nodemailer = require('nodemailer');

const sendEmail = async (leaveRequest) => {
  try {
   
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host: 'saralgupta2001@gmail.com',
        port: 587,
        auth: {
            user: 'saralgupta2001@gmail.com',
            
            pass:'typvcveffjioarhv'
        }
    });

    const mailOptions = {
      from: 'saralgupta2001@gmail.com', 
      to: 'social@goismo.com',  
      subject: 'Leave Request Submitted',
      text: `Leave request submitted:\n\n${JSON.stringify(leaveRequest, null, 2)}`,

    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
