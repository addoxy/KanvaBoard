import { ResetPasswordEmail } from '@/components/email-templates/reset-password';
import { VerificationEmail } from '@/components/email-templates/verification-email';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_PUBLIC_URL}/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'KanvaBoard <kanvaboard@addoxy.me>',
    to: email,
    subject: 'Verify your email',
    react: VerificationEmail({ verificationEmailLink: confirmationLink }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${process.env.NEXT_PUBLIC_URL}/new-password?token=${token}`;

  const response = await resend.emails.send({
    from: 'KanvaBoard <kanvaboard@addoxy.me>',
    to: email,
    subject: 'Reset your password',
    react: ResetPasswordEmail({ resetPasswordLink }),
  });
  console.log(response);
};
