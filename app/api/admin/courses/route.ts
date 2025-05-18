import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "@/lib/db"
import Course from "@/models/course"
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

    const courseData = await request.json()

    await connectToDatabase()

    // Create new course
    const course = await Course.create(courseData)

    // Send email notifications to all users
    const users = await User.find({})

    // Create the course URL
    const courseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course._id}`

    // Send notifications in the background
    Promise.all(
      users.map((user) =>
        sendNewContentNotification(user.email, user.name, "course", {
          title: course.title,
          description: course.description,
          url: courseUrl,
        }).catch((error) => {
          console.error(`Failed to send email to ${user.email}:`, error)
        }),
      ),
    ).catch((error) => {
      console.error("Error sending notifications:", error)
    })

    return NextResponse.json(
      {
        message: "Course created successfully",
        course: {
          _id: course._id,
          title: course.title,
          provider: course.provider,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Error creating course:", error)
    return NextResponse.json({ message: "Error creating course", error: error.message }, { status: 500 })
  }
}
