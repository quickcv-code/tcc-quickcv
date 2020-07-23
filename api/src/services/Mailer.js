const nodemailer = require('nodemailer');



const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "quickcvnotreply@gmail.com",
      pass: "quickcv123"
    }
  });

  module.exports = transport;