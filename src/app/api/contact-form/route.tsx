import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const request = await req.json();

  // TO DO: use ENV Variables

  const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "g41659291@gmail.com",
      pass: "bjheahtzmirjizsh"
    }
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: 'g41659291@gmail.com', // sender address
    to: 'georgestaniland@gmail.com', // list of receivers
    replyTo: request.email,
    subject: 'New submission on Dev site', // Subject line
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
      return NextResponse.json(
        { error: true, emailSent: false, errors: [error] },
        { status: 500 }
      );
    });

}