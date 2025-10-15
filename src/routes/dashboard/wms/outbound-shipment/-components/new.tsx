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
import { createOutboundShipment } from '@/queries/wms'
import { wmsOutboundShipmentInsertSchema } from '@/schemas/wms/outbound_shipment'

const NewOutboundShipmentFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/outbound-shipment',
  })
  const searchQuery = useSearch({
    from: '/dashboard/wms/outbound-shipment/',
  })
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/outbound-shipment/',
  })

  const createMutation = useMutation(createOutboundShipment, queryClient)

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() => navigate({ search: (prev) => ({ ...prev, new: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Outbound Shipment</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new outbound shipment record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsOutboundShipmentInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsOutboundShipmentInsertSchema>) => {
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

export default NewOutboundShipmentFormDialog
