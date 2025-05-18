import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, DollarSign } from "lucide-react"
import type { IJob } from "@/models/job"

interface JobCardProps {
  job: IJob
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow border">
      <CardContent className="pt-6 flex-1">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold line-clamp-2">{job.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-1 h-4 w-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{job.location}</span>
            </div>
            {job.salary && (
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="mr-1 h-4 w-4" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-xs text-muted-foreground">
          Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
        </div>
        <Button asChild size="sm">
          <Link href={`/jobs/${job._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
