import type { IJob } from "@/models/job"

interface JobSchemaProps {
  job: IJob
  baseUrl: string
}

export default function JobSchema({ job, baseUrl }: JobSchemaProps) {
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: new Date(job.createdAt).toISOString(),
    employmentType: "FULL_TIME", // You might want to add this field to your job model
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
      },
    },
    ...(job.salary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD", // You might want to add currency to your job model
        value: {
          "@type": "QuantitativeValue",
          value: job.salary,
          unitText: "YEAR", // You might want to add salary period to your job model
        },
      },
    }),
    url: `${baseUrl}/jobs/${job._id}`,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />
}
