"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, X } from "lucide-react"
import { motion } from "framer-motion"

const filterSchema = z.object({
  provider: z.string().optional(),
  category: z.string().optional(),
  price: z.string().optional(),
  duration: z.string().optional(),
})

type FilterValues = z.infer<typeof filterSchema>

interface CourseFiltersProps {
  selectedProvider?: string
  selectedCategory?: string
  selectedPrice?: string
  selectedDuration?: string
}

export default function CourseFilters({
  selectedProvider,
  selectedCategory,
  selectedPrice,
  selectedDuration,
}: CourseFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      provider: selectedProvider || "",
      category: selectedCategory || "",
      price: selectedPrice || "",
      duration: selectedDuration || "",
    },
  })

  // Update form values when URL params change
  useEffect(() => {
    form.reset({
      provider: selectedProvider || "",
      category: selectedCategory || "",
      price: selectedPrice || "",
      duration: selectedDuration || "",
    })
  }, [selectedProvider, selectedCategory, selectedPrice, selectedDuration, form])

  function onSubmit(data: FilterValues) {
    // Create a new URLSearchParams object
    const params = new URLSearchParams()

    // Add the current page if it exists
    const currentPage = new URLSearchParams(window.location.search).get("page")
    if (currentPage) {
      params.set("page", currentPage)
    }

    // Add filter values if they exist
    if (data.provider) params.set("provider", data.provider)
    if (data.category) params.set("category", data.category)
    if (data.price) params.set("price", data.price)
    if (data.duration) params.set("duration", data.duration)

    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`)
  }

  function clearFilters() {
    form.reset({
      provider: "",
      category: "",
      price: "",
      duration: "",
    })

    // Keep only the page parameter if it exists
    const currentPage = new URLSearchParams(window.location.search).get("page")
    if (currentPage) {
      router.push(`${pathname}?page=${currentPage}`)
    } else {
      router.push(pathname)
    }
  }

  const hasActiveFilters = selectedProvider || selectedCategory || selectedPrice || selectedDuration

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filter card - always visible on desktop, toggleable on mobile */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isFilterVisible || window.innerWidth >= 1024 ? "auto" : 0,
          opacity: isFilterVisible || window.innerWidth >= 1024 ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden lg:overflow-visible"
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filter Courses</CardTitle>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                  <X className="h-3.5 w-3.5 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <CardDescription>Refine your course search</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="All Providers" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Providers</SelectItem>
                          <SelectItem value="udemy">Udemy</SelectItem>
                          <SelectItem value="coursera">Coursera</SelectItem>
                          <SelectItem value="edx">edX</SelectItem>
                          <SelectItem value="pluralsight">Pluralsight</SelectItem>
                          <SelectItem value="linkedin-learning">LinkedIn Learning</SelectItem>
                          <SelectItem value="skillshare">Skillshare</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="programming">Programming</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="personal-development">Personal Development</SelectItem>
                          <SelectItem value="language">Language</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Price" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="any">Any Price</SelectItem>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="under-50">Under $50</SelectItem>
                          <SelectItem value="50-100">$50 - $100</SelectItem>
                          <SelectItem value="100-200">$100 - $200</SelectItem>
                          <SelectItem value="200+">$200+</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="any">Any Duration</SelectItem>
                          <SelectItem value="short">Short (0-3 hours)</SelectItem>
                          <SelectItem value="medium">Medium (3-10 hours)</SelectItem>
                          <SelectItem value="long">Long (10+ hours)</SelectItem>
                          <SelectItem value="self-paced">Self-paced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Apply Filters
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
