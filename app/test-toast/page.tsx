import { TestToast } from "@/components/ui/test-toast"

export default function TestToastPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-2xl font-bold mb-4">Test Toast Notifications</h1>
      <p className="text-muted-foreground mb-8">Click the button below to test toast notifications</p>
      <TestToast />
    </div>
  )
}
