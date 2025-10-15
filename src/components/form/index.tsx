import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import CheckBoxField from '@/components/form/fields/checkbox-field'
import { DateField } from '@/components/form/fields/date-field'
import { SelectField } from '@/components/form/fields/select-field'
import { TextAreaField } from '@/components/form/fields/text-area-field'
import { TextField } from '@/components/form/fields/text-field'
import { Button } from '@/components/ui/button'
import NumberField from './fields/number-field'

export const SubmitButton = ({ ...props }: React.ComponentProps<'button'>) => {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <Button disabled={isSubmitting} type="submit" {...props} />}
    </form.Subscribe>
  )
}

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    SelectField,
    DateField,
    CheckBoxField,
    TextAreaField,
    NumberField,
  },
  formComponents: { SubmitButton },
})
