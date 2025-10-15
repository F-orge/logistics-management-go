import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type React from 'react'
import { useFieldContext } from '@/components/form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export const DateField = ({
  className,
  label,
  description,
  ...props
}: React.ComponentProps<'input'> & {
  label?: React.ReactNode
  description?: React.ReactNode
}) => {
  const field = useFieldContext<Date>()

  return (
    <Field className={className}>
      {label && <FieldLabel htmlFor={props.id}>{label}</FieldLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!field.state.value}
            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
          >
            <CalendarIcon />
            {field.state.value ? format(field.state.value, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            required
            mode="single"
            selected={field.state.value}
            onSelect={field.handleChange}
          />
        </PopoverContent>
      </Popover>
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  )
}
