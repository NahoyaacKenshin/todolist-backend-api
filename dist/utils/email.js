import nodemailer from "nodemailer";
import { ENV } from "../config/env";
const transporter = nodemailer.createTransport({
    host: ENV.SMTP.HOST,
    port: ENV.SMTP.PORT,
    secure: ENV.SMTP.PORT === 465,
    auth: {
        user: ENV.SMTP.USER,
        pass: ENV.SMTP.PASS,
    },
});
export const sendVerificationEmail = async (email, verificationToken) => {
    const verificationLink = `${ENV.BACKEND_URL}/api/auth/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
        from: ENV.SMTP.FROM,
        to: email,
        subject: "Verify Your Email Address",
        html: `
      <h2>Email Verification</h2>
      <p>Thank you for signing up! Please verify your email address by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${verificationLink}</p>
      <p>This link expires in 24 hours.</p>
    `,
    });
};
export const sendWelcomeEmail = async (email) => {
    await transporter.sendMail({
        from: ENV.SMTP.FROM,
        to: email,
        subject: "Welcome to Task Manager!",
        html: `
      <h2>Welcome to Task Manager!</h2>
      <p>Your email has been verified successfully. You can now log in and start managing your tasks.</p>
      <p>Happy task managing!</p>
    `,
    });
};
//# sourceMappingURL=email.js.map