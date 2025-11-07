import ProfileHeader from './components/ProfileHeader'
import ProfileContent from './components/ProfileContent'
import { Customer } from '@/payload-types'
import { getUser } from '../actions/getUser'

//TODO: agregar skeletons
export default async function UserProfile() {
  const user = (await getUser()) as Customer

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <ProfileHeader user={user} />
      <ProfileContent user={user} />
    </div>
  )
}
