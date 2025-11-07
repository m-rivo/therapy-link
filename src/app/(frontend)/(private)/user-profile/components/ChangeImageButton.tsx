import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'

export default function ChangeImageButton() {
  return (
    <Button
      size="icon"
      variant="outline"
      className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
    >
      <Camera />
    </Button>
  )
}
