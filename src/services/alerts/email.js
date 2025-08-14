import nodemailer from "nodemailer";

// TODO: FINISH THIS HERE AND MAKE IN README AND TEST

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmailAlert(message) {
    if (!process.env.ALERT_EMAIL_TO) return;

    await transporter.sendMail({
        from: `"Alert System" <${process.env.EMAIL_USER}>`,
        to: process.env.ALERT_EMAIL_TO,
        subject: "🔥 Server Alert",
        text: message,
    });
}
