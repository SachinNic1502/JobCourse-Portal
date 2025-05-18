"use client"

import { useEffect, useRef } from "react"

interface AdSidebarProps {
  adSlot: string
  className?: string
}

export default function AdSidebar({ adSlot, className = "" }: AdSidebarProps) {
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
        className={`bg-muted/30 border border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground text-sm ${className}`}
        style={{ width: "300px", height: "600px", maxWidth: "100%" }}
      >
        Sidebar Ad Placeholder (300x600)
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "300px", height: "600px", maxWidth: "100%" }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format="vertical"
      />
    </div>
  )
}
