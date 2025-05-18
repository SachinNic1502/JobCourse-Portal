import { connectToDatabase } from "@/lib/db"
import Job, { type IJob } from "@/models/job"

export async function getLatestJobs(limit = 6): Promise<IJob[]> {
  try {
    await connectToDatabase()
    const jobs = await Job.find({}).sort({ createdAt: -1 }).limit(limit).lean()

    return JSON.parse(JSON.stringify(jobs))
  } catch (error) {
    console.error("Error fetching latest jobs:", error)
    return []
  }
}

export async function getAllJobs(page = 1, limit = 10): Promise<{ jobs: IJob[]; totalPages: number }> {
  try {
    await connectToDatabase()

    const skip = (page - 1) * limit
    const totalJobs = await Job.countDocuments({})
    const totalPages = Math.ceil(totalJobs / limit)

    const jobs = await Job.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

    return {
      jobs: JSON.parse(JSON.stringify(jobs)),
      totalPages,
    }
  } catch (error) {
    console.error("Error fetching all jobs:", error)
    return { jobs: [], totalPages: 0 }
  }
}

export async function getJobById(id: string): Promise<IJob | null> {
  try {
    await connectToDatabase()
    const job = await Job.findById(id).lean()

    if (!job) return null

    return JSON.parse(JSON.stringify(job))
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error)
    return null
  }
}

export async function createJob(jobData: Omit<IJob, "_id" | "createdAt">): Promise<IJob | null> {
  try {
    await connectToDatabase()
    const job = await Job.create(jobData)
    return JSON.parse(JSON.stringify(job))
  } catch (error) {
    console.error("Error creating job:", error)
    return null
  }
}

export async function updateJob(id: string, jobData: Partial<IJob>): Promise<IJob | null> {
  try {
    await connectToDatabase()
    const job = await Job.findByIdAndUpdate(id, jobData, { new: true }).lean()

    if (!job) return null

    return JSON.parse(JSON.stringify(job))
  } catch (error) {
    console.error(`Error updating job with id ${id}:`, error)
    return null
  }
}

export async function deleteJob(id: string): Promise<boolean> {
  try {
    await connectToDatabase()
    const result = await Job.findByIdAndDelete(id)
    return !!result
  } catch (error) {
    console.error(`Error deleting job with id ${id}:`, error)
    return false
  }
}
