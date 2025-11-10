'use client'

import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import { Customer } from '@/payload-types'
import { useState } from 'react'

export default function ProfileClient({ user }: { user: Customer }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <ProfileHeader user={user} isEditing={isEditing} setIsEditing={setIsEditing} />
      <ProfileContent user={user} isEditing={isEditing} setIsEditing={setIsEditing} />
    </>
  )
}
