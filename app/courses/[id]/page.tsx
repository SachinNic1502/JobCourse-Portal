import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { getCourseById } from "@/lib/courses"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, DollarSign, Calendar, ExternalLink } from "lucide-react"
import AdBanner from "@/components/ads/ad-banner"
import AdArticle from "@/components/ads/ad-article"
import CourseSchema from "@/components/seo/course-schema"

interface CoursePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = await getCourseById(params.id)

  if (!course) {
    return {
      title: "Course Not Found",
    }
  }

  return {
    title: `${course.title} by ${course.provider} - JobCourse Portal`,
    description: course.description.substring(0, 160),
  }
}

// Add this inside the CoursePage component
export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseById(params.id)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobcourseportal.com"

  if (!course) {
    notFound()
  }

  // Split description into paragraphs for better ad placement
  const paragraphs = course.description.split("\n").filter((p) => p.trim() !== "")
  const midPoint = Math.floor(paragraphs.length / 2)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add the schema markup */}
      <CourseSchema course={course} baseUrl={baseUrl} />

      <div className="max-w-3xl mx-auto">
        <Link
          href="/courses"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          ← Back to Courses
        </Link>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <BookOpen className="mr-1 h-4 w-4" />
                <span>{course.provider}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              {course.price && (
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4" />
                  <span>{course.price}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Added {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <AdBanner adSlot="8901234567" width={728} height={90} />
          </div>

          <div className="border-t border-b py-6">
            <h2 className="text-xl font-semibold mb-4">Course Description</h2>
            <div className="prose max-w-none">
              {paragraphs.slice(0, midPoint).map((paragraph, index) => (
                <p key={`first-${index}`} className="mb-4">
                  {paragraph}
                </p>
              ))}

              <AdArticle adSlot="9012345678" />

              {paragraphs.slice(midPoint).map((paragraph, index) => (
                <p key={`second-${index}`} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <a href={course.enrollmentUrl} target="_blank" rel="noopener noreferrer">
                Enroll Now
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
