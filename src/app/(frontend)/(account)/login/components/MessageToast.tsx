'use client'

import React, { useEffect } from 'react'
import { toast } from 'sonner'

interface MessageToastProps {
  message?: string
}

const MessageToast: React.FC<MessageToastProps> = ({ message }) => {
  // Mostrar el mensaje en el toast solo si hay uno
  useEffect(() => {
    if (message) {
      toast.success(message)
    }
  }, [message])

  return null
}

export default MessageToast
