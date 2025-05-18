import type { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import UserProfile from "@/components/profile/user-profile"

export const metadata: Metadata = {
  title: "Your Profile - JobCourse Portal",
  description: "Manage your profile and account settings",
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/profile")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <UserProfile user={session.user} />
      </div>
    </div>
  )
}
