import React, { ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import { Button } from '../ui/button'

export default function SubmitButton({
  loading,
  text,
  type = 'submit',
  variant = 'default',
  ariaLabel = 'submit form',
  onClick = undefined,
  size = 'default',
}: {
  loading: boolean
  text: string | ReactNode
  type?: 'submit' | 'button' | 'reset'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  ariaLabel?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
}): React.ReactElement {
  return (
    <Button
      type={type}
      className={loading ? 'cursor-not-allowed' : 'cursor-pointer'}
      disabled={loading}
      variant={variant}
      aria-label={ariaLabel}
      onClick={type === 'submit' ? undefined : onClick}
      size={size}
    >
      {text}
      <LoaderCircle className={`animate-spin ${loading ? 'inline-block' : 'hidden'}`} />
    </Button>
  )
}
