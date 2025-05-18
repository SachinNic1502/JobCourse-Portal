import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "@/lib/db"
import Job from "@/models/job"
import User from "@/models/user"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { sendNewContentNotification } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is an admin
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const jobData = await request.json()

    await connectToDatabase()

    // Create new job
    const job = await Job.create(jobData)

    // Send email notifications to all users
    const users = await User.find({})

    // Create the job URL
    const jobUrl = `${process.env.NEXT_PUBLIC_APP_URL}/jobs/${job._id}`

    // Send notifications in the background
    Promise.all(
      users.map((user) =>
        sendNewContentNotification(user.email, user.name, "job", {
          title: job.title,
          description: job.description,
          url: jobUrl,
        }).catch((error) => {
          console.error(`Failed to send email to ${user.email}:`, error)
        }),
      ),
    ).catch((error) => {
      console.error("Error sending notifications:", error)
    })

    return NextResponse.json(
      {
        message: "Job created successfully",
        job: {
          _id: job._id,
          title: job.title,
          company: job.company,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Error creating job:", error)
    return NextResponse.json({ message: "Error creating job", error: error.message }, { status: 500 })
  }
}
