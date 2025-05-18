import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import JobForm from "@/components/admin/job-form"

export const metadata: Metadata = {
  title: "Add Job - Admin Dashboard",
  description: "Add a new job to the portal",
}

export default function AddJobPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Add New Job</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <JobForm />
        </div>
      </div>
    </div>
  )
}
