import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, BookOpen, Users, Plus, Edit } from "lucide-react"
import { getDashboardStats } from "@/lib/admin"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllJobs } from "@/lib/jobs"
import { getAllCourses } from "@/lib/courses"
import DeleteJobButton from "@/components/admin/delete-job-button"
import DeleteCourseButton from "@/components/admin/delete-course-button"

export const metadata: Metadata = {
  title: "Admin Dashboard - JobCourse Portal",
  description: "Manage jobs, courses, and users",
}

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage jobs, courses, and users</p>
        </div>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <AdminStats />
      </Suspense>

      <Tabs defaultValue="jobs" className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </TabsTrigger>
          </TabsList>
          <TabsContent value="jobs" className="mt-0">
            <Button asChild>
              <Link href="/admin/jobs/add" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Job
              </Link>
            </Button>
          </TabsContent>
          <TabsContent value="courses" className="mt-0">
            <Button asChild>
              <Link href="/admin/courses/add" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Course
              </Link>
            </Button>
          </TabsContent>
        </div>

        <TabsContent value="jobs" className="space-y-4">
          <Suspense fallback={<AdminTableSkeleton />}>
            <AdminJobsTable />
          </Suspense>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Suspense fallback={<AdminTableSkeleton />}>
            <AdminCoursesTable />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

async function AdminStats() {
  const stats = await getDashboardStats()

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.jobsCount}</div>
          <p className="text-xs text-muted-foreground">{stats.recentJobsCount} added in the last 30 days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.coursesCount}</div>
          <p className="text-xs text-muted-foreground">{stats.recentCoursesCount} added in the last 30 days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.usersCount}</div>
          <p className="text-xs text-muted-foreground">{stats.recentUsersCount} registered in the last 30 days</p>
        </CardContent>
      </Card>
    </div>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 w-[120px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px] mb-1" />
            <Skeleton className="h-4 w-[140px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function AdminTableSkeleton() {
  return (
    <div className="border rounded-md">
      <div className="border-b p-4">
        <Skeleton className="h-6 w-full max-w-[300px]" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-4 border-b last:border-0">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-5 w-[250px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-[70px]" />
              <Skeleton className="h-9 w-[70px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

async function AdminJobsTable() {
  const { jobs } = await getAllJobs(1, 100)

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md">
        <h3 className="text-lg font-medium">No jobs found</h3>
        <p className="text-muted-foreground mb-4">Get started by adding your first job</p>
        <Button asChild>
          <Link href="/admin/jobs/add">Add Job</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="border rounded-md">
      {jobs.map((job) => (
        <div key={job._id} className="p-4 border-b last:border-0">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h3 className="font-medium">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/jobs/edit/${job._id}`} className="flex items-center gap-1">
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Link>
              </Button>
              <DeleteJobButton jobId={job._id} jobTitle={job.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

async function AdminCoursesTable() {
  const { courses } = await getAllCourses(1, 100)

  if (courses.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md">
        <h3 className="text-lg font-medium">No courses found</h3>
        <p className="text-muted-foreground mb-4">Get started by adding your first course</p>
        <Button asChild>
          <Link href="/admin/courses/add">Add Course</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="border rounded-md">
      {courses.map((course) => (
        <div key={course._id} className="p-4 border-b last:border-0">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h3 className="font-medium">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.provider}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/courses/edit/${course._id}`} className="flex items-center gap-1">
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Link>
              </Button>
              <DeleteCourseButton courseId={course._id} courseTitle={course.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
