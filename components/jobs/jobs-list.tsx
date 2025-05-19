import { getAllJobs } from "@/lib/jobs"
import JobCard from "@/components/jobs/job-card"
import Pagination from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import Link from "next/link"

interface JobsListProps {
  page?: number
  location?: string
  category?: string
  salary?: string
  type?: string
}

export default async function JobsList({ page = 1, location, category, salary, type }: JobsListProps) {
  // In a real app, you would pass these filters to your API
  const { jobs, totalPages } = await getAllJobs(page)

  // For demo purposes, let's filter the jobs client-side
  // In a real app, this filtering would happen in the database query
  const filteredJobs = jobs.filter((job) => {
    let matches = true

    if (location && job.location.toLowerCase() !== location.toLowerCase()) {
      matches = false
    }

    // Add more filters as needed

    return matches
  })

  const hasFilters = location || category || salary || type

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg shadow-sm">
        <h3 className="text-lg font-medium">No jobs found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or check back later for new opportunities
        </p>
        {hasFilters && (
          <Link href="/jobs">
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
  if (location) activeFilters.push({ name: "location", value: location })
  if (category) activeFilters.push({ name: "category", value: category })
  if (salary) activeFilters.push({ name: "salary", value: salary })
  if (type) activeFilters.push({ name: "type", value: type })

  return (
    <div className="space-y-8">
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-muted-foreground mr-2 py-1">Active filters:</span>
          {activeFilters.map((filter) => (
            <Link
              key={filter.name}
              href={`/jobs?${new URLSearchParams(
                Object.fromEntries(activeFilters.filter((f) => f.name !== filter.name).map((f) => [f.name, f.value])),
              )}`}
            >
              <Badge variant="secondary" className="px-3 py-1 cursor-pointer">
                {filter.name}: {filter.value} <X className="ml-1 h-3 w-3" />
              </Badge>
            </Link>
          ))}
          <Link href="/jobs">
            <Badge variant="outline" className="px-3 py-1 cursor-pointer">
              Clear all <X className="ml-1 h-3 w-3" />
            </Badge>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/jobs" />
    </div>
  )
}
