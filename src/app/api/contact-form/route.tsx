import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const request = await req.json();
  // Not working currently :(
  console.log('post function')
  console.log(process.env.EMAIL_USER)
  console.log(process.env.EMAIL_PASS)
  const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.SENDER, // sender address
    to: process.env.RECEIVER, // list of receivers
    replyTo: request.email,
    subject: 'New submission on Dev site',
    html: `
    <div>
    <h4>Name: ${request.name}</h4>
    <h4>Email: ${request.email}</h4>
    <p>${request.message}</p>
    </div>`
  };

  return await transporter
    .sendMail(mailOptions)
    .then((response: nodemailer.SentMessageInfo) => {
      return NextResponse.json(
        { error: false, emailSent: true, errors: [], response },
        { status: 200 }
      );
    })
    .catch((error: nodemailer.SentMessageInfo) => {
      console.log(error)
      console.log('server side error')
      return NextResponse.json(
        { error: true, emailSent: false, errors: [error] },
        { status: 500 }
      );
    });

}