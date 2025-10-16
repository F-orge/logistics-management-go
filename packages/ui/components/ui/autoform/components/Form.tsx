import React from 'react'
import { FieldSet } from '../../field'

export const Form = React.forwardRef<HTMLFormElement, React.ComponentProps<'form'>>(
  ({ children, onSubmit, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className="space-y-4"
        {...props}
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onSubmit?.(e)
        }}
      >
        <FieldSet>{children}</FieldSet>
      </form>
    )
  },
)
