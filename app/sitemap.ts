import type { MetadataRoute } from "next"
import { getAllJobs } from "@/lib/jobs"
import { getAllCourses } from "@/lib/courses"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobcourseportal.com"

  // Get all jobs and courses
  const { jobs } = await getAllJobs(1, 1000)
  const { courses } = await getAllCourses(1, 1000)

  // Static routes
  const routes = ["", "/jobs", "/courses", "/auth/login", "/auth/register", "/auth/forgot-password"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Job routes
  const jobRoutes = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job._id}`,
    lastModified: new Date(job.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Course routes
  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course._id}`,
    lastModified: new Date(course.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...routes, ...jobRoutes, ...courseRoutes]
}
