import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { getJobById } from "@/lib/jobs"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, DollarSign, Calendar, ExternalLink, Users } from "lucide-react"
import AdBanner from "@/components/ads/ad-banner"
import AdArticle from "@/components/ads/ad-article"
import JobSchema from "@/components/seo/job-schema"
import ShareButtons from "@/components/social/share-buttons"
import CommunityLinks from "@/components/social/community-links"

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

            {/* Share buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 my-6">
              <ShareButtons
                url={`/jobs/${job._id}`}
                title={`${job.title} at ${job.company}`}
                description={`Check out this job opportunity: ${job.title} at ${job.company}`}
              />

              <CommunityLinks
                whatsappLink="https://chat.whatsapp.com/jobsgroup"
                telegramLink="https://t.me/jobsgroup"
                variant="outline"
                size="sm"
              />
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

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
              <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
              <Users className="h-4 w-4" />
              Join Job Seekers Community
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-medium mb-4">Connect with other job seekers</h3>
            <p className="text-muted-foreground mb-4">
              Join our community groups to network with other professionals, get interview tips, and stay updated on the
              latest job opportunities.
            </p>
            <CommunityLinks whatsappLink="https://chat.whatsapp.com/jobsgroup" telegramLink="https://t.me/jobsgroup" />
          </div>
        </div>
      </div>
    </div>
  )
}
