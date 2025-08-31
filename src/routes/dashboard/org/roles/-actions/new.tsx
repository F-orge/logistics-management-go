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
import { type OrgRolesRecord } from '@/pocketbase/types';

export const NewRoleForm = withForm({
  defaultValues: {} as CreateRecord<OrgRolesRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Role Name"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="organization">
          {(field) => (
            <field.TextField
              label="Organization"
              className="col-span-full"
              placeholder="Organization ID"
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

const NewRoleDialog = () => {
  const route = getRouteApi('/dashboard/org/roles/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<OrgRolesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('org_roles').create(value), {
          success: 'Successfully created role',
          error: 'An error occurred when creating role',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newRole: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newRole}
      onOpenChange={(_) =>
        navigate({ search: (prev) => ({ ...prev, newRole: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Role</DialogTitle>
          <DialogDescription>Create a new role record</DialogDescription>
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
            <NewRoleForm form={form} />
            <form.SubmitButton className="col-start-4">
              Create Role
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoleDialog;
