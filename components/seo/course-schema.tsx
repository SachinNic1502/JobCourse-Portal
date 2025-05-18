import type { ICourse } from "@/models/course"

interface CourseSchemaProps {
  course: ICourse
  baseUrl: string
}

export default function CourseSchema({ course, baseUrl }: CourseSchemaProps) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: course.provider,
    },
    ...(course.price && {
      offers: {
        "@type": "Offer",
        price: course.price.replace(/[^0-9.]/g, ""), // Extract numeric value
        priceCurrency: "USD", // You might want to add currency to your course model
      },
    }),
    url: `${baseUrl}/courses/${course._id}`,
    timeRequired: course.duration,
    datePublished: new Date(course.createdAt).toISOString(),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
}
