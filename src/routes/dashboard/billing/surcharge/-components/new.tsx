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
import { createSurcharge } from '@/queries/billing'
import { billingSurchargeInsertSchema } from '@/schemas/billing/surcharge'

const NewSurchargeFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/surcharge',
  })
  const searchQuery = useSearch({
    from: '/dashboard/billing/surcharge/',
  })
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/surcharge/',
  })

  const createMutation = useMutation(createSurcharge, queryClient)

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() => navigate({ search: (prev) => ({ ...prev, new: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Surcharge</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new surcharge record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingSurchargeInsertSchema)}
          onSubmit={async (value: z.infer<typeof billingSurchargeInsertSchema>) => {
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

export default NewSurchargeFormDialog
