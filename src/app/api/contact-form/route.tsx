import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const request = await req.json();
  console.log(request)

  const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: "g41659291@gmail.com",
      pass: "%Z$8!*oNSS&P"
    }
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: 'g41659291@gmail.com', // sender address
    to: 'georgestaniland@gmail.com', // list of receivers
    replyTo: request.email,
    subject: request.message, // Subject line
    html: `<div>${request.message}</div>` // html body
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
      return NextResponse.json(
        { error: true, emailSent: false, errors: [error] },
        { status: 500 }
      );
    });

}