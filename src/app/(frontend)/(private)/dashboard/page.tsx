import { getUser } from '../actions/getUser'
import { Customer, TierProps } from '@/payload-types'
import { ResetPasswordButton } from '../components/ResetPassword'
import { Customers } from '@/collections/Customers/config'
import UpdateForm from '../components/UpdateForm'

export default async function Page() {
  const user = (await getUser()) as Customer
  const tiers = Customers.fields
    .filter((field) => field.type === 'radio')
    .filter((field) => field.name === 'tier')[0].options

  return (
    <main className="w-full mx-auto sm:max-w-sm my-8">
      <div className="my-8">
        <h1>Hello, {user.firstName || user.email}</h1>
        <p>You are currently on the {user.tier?.toLowerCase() || 'free'} tier.</p>
      </div>
      <UpdateForm user={user} tiers={tiers as TierProps[]} />
      <div className="flex justify-start items-center gap-4">
        <ResetPasswordButton email={user.email} />
      </div>
    </main>
  )
}
