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
import { createPutawayRule } from '@/queries/wms';
import { wmsPutawayRuleInsertSchema } from '@/schemas/wms/putaway_rule';

const NewPutawayRuleFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/putaway-rule',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/putaway-rule/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/putaway-rule/',
  });

  const createMutation = useMutation(createPutawayRule, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Putaway Rule</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new putaway rule record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsPutawayRuleInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof wmsPutawayRuleInsertSchema>,
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

export default NewPutawayRuleFormDialog;
