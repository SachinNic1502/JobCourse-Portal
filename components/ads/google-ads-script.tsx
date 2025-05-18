"use client"

import Script from "next/script"

export default function GoogleAdsScript() {
  // Skip in development mode
  if (process.env.NODE_ENV === "development") {
    return null
  }

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      onError={(e) => {
        console.error("Error loading Google AdSense script:", e)
      }}
    />
  )
}
