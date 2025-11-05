import React from 'react'
import { LoaderCircle } from 'lucide-react'
import { Button } from '../ui/button'

export default function SubmitButton({
  loading,
  text,
}: {
  loading: boolean
  text: string
}): React.ReactElement {
  return (
    <Button
      type="submit"
      className={loading ? 'cursor-not-allowed' : 'cursor-pointer'}
      disabled={loading}
    >
      {text}
      <LoaderCircle className={`animate-spin ${loading ? 'inline-block' : 'hidden'}`} />
    </Button>
  )
}
