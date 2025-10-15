import type React from 'react'
import { useFieldContext } from '@/components/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const CheckBoxField = ({
  className,
  label,
  description,
  ...props
}: React.ComponentProps<'input'> & {
  label?: string
  description?: string
}) => {
  const field = useFieldContext<boolean>()

  return (
    <Field orientation="horizontal" className={className}>
      <Checkbox
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(!!checked)}
      />
      <FieldContent>
        {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  )
}

export default CheckBoxField
