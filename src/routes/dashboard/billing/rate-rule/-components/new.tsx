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
import { billingRateRuleInsertSchema } from '@/schemas/billing/rate_rule';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createRateRule } from '@/queries/billing';

const NewRateRuleFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/rate-rule',
  });
  const searchQuery = useSearch({
    from: '/dashboard/billing/rate-rule/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/rate-rule/',
  });

  const createMutation = useMutation(createRateRule, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Rate Rule</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new rate rule record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingRateRuleInsertSchema)}
          onSubmit={async (value: z.infer<typeof billingRateRuleInsertSchema>) => {
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

export default NewRateRuleFormDialog;
