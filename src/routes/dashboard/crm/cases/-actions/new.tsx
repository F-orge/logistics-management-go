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
import { type CreateRecord, pb } from '@/pocketbase';
import {
  CrmCasesPriorityOptions,
  type CrmCasesRecord,
  CrmCasesStatusOptions,
  type CrmContactsRecord,
} from '@/pocketbase/types';

export const NewCaseForm = withForm({
  defaultValues: {} as CreateRecord<CrmCasesRecord>,
  props: {} as {
    contacts: CrmContactsRecord[];
  },
  render: function ({ form, contacts }) {
    return (
      <>
        <form.AppField name="subject">
          {(field) => (
            <field.TextField
              label="Subject"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextField
              label="Description"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              options={Object.keys(CrmCasesStatusOptions).map((val) => ({
                label:
                  val.charAt(0).toUpperCase() + val.slice(1).replace('_', ' '),
                value: val,
              }))}
              label="Status"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="priority">
          {(field) => (
            <field.SelectField
              options={Object.keys(CrmCasesPriorityOptions).map((val) => ({
                label: val.charAt(0).toUpperCase() + val.slice(1),
                value: val,
              }))}
              label="Priority"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="contact">
          {(field) => (
            <field.SelectField
              options={contacts.map((val) => ({
                label: `${val.first_name} ${val.last_name}`,
                value: val.id,
              }))}
              label="Contact"
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="closed_at">
          {(field) => (
            <field.DateField label="Closed Date" className="col-span-full" />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewCaseDialog = () => {
  const route = getRouteApi('/dashboard/crm/cases/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const { data: contacts } = useSuspenseQuery({
    queryKey: ['crm_contacts'],
    queryFn: () => pb.collection('crm_contacts').getList(1, 50),
  });

  const form = useAppForm({
    defaultValues: {} as CreateRecord<CrmCasesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('crm_cases').create(value), {
          success: 'Successfully created a case',
          error: 'An error occurred when creating a case',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newCase: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newCase}
      onOpenChange={(_) =>
        navigate({
          search: (prev) => ({ ...prev, newCase: undefined }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Case</DialogTitle>
          <DialogDescription>Create a new support case</DialogDescription>
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
            <NewCaseForm contacts={contacts.items} form={form} />
            <form.SubmitButton className="col-start-4">
              Create Case
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCaseDialog;
