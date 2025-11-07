import { getUser } from '../actions/getUser'
import { Customer } from '@/payload-types'
import { ResetPasswordButton } from '../components/ResetPassword'

export default async function Page() {
  const user = (await getUser()) as Customer

  return (
    <main className="w-full mx-auto sm:max-w-sm my-8">
      <div className="my-8">
        <h1>Hola, {user.firstName || user.email}</h1>
      </div>
      <div className="flex justify-start items-center gap-4">
        <ResetPasswordButton email={user.email} />
      </div>
    </main>
  )
}
