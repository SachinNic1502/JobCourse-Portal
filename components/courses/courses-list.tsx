import { getAllCourses } from "@/lib/courses"
import CourseCard from "@/components/courses/course-card"
import Pagination from "@/components/ui/pagination"

export default async function CoursesList({ page = 1 }: { page?: number }) {
  const { courses, totalPages } = await getAllCourses(page)

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No courses found</h3>
        <p className="text-muted-foreground">Check back later for new courses</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/courses" />
    </div>
  )
}
