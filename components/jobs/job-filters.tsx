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
  location: z.string().optional(),
  category: z.string().optional(),
  salary: z.string().optional(),
  type: z.string().optional(),
})

type FilterValues = z.infer<typeof filterSchema>

interface JobFiltersProps {
  selectedLocation?: string
  selectedCategory?: string
  selectedSalary?: string
  selectedType?: string
}

export default function JobFilters({
  selectedLocation,
  selectedCategory,
  selectedSalary,
  selectedType,
}: JobFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      location: selectedLocation || "",
      category: selectedCategory || "",
      salary: selectedSalary || "",
      type: selectedType || "",
    },
  })

  // Update form values when URL params change
  useEffect(() => {
    form.reset({
      location: selectedLocation || "",
      category: selectedCategory || "",
      salary: selectedSalary || "",
      type: selectedType || "",
    })
  }, [selectedLocation, selectedCategory, selectedSalary, selectedType, form])

  function onSubmit(data: FilterValues) {
    // Create a new URLSearchParams object
    const params = new URLSearchParams()

    // Add the current page if it exists
    const currentPage = new URLSearchParams(window.location.search).get("page")
    if (currentPage) {
      params.set("page", currentPage)
    }

    // Add filter values if they exist
    if (data.location) params.set("location", data.location)
    if (data.category) params.set("category", data.category)
    if (data.salary) params.set("salary", data.salary)
    if (data.type) params.set("type", data.type)

    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`)
  }

  function clearFilters() {
    form.reset({
      location: "",
      category: "",
      salary: "",
      type: "",
    })

    // Keep only the page parameter if it exists
    const currentPage = new URLSearchParams(window.location.search).get("page")
    if (currentPage) {
      router.push(`${pathname}?page=${currentPage}`)
    } else {
      router.push(pathname)
    }
  }

  const hasActiveFilters = selectedLocation || selectedCategory || selectedSalary || selectedType

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
              <CardTitle className="text-lg">Filter Jobs</CardTitle>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                  <X className="h-3.5 w-3.5 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <CardDescription>Refine your job search</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="All Locations" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="new-york">New York</SelectItem>
                          <SelectItem value="san-francisco">San Francisco</SelectItem>
                          <SelectItem value="london">London</SelectItem>
                          <SelectItem value="berlin">Berlin</SelectItem>
                          <SelectItem value="toronto">Toronto</SelectItem>
                          <SelectItem value="sydney">Sydney</SelectItem>
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
                          <SelectItem value="software-development">Software Development</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="customer-service">Customer Service</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Salary" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">Any Salary</SelectItem>
                          <SelectItem value="0-50000">$0 - $50,000</SelectItem>
                          <SelectItem value="50000-75000">$50,000 - $75,000</SelectItem>
                          <SelectItem value="75000-100000">$75,000 - $100,000</SelectItem>
                          <SelectItem value="100000-150000">$100,000 - $150,000</SelectItem>
                          <SelectItem value="150000+">$150,000+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
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
