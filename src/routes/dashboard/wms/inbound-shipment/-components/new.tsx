import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import { AutoForm } from '@/components/ui/autoform';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldSeparator } from '@/components/ui/field';
import { wmsInboundShipmentInsertSchema } from '@/schemas/wms/inbound_shipment';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createInboundShipment } from '@/queries/wms';

const NewInboundShipmentFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/inbound-shipment',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/inbound-shipment/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/inbound-shipment/',
  });

  const createMutation = useMutation(createInboundShipment, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Inbound Shipment</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new inbound shipment record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsInboundShipmentInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof wmsInboundShipmentInsertSchema>,
          ) => {
            await createMutation.mutateAsync(value, {
              onSuccess: () => {
                navigate({ search: (prev) => ({ ...prev, new: undefined }) });
              },
            });
          }}
          withSubmit
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewInboundShipmentFormDialog;
