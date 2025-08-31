import { getRouteApi } from '@tanstack/react-router';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppForm, withForm } from '@/components/ui/form';
import { type CreateRecord, pb } from '@/pocketbase';
import { type CrmCompaniesRecord } from '@/pocketbase/types';

export const NewCompanyForm = withForm({
  defaultValues: {} as CreateRecord<CrmCompaniesRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Company Name"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="industry">
          {(field) => (
            <field.TextField label="Industry" className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label="Email"
              type="email"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="phone_number">
          {(field) => (
            <field.TextField label="Phone Number" className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="website">
          {(field) => (
            <field.TextField
              label="Website"
              placeholder="https://example.com"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextField label="Description" className="col-span-full" />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewCompanyDialog = () => {
  const route = getRouteApi('/dashboard/crm/companies/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<CrmCompaniesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('crm_companies').create(value), {
          success: 'Successfully created a company',
          error: 'An error occurred when creating a company',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newCompany: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newCompany}
      onOpenChange={(_) =>
        navigate({ search: (prev) => ({ ...prev, newCompany: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Company</DialogTitle>
          <DialogDescription>Create a new company record</DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-4 gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <NewCompanyForm form={form} />
            <form.SubmitButton className="col-start-4">
              Create Company
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCompanyDialog;
