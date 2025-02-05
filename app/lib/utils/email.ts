import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Your verified domain or email in Resend
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Please click the following link to verify your email:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`,
    });

    console.log('Email sent:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
