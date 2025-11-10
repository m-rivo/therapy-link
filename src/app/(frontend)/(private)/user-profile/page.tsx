import ProfileHeader from './components/ProfileHeader'
import ProfileContent from './components/ProfileContent'
import { Customer } from '@/payload-types'
import { getUser } from '../actions/getUser'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default async function UserProfile(): Promise<React.ReactElement> {
  const user = (await getUser()) as Customer

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <ProfileHeader user={user} />
      <ProfileContent user={user} />
      <div className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tareas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6"></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Citas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6"></CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
