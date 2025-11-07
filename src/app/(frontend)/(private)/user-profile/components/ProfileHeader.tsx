import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Cake, Mail, Phone } from 'lucide-react'
import { User } from 'lucide-react'
import { Customer } from '@/payload-types'
import EditButton from './EditButton'
import ChangeImageButton from './ChangeImageButton'

export default function ProfileHeader({ user }: { user: Customer }) {
  function getBirthDate(userBirthDate: string) {
    const birthDate = new Date(userBirthDate)

    return birthDate.toLocaleDateString('es-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://bundui-images.netlify.app/avatars/08.png" alt="Profile" />
              <AvatarFallback>
                <User size={40} />
              </AvatarFallback>
            </Avatar>
            <ChangeImageButton />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="size-4" />
                {user.phoneNumber || '####-####'}
              </div>
              <div className="flex items-center gap-1">
                <Cake className="size-4" />
                {user.birthDate ? getBirthDate(user.birthDate) : 'dd-mm-aaaa'}
              </div>
            </div>
          </div>
          <EditButton />
        </div>
      </CardContent>
    </Card>
  )
}
