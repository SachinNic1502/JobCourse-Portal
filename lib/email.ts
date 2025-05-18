import nodemailer from "nodemailer"

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: process.env.NODE_ENV === "production",
})

export async function sendPasswordResetEmail(email: string, name: string, resetUrl: string) {
  const mailOptions = {
    from: `"JobCourse Portal" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset Your Password</h2>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
        </div>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>Best regards,<br>JobCourse Portal Team</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

export async function sendNewContentNotification(
  email: string,
  name: string,
  contentType: "job" | "course",
  content: {
    title: string
    description: string
    url: string
  },
) {
  const contentTypeCapitalized = contentType.charAt(0).toUpperCase() + contentType.slice(1)

  const mailOptions = {
    from: `"JobCourse Portal" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `New ${contentTypeCapitalized} Added: ${content.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New ${contentTypeCapitalized} Added</h2>
        <p>Hello ${name},</p>
        <p>A new ${contentType} has been added to JobCourse Portal that might interest you:</p>
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <h3 style="margin-top: 0;">${content.title}</h3>
          <p>${content.description.substring(0, 150)}${content.description.length > 150 ? "..." : ""}</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${content.url}" style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">View Details</a>
          </div>
        </div>
        <p>Best regards,<br>JobCourse Portal Team</p>
        <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
          If you no longer wish to receive these notifications, you can update your preferences in your account settings.
        </p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}
