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
import { wmsBinThresholdInsertSchema } from '@/schemas/wms/bin_threshold';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createBinThreshold } from '@/queries/wms';

const NewBinThresholdFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/bin-threshold',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/bin-threshold/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/bin-threshold/',
  });

  const createMutation = useMutation(createBinThreshold, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Bin Threshold</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new bin threshold record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsBinThresholdInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsBinThresholdInsertSchema>) => {
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

export default NewBinThresholdFormDialog;
