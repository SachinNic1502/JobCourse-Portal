import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "@/lib/db"
import Course from "@/models/course"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is an admin
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const courseData = await request.json()

    await connectToDatabase()

    // Update course
    const course = await Course.findByIdAndUpdate(id, courseData, { new: true })

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        message: "Course updated successfully",
        course: {
          _id: course._id,
          title: course.title,
          provider: course.provider,
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error(`Error updating course with id ${params.id}:`, error)
    return NextResponse.json({ message: "Error updating course", error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is an admin
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    await connectToDatabase()

    // Delete course
    const course = await Course.findByIdAndDelete(id)

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 })
  } catch (error: any) {
    console.error(`Error deleting course with id ${params.id}:`, error)
    return NextResponse.json({ message: "Error deleting course", error: error.message }, { status: 500 })
  }
}
