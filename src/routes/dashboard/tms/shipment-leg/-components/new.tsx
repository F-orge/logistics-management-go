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
import { tmsShipmentLegInsertSchema } from '@/schemas/tms/shipment_leg';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createShipmentLeg } from '@/queries/tms';

const NewShipmentLegFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/shipment-leg',
  });
  const searchQuery = useSearch({
    from: '/dashboard/tms/shipment-leg/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/shipment-leg/',
  });

  const createMutation = useMutation(createShipmentLeg, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Shipment Leg</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new shipment leg record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsShipmentLegInsertSchema)}
          onSubmit={async (value: z.infer<typeof tmsShipmentLegInsertSchema>) => {
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

export default NewShipmentLegFormDialog;
