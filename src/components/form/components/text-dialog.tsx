import type React from 'react'
import { withForm } from '@/components/form'
import FormDialog from '@/components/ui/form-dialog'

const EditTextDialog = withForm({
  props: {} as {
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    onSave: () => void
    title?: string
    description?: string
    name: string
    inputLabel?: React.ReactNode
    inputDescription?: React.ReactNode
  },
  render: ({
    form,
    name,
    inputLabel,
    inputDescription,
    title,
    description,
    defaultOpen,
    onOpenChange,
    onSave,
  }) => (
    <form.AppForm>
      <FormDialog
        onSave={onSave}
        open={defaultOpen}
        onOpenChange={onOpenChange}
        title={title}
        description={description}
      >
        <form.AppField name={name}>
          {(field) => <field.TextField label={inputLabel} description={inputDescription} />}
        </form.AppField>
      </FormDialog>
    </form.AppForm>
  ),
})

export default EditTextDialog
