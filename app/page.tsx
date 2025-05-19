import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import JobCard from "@/components/jobs/job-card"
import CourseCard from "@/components/courses/course-card"
import { getLatestJobs } from "@/lib/jobs"
import { getLatestCourses } from "@/lib/courses"
import AdBanner from "@/components/ads/ad-banner"
import { ArrowRight, Briefcase, GraduationCap, Search, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import FeaturedSection from "@/components/home/featured-section"

export const metadata: Metadata = {
  title: "JobCourse Portal - Home",
  description: "Discover the latest job opportunities and courses to advance your career",
}

export default async function Home() {
  const jobs = await getLatestJobs(6)
  const courses = await getLatestCourses(6)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Find Your Next <span className="text-primary">Career Opportunity</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover the latest job opportunities and courses to help you advance your career and achieve your
                goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/jobs">
                    <Briefcase className="h-5 w-5" />
                    Explore Jobs
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <Link href="/courses">
                    <GraduationCap className="h-5 w-5" />
                    Browse Courses
                  </Link>
                </Button>
              </div>
              <div className="relative mt-8">
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Search for jobs or courses..."
                    className="rounded-r-none h-12 pl-4 pr-12 text-base"
                  />
                  <Button className="rounded-l-none h-12 px-6">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Popular:</span>
                  <Link href="/jobs?category=software-development" className="text-sm text-primary hover:underline">
                    Software Development
                  </Link>
                  <Link href="/jobs?category=design" className="text-sm text-primary hover:underline">
                    Design
                  </Link>
                  <Link href="/courses?category=data-science" className="text-sm text-primary hover:underline">
                    Data Science
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Career opportunities"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">1,000+</p>
              <p className="text-muted-foreground">Active Jobs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-muted-foreground">Courses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">10,000+</p>
              <p className="text-muted-foreground">Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedSection />

      <div className="container mx-auto px-4 py-12">
        <div className="my-12 flex justify-center">
          <AdBanner adSlot="1234567890" width={728} height={90} />
        </div>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Latest Jobs
              </h2>
              <p className="text-muted-foreground mt-1">Discover the most recent job opportunities</p>
            </div>
            <Button asChild variant="outline" className="gap-1">
              <Link href="/jobs">
                View All Jobs
                <ArrowRight className="h-4 w-4" />
              </Link>
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Latest Courses
              </h2>
              <p className="text-muted-foreground mt-1">Enhance your skills with these courses</p>
            </div>
            <Button asChild variant="outline" className="gap-1">
              <Link href="/courses">
                View All Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
