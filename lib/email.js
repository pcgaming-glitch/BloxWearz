import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "BloxWears@gmail.com",
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function send2FA(email, code) {
  await transporter.sendMail({
    from: "BloxWearz <BloxWears@gmail.com>",
    to: email,
    subject: "Your BloxWearz 2FA Code",
    text: `Your login code is: ${code}`
  });
}

export async function sendSupportConfirmation(email, username, category) {
  await transporter.sendMail({
    from: "BloxWearz <BloxWears@gmail.com>",
    to: email,
    subject: "We received your help request",
    text: `
Hello ${username},

We just have received your help request for the category ${category}.

This is an automatic mail, please don’t reply to this message.

Kind regards,
BloxWearz.
`
  });
}
