import { NextResponse } from "next/server"
import crypto from "crypto"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/user"

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ message: "Token and password are required" }, { status: 400 })
    }

    await connectToDatabase()

    // Hash the token from the URL to compare with stored hash
    const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex")

    // Find user with matching token and valid expiry
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
    }

    // Update password and clear reset token fields
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 })
  } catch (error: any) {
    console.error("Reset password error:", error)
    return NextResponse.json({ message: "Error resetting password", error: error.message }, { status: 500 })
  }
}
