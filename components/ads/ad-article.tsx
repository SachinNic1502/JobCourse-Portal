"use client"

import { useEffect, useRef } from "react"

interface AdArticleProps {
  adSlot: string
  className?: string
}

export default function AdArticle({ adSlot, className = "" }: AdArticleProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip ad loading during development
    if (process.env.NODE_ENV === "development") return

    try {
      // Add ad after component mounts
      const adsbygoogle = (window as any).adsbygoogle || []
      adsbygoogle.push({})
    } catch (error) {
      console.error("Error loading Google AdSense:", error)
    }
  }, [])

  if (process.env.NODE_ENV === "development") {
    return (
      <div
        className={`bg-muted/30 border border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground text-sm p-4 my-6 ${className}`}
        style={{ height: "250px", maxWidth: "100%" }}
      >
        In-Article Ad Placeholder
      </div>
    )
  }

  return (
    <div className={`my-6 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-layout="in-article"
        data-ad-format="fluid"
      />
    </div>
  )
}
