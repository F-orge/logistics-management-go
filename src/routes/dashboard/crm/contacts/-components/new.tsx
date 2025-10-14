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
import { createContact } from '@/queries/crm/contacts';
import { crmContactInsertSchema } from '@/schemas/crm/contacts';

const NewContactFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/contacts' });
  const searchQuery = useSearch({ from: '/dashboard/crm/contacts/' });
  const { queryClient } = useRouteContext({ from: '/dashboard/crm/contacts/' });

  const createMutation = useMutation(createContact, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Contact</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new contact record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(crmContactInsertSchema)}
          onSubmit={async (value: z.infer<typeof crmContactInsertSchema>) => {
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

export default NewContactFormDialog;
