import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, DollarSign, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ICourse } from "@/models/course"

interface CourseCardProps {
  course: ICourse
}

export default function CourseCard({ course }: CourseCardProps) {
  // Generate a random rating between 4.0 and 5.0 for demo purposes
  const rating = (4 + Math.random()).toFixed(1)

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow border overflow-hidden group">
      <CardContent className="pt-6 flex-1 relative">
        <div className="absolute top-0 right-0 p-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Featured
          </Badge>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <BookOpen className="mr-1 h-4 w-4 text-primary/70" />
              <span>{course.provider}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4 text-primary/70" />
              <span>{course.duration}</span>
            </div>
            {course.price && (
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="mr-1 h-4 w-4 text-primary/70" />
                <span>{course.price}</span>
              </div>
            )}
            <div className="flex items-center text-sm">
              <div className="flex items-center text-amber-500">
                <Star className="fill-current h-4 w-4 mr-1" />
                <span className="font-medium">{rating}</span>
              </div>
              <span className="text-muted-foreground ml-2">({Math.floor(Math.random() * 1000) + 100} reviews)</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4 bg-muted/20">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3.5 w-3.5" />
          <span>Added {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</span>
        </div>
        <Button asChild size="sm" className="transition-transform group-hover:translate-x-1">
          <Link href={`/courses/${course._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
