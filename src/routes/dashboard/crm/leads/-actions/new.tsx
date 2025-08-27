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
  type CrmContactsRecord,
  CrmLeadsLeadStatusOptions,
  type CrmLeadsRecord,
} from '@/pocketbase/types';

export const NewLeadsForm = withForm({
  defaultValues: {} as CreateRecord<CrmLeadsRecord>,
  props: {} as { contacts: CrmContactsRecord[] },
  render: function ({ form, contacts }) {
    return (
      <>
        <form.AppField name="company_name">
          {(field) => (
            <field.TextField
              label="Company Name"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="first_name">
          {(field) => (
            <field.TextField label="First Name" className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="last_name">
          {(field) => (
            <field.TextField label="Last Name" className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.TextField label="Email" className="col-span-full" />
          )}
        </form.AppField>
        <form.AppField name="lead_score">
          {(field) => (
            <field.TextField label="Lead Score" className="col-span-1" />
          )}
        </form.AppField>
        <form.AppField name="lead_status">
          {(field) => (
            <field.SelectField
              options={Object.keys(CrmLeadsLeadStatusOptions).map((val) => ({
                label: val,
                value: val,
              }))}
              label="Lead Status"
              className="col-span-1"
            />
          )}
        </form.AppField>
        <form.AppField name="lead_source">
          {(field) => (
            <field.TextField label="Lead Source" className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="phone_number">
          {(field) => (
            <field.TextField label="Phone Number" className="col-span-full" />
          )}
        </form.AppField>
        <form.AppField name="converted_to_contact">
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
      </>
    );
  },
});

const NewLeadsDialog = () => {
  const route = getRouteApi('/dashboard/crm/leads/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const { data: contacts } = useSuspenseQuery({
    queryKey: ['crm_contacts'],
    queryFn: () => pb.collection('crm_contacts').getList(1, 10),
  });

  const form = useAppForm({
    defaultValues: {} as CreateRecord<CrmLeadsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('crm_leads').create(value), {
          success: 'Successfully created a lead',
          error: 'An error occured when creating a lead',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newLead: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newLead}
      onOpenChange={(_) =>
        navigate({ search: (prev) => ({ ...prev, newLead: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Lead</DialogTitle>
          <DialogDescription>Create a new Lead</DialogDescription>
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
            <NewLeadsForm contacts={contacts.items} form={form} />
            <form.SubmitButton className="col-start-4">
              Create Lead
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeadsDialog;
