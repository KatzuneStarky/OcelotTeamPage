import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'ocelotteam@gmail.com',
        to: email,
        subject: 'Email Confirmation',
        html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Email Confirmation</h2>
                    <p>Dear user,</p>
                    <p>Thank you for registering for our service. To complete your registration, please click the link below to confirm your email address:</p>
                    <p><a href="${confirmLink}">Click here</a></p>
                    <p>Please note that this link will expire in XX hours.</p>
                    <p>If you have not requested this registration, please ignore this email.</p>
                    <p>Thanks,<br>The ocelot team</p>
                </div>
            `
    })
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "ocelotteam@gmail.com",
        to: email,
        subject: "Reinicie su contraseña",
        html: `<p>Click <a href="${resetLink}" > here </a>to confirm recover your password</p>`,
    });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "ocelotteam@gmail.com",
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA code ${token}</p>`,
    });
};