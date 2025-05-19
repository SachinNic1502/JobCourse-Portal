"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, BookOpen, ArrowRight, Star, Users, TrendingUp } from "lucide-react"
import CommunityLinks from "@/components/social/community-links"

export default function FeaturedSection() {
  const [activeTab, setActiveTab] = useState("jobs")

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with other job seekers and learners to share resources, get advice, and stay updated on the latest
            opportunities.
          </p>
        </div>

        <Tabs defaultValue="jobs" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="jobs" className="flex items-center justify-center gap-2">
                <Briefcase className="h-4 w-4" />
                Job Seekers
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4" />
                Learners
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="jobs" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Job Seekers Community
                </CardTitle>
                <CardDescription>
                  Connect with other professionals, get interview tips, and stay updated on job opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                    <TrendingUp className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Career Advice</h3>
                    <p className="text-sm text-muted-foreground">Get tips from industry professionals</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                    <Briefcase className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Job Alerts</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications for new opportunities</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Networking</h3>
                    <p className="text-sm text-muted-foreground">Connect with peers in your industry</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center">
                <CommunityLinks
                  whatsappLink="https://chat.whatsapp.com/jobsgroup"
                  telegramLink="https://t.me/jobsgroup"
                  className="mb-4"
                />
                <Button asChild variant="outline" size="sm" className="gap-1">
                  <Link href="/jobs">
                    Browse Jobs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Learners Community
                </CardTitle>
                <CardDescription>
                  Connect with other students, share resources, and get help with your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                    <Star className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Course Reviews</h3>
                    <p className="text-sm text-muted-foreground">Get honest feedback on courses</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Study Groups</h3>
                    <p className="text-sm text-muted-foreground">Join groups for collaborative learning</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                    <TrendingUp className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Skill Development</h3>
                    <p className="text-sm text-muted-foreground">Track your progress and growth</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center">
                <CommunityLinks
                  whatsappLink="https://chat.whatsapp.com/coursesgroup"
                  telegramLink="https://t.me/coursesgroup"
                  className="mb-4"
                />
                <Button asChild variant="outline" size="sm" className="gap-1">
                  <Link href="/courses">
                    Browse Courses
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
