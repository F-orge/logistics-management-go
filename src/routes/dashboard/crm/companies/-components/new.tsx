import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import { useAppForm } from '@/components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { ORPCInputs } from '@/orpc/client';
import { createCompany } from '@/queries/crm/companies';
import { crmCompanyInsertSchema } from '@/schemas/crm/companies';
import { AutoForm } from '@/components/ui/autoform';
import { ZodProvider, fieldConfig } from '@autoform/zod';
import z from 'zod';

const NewCompanyFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/companies' });
  const searchQuery = useSearch({ from: '/dashboard/crm/companies/' });
  const { queryClient } = useRouteContext({
    from: '/dashboard/crm/companies/',
  });

  const createMutation = useMutation(createCompany, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Company</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new company record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(crmCompanyInsertSchema)}
          onSubmit={async (value: z.infer<typeof crmCompanyInsertSchema>) => {
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

export default NewCompanyFormDialog;
