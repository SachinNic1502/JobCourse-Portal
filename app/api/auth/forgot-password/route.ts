import { NextResponse } from "next/server"
import crypto from "crypto"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/user"
import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    await connectToDatabase()

    // Find user by email
    const user = await User.findOne({ email })

    // If user doesn't exist, still return success to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        { message: "If an account with that email exists, a password reset link has been sent" },
        { status: 200 },
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex")

    // Save token to user
    user.resetPasswordToken = resetTokenHash
    user.resetPasswordExpires = new Date(Date.now() + 3600000) // 1 hour
    await user.save()

    // Send email with reset link
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${resetToken}`
    await sendPasswordResetEmail(user.email, user.name, resetUrl)

    return NextResponse.json(
      { message: "If an account with that email exists, a password reset link has been sent" },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "Error processing request", error: error.message }, { status: 500 })
  }
}
