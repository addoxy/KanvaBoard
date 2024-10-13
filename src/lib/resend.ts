import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_PUBLIC_URL}/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href=${confirmationLink}>here to confirm email</a></p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${process.env.NEXT_PUBLIC_URL}/new-password?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href=${resetPasswordLink}>here to reset password</a></p>`,
  });
};
