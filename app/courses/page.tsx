import type { Metadata } from "next"
import { Suspense } from "react"
import CoursesList from "@/components/courses/courses-list"
import { Skeleton } from "@/components/ui/skeleton"
import AdBanner from "@/components/ads/ad-banner"
import AdSidebar from "@/components/ads/ad-sidebar"
import CourseFilters from "@/components/courses/course-filters"

export const metadata: Metadata = {
  title: "Courses - JobCourse Portal",
  description: "Browse the latest courses to enhance your skills",
}

export default function CoursesPage({
  searchParams,
}: {
  searchParams: { page?: string; provider?: string; category?: string; price?: string; duration?: string }
}) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const { provider, category, price, duration } = searchParams

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Courses</h1>
        <p className="text-muted-foreground">Discover the latest courses to enhance your skills and knowledge</p>
      </div>

      <div className="flex justify-center mb-8">
        <AdBanner adSlot="4567890123" width={728} height={90} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="sticky top-24">
            <CourseFilters
              selectedProvider={provider}
              selectedCategory={category}
              selectedPrice={price}
              selectedDuration={duration}
            />
          </div>
        </div>

        <div className="flex-1">
          <Suspense fallback={<CoursesListSkeleton />}>
            <CoursesList page={page} provider={provider} category={category} price={price} duration={duration} />
          </Suspense>
        </div>

        <div className="hidden xl:block xl:w-1/4">
          <div className="sticky top-24">
            <AdSidebar adSlot="5678901234" />
          </div>
        </div>
      </div>
    </div>
  )
}

function CoursesListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6 shadow-sm">
          <Skeleton className="h-8 w-2/3 mb-4" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-4 w-1/5 mb-4" />
          <Skeleton className="h-20 w-full mb-4" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      ))}
    </div>
  )
}
