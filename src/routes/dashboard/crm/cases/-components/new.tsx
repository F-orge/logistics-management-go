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
import { createCase } from '@/queries/crm/cases';
import { crmCaseInsertSchema } from '@/schemas/crm/cases';

const NewCaseFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/cases' });
  const searchQuery = useSearch({ from: '/dashboard/crm/cases/' });
  const { queryClient } = useRouteContext({ from: '/dashboard/crm/cases/' });

  const createMutation = useMutation(createCase, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Case</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new case record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(crmCaseInsertSchema)}
          onSubmit={async (value: z.infer<typeof crmCaseInsertSchema>) => {
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

export default NewCaseFormDialog;
