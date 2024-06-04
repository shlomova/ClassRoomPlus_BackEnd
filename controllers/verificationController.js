const { createTransport } = require('nodemailer');
const dotenv = require('dotenv');
const User = require('../models/usersModel'); 
dotenv.config();
const axios = require('axios');

// יצירת טרנספורטר ל-Nodemailer
const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER, // משתמש מסודר לקובץ .env
        pass: process.env.EMAIL_PASS, // סיסמא מסודרת לקובץ .env
    },
});

// שליחת הודעת SMS
const sendSmsYML = async (phones, message) => {
    const url = 'https://www.call2all.co.il/ym/api/SendSms';
    const token = process.env.TOKEN_YML;

    try {
        const response = await axios.post(url, {
            token,
            phones,
            message,
        });

        if (response.data.success) {
            console.log('SMS sent successfully:', response.data);
        } else {
            console.log('Failed to send SMS:', response.data);
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};

// שליחת מייל עם קוד אימות
exports.sendVerification = async (req, res) => {
    const { email, phone } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // יצירת קוד אימות בן 6 ספרות

    try {
        // עדכן את קוד האימות במסד הנתונים
        await User.findOneAndUpdate(
            { email }, // חיפוש על פי כתובת הדוא"ל
            {
                code: verificationCode,
                codeCreatedAt: new Date() // זמן יצירת הקוד
            }
        );
        
        sendSmsYML(phone, `קוד האימות שלך הוא: ${verificationCode}`);

        // שליחת מייל עם קוד האימות
        const mailOptions = {
            from: 'אימות כניסה  cllasroomPlus<classroomplus28@gmail.com>',
            to: email,
            subject: `אימות מייל כניסה באתר`,
            text: `קוד האימות שלך הוא: ${verificationCode}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Failed to send email.');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Verification email sent.');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred.');
    }
};


// אימות קוד
exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;

    try {
        // חיפוש המשתמש על פי כתובת הדוא"ל והקוד
        const user = await User.findOne({ email, code });

        if (!user) {
            return res.status(400).send('Invalid verification code.');
        }

        // בדיקת תוקף הקוד
        if (!user.isCodeValid()) {
            return res.status(400).send('Verification code has expired.');
        }

        user.verify = true;
        user.code = '';
        user.codeCreatedAt = null; 


        await user.save();

        return res.status(200).send('Verification successful.');
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
};
