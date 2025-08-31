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
import { type OrgRolesRecord } from '@/pocketbase/types';

export const EditRoleForm = withForm({
  defaultValues: {} as UpdateRecord<OrgRolesRecord>,
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

const EditRoleDialog = () => {
  const route = getRouteApi('/dashboard/org/roles/');

  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  const { data: role } = useSuspenseQuery({
    queryKey: ['roles', searchParams.id],
    queryFn: () => pb.collection('org_roles').getOne(searchParams.id ?? ''),
  });

  const form = useAppForm({
    defaultValues: role as UpdateRecord<OrgRolesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          pb.collection('org_roles').update(searchParams.id ?? '', value),
          {
            success: 'Role Updated Successfully',
            error: 'An Error Occurred when updating the record',
          },
        )
        .unwrap();

      navigate({
        search: (prev) => ({ ...prev, editRole: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchParams.editRole}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            editRole: undefined,
            id: undefined,
          }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role Information</DialogTitle>
          <DialogDescription>
            Change the information for: {role.name}
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
            <EditRoleForm form={form} />
            <form.SubmitButton>Edit Role</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoleDialog;
