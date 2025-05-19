"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Mail, Copy, Share2, Check, MessageCircle, Send } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [fullUrl, setFullUrl] = useState("")

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true)
    // Ensure we have the full URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
    const completeUrl = url.startsWith("http") ? url : `${baseUrl}${url}`
    setFullUrl(completeUrl)
  }, [url])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="gap-2" disabled>
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    )
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
      variant: "success",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: fullUrl,
        })
        toast({
          title: "Shared successfully!",
          description: "Content has been shared.",
          variant: "success",
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      handleCopyLink()
    }
  }

  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || title)

  // WhatsApp share link
  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`

  // Telegram share link
  const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Native share button for mobile devices */}
      {typeof navigator !== "undefined" && navigator.share && (
        <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      )}

      {/* Popover for desktop devices or when Web Share API is not available */}
      {(typeof navigator === "undefined" || !navigator.share) && (
        <TooltipProvider>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <div className="flex flex-wrap gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
                      }
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share on Facebook</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "_blank")
                      }
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share on Twitter</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank")
                      }
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share on LinkedIn</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => window.open(whatsappUrl, "_blank")}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share on WhatsApp</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => window.open(telegramUrl, "_blank")}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share on Telegram</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        window.open(
                          `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
                          "_blank",
                        )
                      }
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share via Email</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleCopyLink}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{copied ? "Copied!" : "Copy Link"}</TooltipContent>
                </Tooltip>
              </div>
            </PopoverContent>
          </Popover>
        </TooltipProvider>
      )}
    </div>
  )
}
