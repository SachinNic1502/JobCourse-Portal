"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { ICourse } from "@/models/course"

const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  provider: z.string().min(2, "Provider name must be at least 2 characters"),
  duration: z.string().min(2, "Duration must be at least 2 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.string().optional(),
  enrollmentUrl: z.string().url("Please enter a valid URL"),
})

type CourseFormValues = z.infer<typeof courseSchema>

interface CourseFormProps {
  course?: ICourse
}

export default function CourseForm({ course }: CourseFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const isEditing = !!course

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course?.title || "",
      provider: course?.provider || "",
      duration: course?.duration || "",
      description: course?.description || "",
      price: course?.price || "",
      enrollmentUrl: course?.enrollmentUrl || "",
    },
  })

  async function onSubmit(data: CourseFormValues) {
    setIsLoading(true)

    try {
      const url = isEditing ? `/api/admin/courses/${course._id}` : "/api/admin/courses"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong")
      }

      toast({
        title: isEditing ? "Course updated" : "Course created",
        description: isEditing
          ? "The course has been updated successfully."
          : "The course has been created successfully.",
      })

      router.push("/admin/dashboard")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Advanced React Development" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Udemy or Harvard University" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 8 weeks or 12 hours" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $49.99 or Free" {...field} />
              </FormControl>
              <FormDescription>Leave blank if you don&apos;t want to display price information</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the course content, learning outcomes, prerequisites, etc."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enrollmentUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enrollment URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/enroll" {...field} />
              </FormControl>
              <FormDescription>Link where users can enroll in this course</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Course" : "Create Course"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
