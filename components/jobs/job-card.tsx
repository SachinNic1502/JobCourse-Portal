import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { IJob } from "@/models/job"

interface JobCardProps {
  job: IJob
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow border overflow-hidden group">
      <CardContent className="pt-6 flex-1 relative">
        <div className="absolute top-0 right-0 p-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            New
          </Badge>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">{job.title}</h3>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-1 h-4 w-4 text-primary/70" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4 text-primary/70" />
              <span>{job.location}</span>
            </div>
            {job.salary && (
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="mr-1 h-4 w-4 text-primary/70" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4 bg-muted/20">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3.5 w-3.5" />
          <span>Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
        </div>
        <Button asChild size="sm" className="transition-transform group-hover:translate-x-1">
          <Link href={`/jobs/${job._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
