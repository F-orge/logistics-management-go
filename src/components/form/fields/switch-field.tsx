import { Eye, EyeClosed } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { useFieldContext } from '@/components/form'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export const TextField = ({
  className,
  label,
  description,
  ...props
}: React.ComponentProps<'input'> & {
  label?: React.ReactNode
  description?: React.ReactNode
}) => {
  const field = useFieldContext<boolean>()

  return (
    <Field orientation="horizontal">
      <FieldContent>
        {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
      <Switch
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked)}
      />
    </Field>
  )
}
