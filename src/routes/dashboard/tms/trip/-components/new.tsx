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
import { createTrip } from '@/queries/tms'
import { tmsTripInsertSchema } from '@/schemas/tms/trip'

const NewTripFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/trip',
  })
  const searchQuery = useSearch({
    from: '/dashboard/tms/trip/',
  })
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/trip/',
  })

  const createMutation = useMutation(createTrip, queryClient)

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() => navigate({ search: (prev) => ({ ...prev, new: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Trip</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new trip record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsTripInsertSchema)}
          onSubmit={async (value: z.infer<typeof tmsTripInsertSchema>) => {
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

export default NewTripFormDialog
