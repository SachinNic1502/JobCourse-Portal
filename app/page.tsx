import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import JobCard from "@/components/jobs/job-card"
import CourseCard from "@/components/courses/course-card"
import { getLatestJobs } from "@/lib/jobs"
import { getLatestCourses } from "@/lib/courses"
import AdBanner from "@/components/ads/ad-banner"
import Navbar from "@/components/layout/navbar"

export const metadata: Metadata = {
  title: "JobCourse Portal - Home",
  description: "Discover the latest job opportunities and courses to advance your career",
}

export default async function Home() {
  const jobs = await getLatestJobs(6)
  const courses = await getLatestCourses(6)

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Find Your Next Career Opportunity</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest job opportunities and courses to help you advance your career and achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-8 text-center shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">Browse Jobs</h2>
            <p className="mb-6 text-muted-foreground">
              Find your next career opportunity from our curated list of job openings.
            </p>
            <Button asChild size="lg">
              <Link href="/jobs">Explore Jobs</Link>
            </Button>
          </div>
          <div className="bg-card rounded-lg p-8 text-center shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">Discover Courses</h2>
            <p className="mb-6 text-muted-foreground">
              Enhance your skills with professional courses from top providers.
            </p>
            <Button asChild size="lg">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="my-12 flex justify-center">
        <AdBanner adSlot="1234567890" width={728} height={90} />
      </div>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Jobs</h2>
          <Button asChild variant="outline">
            <Link href="/jobs">View All Jobs</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </section>

      <div className="my-12 flex justify-center">
        <AdBanner adSlot="0987654321" width={728} height={90} />
      </div>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Courses</h2>
          <Button asChild variant="outline">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
    </div>
  )
}
