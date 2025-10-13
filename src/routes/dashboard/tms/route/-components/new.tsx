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
import { tmsRouteInsertSchema } from '@/schemas/tms/route';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createRoute } from '@/queries/tms';

const NewRouteFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/route',
  });
  const searchQuery = useSearch({
    from: '/dashboard/tms/route/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/route/',
  });

  const createMutation = useMutation(createRoute, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Route</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new route record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsRouteInsertSchema)}
          onSubmit={async (value: z.infer<typeof tmsRouteInsertSchema>) => {
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

export default NewRouteFormDialog;
