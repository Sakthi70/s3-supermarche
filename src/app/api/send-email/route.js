// app/api/send-email/route.js
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { email, subject, message,html } = await request.json();

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net', // OVH SMTP server
    port: 465, // Use 587 for TLS or 465 for SSL
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.OVH_EMAIL_USER, // your OVH email
      pass: process.env.OVH_EMAIL_PASS, // your OVH email password
    },
  });

  // Set up email data
  const mailOptions = {
    from: process.env.OVH_EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: message,
    html: html ?? message // plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
