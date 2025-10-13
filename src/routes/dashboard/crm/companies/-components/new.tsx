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
import { ZodProvider } from '@autoform/zod';

const NewCompanyFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/companies' });
  const searchQuery = useSearch({ from: '/dashboard/crm/companies/' });
  const { queryClient } = useRouteContext({
    from: '/dashboard/crm/companies/',
  });

  const createMutation = useMutation(createCompany, queryClient);

  const form = useAppForm({
    defaultValues: {} as ORPCInputs['crm']['createCompany'],
    validators: {
      onChange: crmCompanyInsertSchema,
    },
    onSubmit: async ({ value }) =>
      createMutation.mutateAsync(value, {
        onSuccess: () => {
          navigate({ search: (prev) => ({ ...prev, new: undefined }) });
        },
      }),
  });

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <AutoForm schema={new ZodProvider(crmCompanyInsertSchema)} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCompanyFormDialog;
