"use client"

import Script from "next/script"

export default function GoogleAdsScript() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID

  if (!clientId) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded text-center">
        Google AdSense client ID is missing. Please set NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID in your environment.
      </div>
    )
  }

  // Only load in production
  if (process.env.NODE_ENV !== "production") {
    return null
  }

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      onError={(e) => {
        console.error("Error loading Google AdSense script:", e)
      }}
    />
  )
}
