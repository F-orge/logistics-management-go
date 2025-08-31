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
  type CrmInteractionsRecord,
  CrmInteractionsTypeOptions,
  type CrmOpportunitiesRecord,
} from '@/pocketbase/types';

export const NewInteractionForm = withForm({
  defaultValues: {} as CreateRecord<CrmInteractionsRecord>,
  props: {} as {
    contacts: CrmContactsRecord[];
    opportunities: CrmOpportunitiesRecord[];
  },
  render: function ({ form, contacts, opportunities }) {
    return (
      <>
        <form.AppField name="type">
          {(field) => (
            <field.SelectField
              options={Object.keys(CrmInteractionsTypeOptions).map((val) => ({
                label: val.charAt(0).toUpperCase() + val.slice(1),
                value: val,
              }))}
              label="Type"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="interaction_date">
          {(field) => (
            <field.DateField
              label="Interaction Date"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="subject">
          {(field) => (
            <field.TextField label="Subject" className="col-span-full" />
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
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="opportunity">
          {(field) => (
            <field.SelectField
              options={opportunities.map((val) => ({
                label: val.name,
                value: val.id,
              }))}
              label="Opportunity"
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

const NewInteractionDialog = () => {
  const route = getRouteApi('/dashboard/crm/interactions/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const { data: contacts } = useSuspenseQuery({
    queryKey: ['crm_contacts'],
    queryFn: () => pb.collection('crm_contacts').getList(1, 50),
  });

  const { data: opportunities } = useSuspenseQuery({
    queryKey: ['crm_opportunities'],
    queryFn: () => pb.collection('crm_opportunities').getList(1, 50),
  });

  const form = useAppForm({
    defaultValues: {} as CreateRecord<CrmInteractionsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('crm_interactions').create(value), {
          success: 'Successfully created an interaction',
          error: 'An error occurred when creating an interaction',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newInteraction: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newInteraction}
      onOpenChange={(_) =>
        navigate({
          search: (prev) => ({ ...prev, newInteraction: undefined }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Interaction</DialogTitle>
          <DialogDescription>
            Record a new customer interaction
          </DialogDescription>
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
            <NewInteractionForm
              contacts={contacts.items}
              opportunities={opportunities.items}
              form={form}
            />
            <form.SubmitButton className="col-start-4">
              Create Interaction
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewInteractionDialog;
