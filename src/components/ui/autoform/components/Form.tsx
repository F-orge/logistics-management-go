import React from 'react'
import { FieldGroup } from '../../field'

export const Form = React.forwardRef<HTMLFormElement, React.ComponentProps<'form'>>(
  ({ children, ...props }, ref) => {
    return (
      <form ref={ref} className="space-y-4" {...props}>
        <FieldGroup>{children}</FieldGroup>
      </form>
    )
  },
)
