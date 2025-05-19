import type { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import UserProfile from "@/components/profile/user-profile"
import UserStats from "@/components/profile/user-stats"
import CommunityLinks from "@/components/social/community-links"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <div className="space-y-8">
          <UserStats jobsApplied={5} coursesEnrolled={3} savedItems={12} daysActive={30} />

          <UserProfile user={session.user} />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Community Groups
              </CardTitle>
              <CardDescription>
                Join our community groups to connect with other professionals and learners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Stay updated on the latest job opportunities, get career advice, and connect with peers in your
                  industry.
                </p>
                <CommunityLinks
                  whatsappLink="https://chat.whatsapp.com/jobsgroup"
                  telegramLink="https://t.me/jobsgroup"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
