import type React from 'react'
import { useFieldContext } from '@/components/form'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export const TextAreaField = ({
  className,
  label,
  description,
  ...props
}: React.ComponentProps<'textarea'> & {
  label?: React.ReactNode
  description?: React.ReactNode
}) => {
  const field = useFieldContext<string>()

  return (
    <Field className={cn('grid gap-2.5', className)}>
      {label &&
        (typeof label === 'object' ? (
          <FieldLabel
            className={cn(field.state.meta.errorMap.onSubmit && 'text-destructive')}
            htmlFor={props.id}
          >
            {label}
          </FieldLabel>
        ) : (
          label
        ))}
      <Textarea
        aria-invalid={!!field.state.meta.errorMap.onSubmit}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        id={props.id}
        {...props}
      />
      <FieldDescription>{description}</FieldDescription>
      {field.state.meta.errorMap.onSubmit && (
        <FieldError className="text-destructive">
          {field.state.meta.errorMap.onSubmit.message}
        </FieldError>
      )}
    </Field>
  )
}
