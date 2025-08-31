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
import {
  type CrmContactsRecord,
  type CrmInteractionsRecord,
  CrmInteractionsTypeOptions,
  type CrmOpportunitiesRecord,
} from '@/pocketbase/types';

export const EditInteractionForm = withForm({
  defaultValues: {} as UpdateRecord<CrmInteractionsRecord>,
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

const EditInteractionDialog = () => {
  const route = getRouteApi('/dashboard/crm/interactions/');

  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  const { data: interaction } = useSuspenseQuery({
    queryKey: ['interactions', searchParams.id],
    queryFn: () =>
      pb.collection('crm_interactions').getOne(searchParams.id ?? ''),
  });

  const { data: contacts } = useSuspenseQuery({
    queryKey: ['contacts', searchParams.id],
    queryFn: () => pb.collection('crm_contacts').getList(1, 50),
  });

  const { data: opportunities } = useSuspenseQuery({
    queryKey: ['opportunities', searchParams.id],
    queryFn: () => pb.collection('crm_opportunities').getList(1, 50),
  });

  const form = useAppForm({
    defaultValues: interaction as UpdateRecord<CrmInteractionsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          pb
            .collection('crm_interactions')
            .update(searchParams.id ?? '', value),
          {
            success: 'Interaction Updated Successfully',
            error: 'An Error Occurred when updating the record',
          },
        )
        .unwrap();

      navigate({
        search: (prev) => ({
          ...prev,
          editInteraction: undefined,
          id: undefined,
        }),
      });
    },
  });

  return (
    <Dialog
      open={searchParams.editInteraction}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            editInteraction: undefined,
            id: undefined,
          }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Interaction Information</DialogTitle>
          <DialogDescription>
            Change the information for:{' '}
            {interaction.subject || 'this interaction'}
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
            <EditInteractionForm
              form={form}
              contacts={contacts.items}
              opportunities={opportunities.items}
            />
            <form.SubmitButton>Edit Interaction</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInteractionDialog;
