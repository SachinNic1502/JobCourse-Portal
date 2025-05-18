"use client"

import { useEffect, useRef } from "react"

interface AdBannerProps {
  adSlot: string
  width?: number
  height?: number
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  className?: string
}

export default function AdBanner({ adSlot, width = 728, height = 90, format = "auto", className = "" }: AdBannerProps) {
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
        style={{ width: width ? `${width}px` : "100%", height: `${height}px`, maxWidth: "100%" }}
      >
        Ad Placeholder ({width}x{height})
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: width ? `${width}px` : "100%", height: `${height}px`, maxWidth: "100%" }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
