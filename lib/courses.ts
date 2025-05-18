import { connectToDatabase } from "@/lib/db"
import Course, { type ICourse } from "@/models/course"

export async function getLatestCourses(limit = 6): Promise<ICourse[]> {
  try {
    await connectToDatabase()
    const courses = await Course.find({}).sort({ createdAt: -1 }).limit(limit).lean()

    return JSON.parse(JSON.stringify(courses))
  } catch (error) {
    console.error("Error fetching latest courses:", error)
    return []
  }
}

export async function getAllCourses(page = 1, limit = 10): Promise<{ courses: ICourse[]; totalPages: number }> {
  try {
    await connectToDatabase()

    const skip = (page - 1) * limit
    const totalCourses = await Course.countDocuments({})
    const totalPages = Math.ceil(totalCourses / limit)

    const courses = await Course.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

    return {
      courses: JSON.parse(JSON.stringify(courses)),
      totalPages,
    }
  } catch (error) {
    console.error("Error fetching all courses:", error)
    return { courses: [], totalPages: 0 }
  }
}

export async function getCourseById(id: string): Promise<ICourse | null> {
  try {
    await connectToDatabase()
    const course = await Course.findById(id).lean()

    if (!course) return null

    return JSON.parse(JSON.stringify(course))
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error)
    return null
  }
}

export async function createCourse(courseData: Omit<ICourse, "_id" | "createdAt">): Promise<ICourse | null> {
  try {
    await connectToDatabase()
    const course = await Course.create(courseData)
    return JSON.parse(JSON.stringify(course))
  } catch (error) {
    console.error("Error creating course:", error)
    return null
  }
}

export async function updateCourse(id: string, courseData: Partial<ICourse>): Promise<ICourse | null> {
  try {
    await connectToDatabase()
    const course = await Course.findByIdAndUpdate(id, courseData, { new: true }).lean()

    if (!course) return null

    return JSON.parse(JSON.stringify(course))
  } catch (error) {
    console.error(`Error updating course with id ${id}:`, error)
    return null
  }
}

export async function deleteCourse(id: string): Promise<boolean> {
  try {
    await connectToDatabase()
    const result = await Course.findByIdAndDelete(id)
    return !!result
  } catch (error) {
    console.error(`Error deleting course with id ${id}:`, error)
    return false
  }
}
