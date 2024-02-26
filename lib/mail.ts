import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'grupodiaz@resend.dev',
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