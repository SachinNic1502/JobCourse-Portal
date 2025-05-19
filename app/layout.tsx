import type { Metadata } from "next/server"
import type React from "react"
import WebsiteSchema from "@/components/seo/website-schema"

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://jobcourseportal.com"),
  alternates: {
    canonical: "/",
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
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4916802033150193" />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4916802033150193`}
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <GoogleAdsScript />
        <WebsiteSchema baseUrl={baseUrl} />
        <SessionWrapper>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
          <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
              <Footer />
            </div>
          </footer>
        </SessionWrapper>
      </body>
    </html>
  )
}


import './globals.css';
import SessionWrapper from "./SessionWrapper"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import GoogleAdsScript from "@/components/ads/google-ads-script"

