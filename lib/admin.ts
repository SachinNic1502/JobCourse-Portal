import { connectToDatabase } from "@/lib/db"
import Job from "@/models/job"
import Course from "@/models/course"
import User from "@/models/user"

export async function getDashboardStats() {
  try {
    await connectToDatabase()

    // Get counts
    const jobsCount = await Job.countDocuments({})
    const coursesCount = await Course.countDocuments({})
    const usersCount = await User.countDocuments({})

    // Get recent counts (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentJobsCount = await Job.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    })

    const recentCoursesCount = await Course.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    })

    const recentUsersCount = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    })

    return {
      jobsCount,
      coursesCount,
      usersCount,
      recentJobsCount,
      recentCoursesCount,
      recentUsersCount,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return {
      jobsCount: 0,
      coursesCount: 0,
      usersCount: 0,
      recentJobsCount: 0,
      recentCoursesCount: 0,
      recentUsersCount: 0,
    }
  }
}
