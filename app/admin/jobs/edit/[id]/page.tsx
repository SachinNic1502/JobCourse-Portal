import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import JobForm from "@/components/admin/job-form"
import { getJobById } from "@/lib/jobs"

interface EditJobPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EditJobPageProps): Promise<Metadata> {
  const job = await getJobById(params.id)

  if (!job) {
    return {
      title: "Job Not Found - Admin Dashboard",
    }
  }

  return {
    title: `Edit ${job.title} - Admin Dashboard`,
    description: `Edit job details for ${job.title}`,
  }
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const job = await getJobById(params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Edit Job</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <JobForm job={job} />
        </div>
      </div>
    </div>
  )
}
