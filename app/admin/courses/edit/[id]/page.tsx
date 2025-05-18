import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CourseForm from "@/components/admin/course-form"
import { getCourseById } from "@/lib/courses"

interface EditCoursePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EditCoursePageProps): Promise<Metadata> {
  const course = await getCourseById(params.id)

  if (!course) {
    return {
      title: "Course Not Found - Admin Dashboard",
    }
  }

  return {
    title: `Edit ${course.title} - Admin Dashboard`,
    description: `Edit course details for ${course.title}`,
  }
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const course = await getCourseById(params.id)

  if (!course) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Edit Course</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <CourseForm course={course} />
        </div>
      </div>
    </div>
  )
}
