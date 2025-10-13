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
import { billingQuoteInsertSchema } from '@/schemas/billing/quote';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createQuote } from '@/queries/billing';

const NewQuoteFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/quote',
  });
  const searchQuery = useSearch({
    from: '/dashboard/billing/quote/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/quote/',
  });

  const createMutation = useMutation(createQuote, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Quote</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new quote record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingQuoteInsertSchema)}
          onSubmit={async (value: z.infer<typeof billingQuoteInsertSchema>) => {
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

export default NewQuoteFormDialog;
