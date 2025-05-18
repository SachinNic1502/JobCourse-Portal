import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "@/lib/db"
import Job from "@/models/job"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is an admin
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const jobData = await request.json()

    await connectToDatabase()

    // Update job
    const job = await Job.findByIdAndUpdate(id, jobData, { new: true })

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        message: "Job updated successfully",
        job: {
          _id: job._id,
          title: job.title,
          company: job.company,
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error(`Error updating job with id ${params.id}:`, error)
    return NextResponse.json({ message: "Error updating job", error: error.message }, { status: 500 })
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

    // Delete job
    const job = await Job.findByIdAndDelete(id)

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 })
  } catch (error: any) {
    console.error(`Error deleting job with id ${params.id}:`, error)
    return NextResponse.json({ message: "Error deleting job", error: error.message }, { status: 500 })
  }
}
