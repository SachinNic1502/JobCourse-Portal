"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function TestToast() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Toast Test",
          description: "This is a test toast notification",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
