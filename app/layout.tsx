import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import GoogleAdsScript from "@/components/ads/google-ads-script"
import WebsiteSchema from "@/components/seo/website-schema"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "JobCourse Portal - Find Jobs and Courses",
    template: "%s | JobCourse Portal",
  },
  description: "Discover the latest job opportunities and courses to advance your career",
  keywords: "jobs, courses, career, employment, education, professional development",
  authors: [{ name: "JobCourse Portal" }],
  creator: "JobCourse Portal",
  publisher: "JobCourse Portal",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "JobCourse Portal - Find Jobs and Courses",
    description: "Discover the latest job opportunities and courses to advance your career",
    siteName: "JobCourse Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobCourse Portal - Find Jobs and Courses",
    description: "Discover the latest job opportunities and courses to advance your career",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobcourseportal.com"

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <WebsiteSchema baseUrl={baseUrl} />
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
        <GoogleAdsScript />
      </body>
    </html>
  )
}
