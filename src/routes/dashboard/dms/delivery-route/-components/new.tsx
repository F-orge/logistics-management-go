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
import { createDeliveryRoute } from '@/queries/dms'
import { dmsDeliveryRouteInsertSchema } from '@/schemas/dms/delivery_route'

const NewDeliveryRouteFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/dms/delivery-route',
  })
  const searchQuery = useSearch({
    from: '/dashboard/dms/delivery-route/',
  })
  const { queryClient } = useRouteContext({
    from: '/dashboard/dms/delivery-route/',
  })

  const createMutation = useMutation(createDeliveryRoute, queryClient)

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() => navigate({ search: (prev) => ({ ...prev, new: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Delivery Route</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new delivery route record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(dmsDeliveryRouteInsertSchema)}
          onSubmit={async (value: z.infer<typeof dmsDeliveryRouteInsertSchema>) => {
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

export default NewDeliveryRouteFormDialog
