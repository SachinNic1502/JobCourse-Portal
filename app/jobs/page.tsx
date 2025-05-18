import type { Metadata } from "next"
import { Suspense } from "react"
import JobsList from "@/components/jobs/jobs-list"
import { Skeleton } from "@/components/ui/skeleton"
import AdBanner from "@/components/ads/ad-banner"
import AdSidebar from "@/components/ads/ad-sidebar"

export const metadata: Metadata = {
  title: "Jobs - JobCourse Portal",
  description: "Browse the latest job opportunities to advance your career",
}

export default function JobsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const params = searchParams;
  const page = params.page ? Number.parseInt(params.page) : 1

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Jobs</h1>
        <p className="text-muted-foreground">Discover the latest job opportunities to advance your career</p>
      </div>

      <div className="flex justify-center mb-8">
        <AdBanner adSlot="2345678901" width={728} height={90} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Suspense fallback={<JobsListSkeleton />}>
            <JobsList page={page} />
          </Suspense>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-8">
            <AdSidebar adSlot="3456789012" />
          </div>
        </div>
      </div>
    </div>
  )
}

function JobsListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6">
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
