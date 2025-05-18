import { getAllJobs } from "@/lib/jobs"
import JobCard from "@/components/jobs/job-card"
import Pagination from "@/components/ui/pagination"

export default async function JobsList({ page = 1 }: { page?: number }) {
  const { jobs, totalPages } = await getAllJobs(page)

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No jobs found</h3>
        <p className="text-muted-foreground">Check back later for new opportunities</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/jobs" />
    </div>
  )
}
