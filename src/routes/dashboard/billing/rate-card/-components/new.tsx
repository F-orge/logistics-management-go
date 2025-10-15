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
import { createRateCard } from '@/queries/billing'
import { billingRateCardInsertSchema } from '@/schemas/billing/rate_card'

const NewRateCardFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/rate-card',
  })
  const searchQuery = useSearch({
    from: '/dashboard/billing/rate-card/',
  })
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/rate-card/',
  })

  const createMutation = useMutation(createRateCard, queryClient)

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() => navigate({ search: (prev) => ({ ...prev, new: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Rate Card</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new rate card record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingRateCardInsertSchema)}
          onSubmit={async (value: z.infer<typeof billingRateCardInsertSchema>) => {
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

export default NewRateCardFormDialog
