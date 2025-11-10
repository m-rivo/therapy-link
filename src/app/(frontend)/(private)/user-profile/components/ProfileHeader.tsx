import { Card, CardContent } from '@/components/ui/card'
import { Cake, Mail, Phone, User } from 'lucide-react'
import { Customer } from '@/payload-types'
import ChangeImageButton from './ChangeImageButton'
import { Media } from '@/payload-types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export default function ProfileHeader({
  user,
  isEditing,
  setIsEditing,
}: {
  user: Customer
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}) {
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
              <AvatarImage src={(user?.profileImage as Media)?.url || undefined} alt="Profile" />
              <AvatarFallback>
                <User size={40} />
              </AvatarFallback>
            </Avatar>
            <ChangeImageButton />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
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
          {!isEditing && (
            <Button variant="default" onClick={() => setIsEditing(true)}>
              <Edit /> Editar Perfil
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
