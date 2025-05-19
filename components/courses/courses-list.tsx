import { getAllCourses } from "@/lib/courses"
import CourseCard from "@/components/courses/course-card"
import Pagination from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import Link from "next/link"

interface CoursesListProps {
  page?: number
  provider?: string
  category?: string
  price?: string
  duration?: string
}

export default async function CoursesList({ page = 1, provider, category, price, duration }: CoursesListProps) {
  // In a real app, you would pass these filters to your API
  const { courses, totalPages } = await getAllCourses(page)

  // For demo purposes, let's filter the courses client-side
  // In a real app, this filtering would happen in the database query
  const filteredCourses = courses.filter((course) => {
    let matches = true

    if (provider && course.provider.toLowerCase() !== provider.toLowerCase()) {
      matches = false
    }

    // Add more filters as needed

    return matches
  })

  const hasFilters = provider || category || price || duration

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg shadow-sm">
        <h3 className="text-lg font-medium">No courses found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your filters or check back later for new courses</p>
        {hasFilters && (
          <Link href="/courses">
            <Badge variant="outline" className="px-3 py-1 cursor-pointer">
              Clear all filters <X className="ml-1 h-3 w-3" />
            </Badge>
          </Link>
        )}
      </div>
    )
  }

  // Create the active filters display
  const activeFilters = []
  if (provider) activeFilters.push({ name: "provider", value: provider })
  if (category) activeFilters.push({ name: "category", value: category })
  if (price) activeFilters.push({ name: "price", value: price })
  if (duration) activeFilters.push({ name: "duration", value: duration })

  return (
    <div className="space-y-8">
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-muted-foreground mr-2 py-1">Active filters:</span>
          {activeFilters.map((filter) => (
            <Link
              key={filter.name}
              href={`/courses?${new URLSearchParams(
                Object.fromEntries(activeFilters.filter((f) => f.name !== filter.name).map((f) => [f.name, f.value])),
              )}`}
            >
              <Badge variant="secondary" className="px-3 py-1 cursor-pointer">
                {filter.name}: {filter.value} <X className="ml-1 h-3 w-3" />
              </Badge>
            </Link>
          ))}
          <Link href="/courses">
            <Badge variant="outline" className="px-3 py-1 cursor-pointer">
              Clear all <X className="ml-1 h-3 w-3" />
            </Badge>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/courses" />
    </div>
  )
}
