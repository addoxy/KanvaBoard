import { db } from '@/lib/prisma';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  // delete the existing verification token if present
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // create new verification token
  try {
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        expires,
      },
    });

    return verificationToken;
  } catch (error) {
    throw error;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  // delete the existing password reset token if present
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // create new password reset token
  try {
    const passwordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        expires,
      },
    });

    return passwordResetToken;
  } catch (error) {
    throw error;
  }
};
