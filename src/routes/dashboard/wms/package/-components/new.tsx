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
import { createPackage } from '@/queries/wms';
import { wmsPackageInsertSchema } from '@/schemas/wms/package';

const NewPackageFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/package',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/package/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/package/',
  });

  const createMutation = useMutation(createPackage, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Package</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new package record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsPackageInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsPackageInsertSchema>) => {
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

export default NewPackageFormDialog;
