"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CommunityLinksProps {
  whatsappLink?: string
  telegramLink?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function CommunityLinks({
  whatsappLink = "https://chat.whatsapp.com/yourgroup",
  telegramLink = "https://t.me/yourgroup",
  variant = "default",
  size = "default",
  className = "",
}: CommunityLinksProps) {
  const { toast } = useToast()

  const handleJoinCommunity = (platform: string, link: string) => {
    window.open(link, "_blank")
    toast({
      title: `Joining ${platform} group`,
      description: `You're being redirected to our ${platform} community group.`,
      variant: "success",
    })
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Button
        variant={variant}
        size={size}
        className="gap-2"
        onClick={() => handleJoinCommunity("WhatsApp", whatsappLink)}
      >
        <MessageCircle className="h-4 w-4" />
        Join WhatsApp Group
      </Button>

      <Button
        variant={variant}
        size={size}
        className="gap-2"
        onClick={() => handleJoinCommunity("Telegram", telegramLink)}
      >
        <Send className="h-4 w-4" />
        Join Telegram Group
      </Button>
    </div>
  )
}
