import { ZodProvider } from '@autoform/zod';
import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import z from 'zod';
import { AutoForm } from '@/components/ui/autoform';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldSeparator } from '@/components/ui/field';
import { createGpsPing } from '@/queries/tms';
import { tmsGpsPingInsertSchema } from '@/schemas/tms/gps_ping';

const NewGpsPingFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/gps-ping',
  });
  const searchQuery = useSearch({
    from: '/dashboard/tms/gps-ping/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/gps-ping/',
  });

  const createMutation = useMutation(createGpsPing, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Gps Ping</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new gps ping record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsGpsPingInsertSchema)}
          onSubmit={async (value: z.infer<typeof tmsGpsPingInsertSchema>) => {
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

export default NewGpsPingFormDialog;
