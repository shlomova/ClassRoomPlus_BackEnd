const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');
const Course = require('../models/coursesModel');




exports.SendMailToTeacher = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.params;
    const course = await Course.findById(_id);
    const student = await User.findById(req.user._id);
    const teacher = await User.findById(course.userId);

    if (!course || !student || !teacher) {
      return res.status(404).json({
        status: 'fail',
        message: 'Course, student, or teacher not found',
      });
    }

    if (!process.env.EMAIL || !process.env.PASSWORD) {
      return res.status(500).json({
        status: 'fail',
        message: 'Email configuration is missing',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: teacher.email,
      subject: 'A Student Subscribed to Your Course',
      text: `${student.firstName,student.lastName} has subscribed to your course ${course.courseName}`,
      html: `
        <html>
          <body>
            <p>${student.firstName,student.lastName} has subscribed to your course: <strong>${course.courseName}</strong></p>
            <p>To approve the and set their role to student, please click the button below:</p>
            <a href="http://localhost:5173/approve?courseId=${course._id}&_id=${student._id}" style="text-decoration:none;">
            
              <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Approve</button>
            </a>
          </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
        return next(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({
          status: 'success',
          message: 'Email sent',
        });
      }
    });
  } catch (error) {
    console.error('Error in SendMailToTeacher:', error);
  
  }
});
