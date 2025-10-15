import { ZodProvider } from '@autoform/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouteContext, useSearch } from '@tanstack/react-router'
import type z from 'zod'
import { AutoForm } from '@/components/ui/autoform'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FieldSeparator } from '@/components/ui/field'
import { createCreditNote } from '@/queries/billing'
import { billingCreditNoteInsertSchema } from '@/schemas/billing/credit_note'

const NewCreditNoteFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/credit-note',
  })
  const searchQuery = useSearch({
    from: '/dashboard/billing/credit-note/',
  })
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/credit-note/',
  })

  const createMutation = useMutation(createCreditNote, queryClient)

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() => navigate({ search: (prev) => ({ ...prev, new: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Credit Note</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new credit note record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingCreditNoteInsertSchema)}
          onSubmit={async (value: z.infer<typeof billingCreditNoteInsertSchema>) => {
            await createMutation.mutateAsync(value, {
              onSuccess: () => {
                navigate({ search: (prev) => ({ ...prev, new: undefined }) })
              },
            })
          }}
          withSubmit
        />
      </DialogContent>
    </Dialog>
  )
}

export default NewCreditNoteFormDialog
