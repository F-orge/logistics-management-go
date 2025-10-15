import type React from 'react'
import { useFormContext } from '@/components/form'
import { Button } from '@/components/ui/button'

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({ children, ...props }) => {
  return (
    <Button type="submit" {...props}>
      {children}
    </Button>
  )
}
