import { useSuspenseQuery } from '@tanstack/react-query';
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
import { pb, type UpdateRecord } from '@/pocketbase';
import { type CrmCompaniesRecord } from '@/pocketbase/types';

export const EditCompanyForm = withForm({
  defaultValues: {} as UpdateRecord<CrmCompaniesRecord>,
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

const EditCompanyDialog = () => {
  const route = getRouteApi('/dashboard/crm/companies/');

  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  const { data: company } = useSuspenseQuery({
    queryKey: ['companies', searchParams.id],
    queryFn: () => pb.collection('crm_companies').getOne(searchParams.id ?? ''),
  });

  const form = useAppForm({
    defaultValues: company as UpdateRecord<CrmCompaniesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          pb.collection('crm_companies').update(searchParams.id ?? '', value),
          {
            success: 'Company Updated Successfully',
            error: 'An Error Occurred when updating the record',
          },
        )
        .unwrap();

      navigate({
        search: (prev) => ({ ...prev, editCompany: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchParams.editCompany}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            editCompany: undefined,
            id: undefined,
          }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Company Information</DialogTitle>
          <DialogDescription>
            Change the information for: {company.name}
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-4 gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <EditCompanyForm form={form} />
            <form.SubmitButton>Edit Company</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCompanyDialog;
