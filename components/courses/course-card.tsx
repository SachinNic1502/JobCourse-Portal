import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, DollarSign } from "lucide-react"
import type { ICourse } from "@/models/course"

interface CourseCardProps {
  course: ICourse
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow border">
      <CardContent className="pt-6 flex-1">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold line-clamp-2">{course.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <BookOpen className="mr-1 h-4 w-4" />
              <span>{course.provider}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            {course.price && (
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="mr-1 h-4 w-4" />
                <span>{course.price}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-xs text-muted-foreground">
          Added {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
        </div>
        <Button asChild size="sm">
          <Link href={`/courses/${course._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
