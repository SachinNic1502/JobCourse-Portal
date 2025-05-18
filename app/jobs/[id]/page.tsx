import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { getJobById } from "@/lib/jobs"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, DollarSign, Calendar, ExternalLink } from "lucide-react"
import AdBanner from "@/components/ads/ad-banner"
import AdArticle from "@/components/ads/ad-article"
import JobSchema from "@/components/seo/job-schema"

interface JobPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const job = await getJobById(params.id)

  if (!job) {
    return {
      title: "Job Not Found",
    }
  }

  return {
    title: `${job.title} at ${job.company} - JobCourse Portal`,
    description: job.description.substring(0, 160),
  }
}

// Add this inside the JobPage component
export default async function JobPage({ params }: JobPageProps) {
  const job = await getJobById(params.id)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobcourseportal.com"

  if (!job) {
    notFound()
  }

  // Split description into paragraphs for better ad placement
  const paragraphs = job.description.split("\n").filter((p) => p.trim() !== "")
  const midPoint = Math.floor(paragraphs.length / 2)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add the schema markup */}
      <JobSchema job={job} baseUrl={baseUrl} />

      <div className="max-w-3xl mx-auto">
        <Link
          href="/jobs"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          ← Back to Jobs
        </Link>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{job.location}</span>
              </div>
              {job.salary && (
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <AdBanner adSlot="6789012345" width={728} height={90} />
          </div>

          <div className="border-t border-b py-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="prose max-w-none">
              {paragraphs.slice(0, midPoint).map((paragraph, index) => (
                <p key={`first-${index}`} className="mb-4">
                  {paragraph}
                </p>
              ))}

              <AdArticle adSlot="7890123456" />

              {paragraphs.slice(midPoint).map((paragraph, index) => (
                <p key={`second-${index}`} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
