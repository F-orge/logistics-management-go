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
import { type OrgOrganizationRecord } from '@/pocketbase/types';

export const NewOrganizationForm = withForm({
  defaultValues: {} as CreateRecord<OrgOrganizationRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Organization Name"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="owner">
          {(field) => (
            <field.TextField
              label="Owner"
              required
              className="col-span-full"
              placeholder="User ID"
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewOrganizationDialog = () => {
  const route = getRouteApi('/dashboard/org/organization/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<OrgOrganizationRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('org_organization').create(value), {
          success: 'Successfully created organization',
          error: 'An error occurred when creating organization',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newOrganization: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newOrganization}
      onOpenChange={(_) =>
        navigate({
          search: (prev) => ({ ...prev, newOrganization: undefined }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Organization</DialogTitle>
          <DialogDescription>
            Create a new organization record
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
            <NewOrganizationForm form={form} />
            <form.SubmitButton className="col-start-4">
              Create Organization
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrganizationDialog;
