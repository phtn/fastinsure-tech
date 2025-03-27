import { send } from '@/lib/email';
import { ActivationEmail } from '@/app/comp/email-templates/activation';
import { NextResponse } from 'next/server';
import { type EmailContext } from '@/lib/email/schema';
import { env } from '@/env';

export async function POST(req: Request) {
  const apikey = req.headers.get('x-api-key');
  if (!apikey) {
    return NextResponse.json({message: "API key is required."}, {status: 400});
  }
  if (apikey !== env.RE_UP_SECURE_API_KEY) {
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }

  const { email, name, subject, type, text } = await req.json() as EmailContext;
  if (!email) {
    return NextResponse.json({message: "Email address is required."})
  }

  const template = async (type: string) => {
    switch(type) {
      case 'activation':
        return ActivationEmail({ code: text });
      default:
        return ActivationEmail({ code: name });
    }
  }

  try {
    const { data, error } = await send({
      from: 'FastInsure Technologies <hq@bigticket.ph>',
      to: [email],
      subject: subject,
      react: await template(type),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }


  // return NextResponse.json({email, name, subject, message: "Email sent successfully."})
}
