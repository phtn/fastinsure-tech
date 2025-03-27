// import { ActivationEmail } from '@/app/comp/email-templates/activation';
// import { send } from '@/lib/email';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, name, subject } = await req.json() as { email: string, name: string, subject: string };
  if (!email) {
    return NextResponse.json({message: "Email address is required."})
  }

  return NextResponse.json({email, name, subject, message: "Email sent successfully."})

  // try {
  //   const { data, error } = await send({
  //     from: 'BigTicket <hq@bigticket.ph>',
  //     to: ['phtn458@gmail.com', email],
  //     subject: subject,
  //     react: await ActivationEmail({ firstName: name }),
  //   });

  //   if (error) {
  //     return Response.json({ error }, { status: 500 });
  //   }

  //   return Response.json(data);
  // } catch (error) {
  //   return Response.json({ error }, { status: 500 });
  // }
}
