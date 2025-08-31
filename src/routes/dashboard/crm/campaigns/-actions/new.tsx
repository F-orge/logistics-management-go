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
  type CrmCampaignsRecord,
  CrmCampaignsStatusOptions,
} from '@/pocketbase/types';

export const NewCampaignForm = withForm({
  defaultValues: {} as CreateRecord<CrmCampaignsRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Campaign Name"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextField label="Description" className="col-span-full" />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              options={Object.keys(CrmCampaignsStatusOptions).map((val) => ({
                label: val.charAt(0).toUpperCase() + val.slice(1),
                value: val,
              }))}
              label="Status"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="budget">
          {(field) => <field.TextField label="Budget" className="col-span-2" />}
        </form.AppField>
        <form.AppField name="start_date">
          {(field) => (
            <field.DateField
              label="Start Date"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="end_date">
          {(field) => (
            <field.DateField label="End Date" className="col-span-2" />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewCampaignDialog = () => {
  const route = getRouteApi('/dashboard/crm/campaigns/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<CrmCampaignsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('crm_campaigns').create(value), {
          success: 'Successfully created a campaign',
          error: 'An error occurred when creating a campaign',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newCampaign: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newCampaign}
      onOpenChange={(_) =>
        navigate({ search: (prev) => ({ ...prev, newCampaign: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Campaign</DialogTitle>
          <DialogDescription>Create a new marketing campaign</DialogDescription>
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
            <NewCampaignForm form={form} />
            <form.SubmitButton className="col-start-4">
              Create Campaign
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignDialog;
