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
import { type OrgOrganizationRecord } from '@/pocketbase/types';

export const EditOrganizationForm = withForm({
  defaultValues: {} as UpdateRecord<OrgOrganizationRecord>,
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

const EditOrganizationDialog = () => {
  const route = getRouteApi('/dashboard/org/organization/');

  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  const { data: organization } = useSuspenseQuery({
    queryKey: ['organizations', searchParams.id],
    queryFn: () =>
      pb.collection('org_organization').getOne(searchParams.id ?? ''),
  });

  const form = useAppForm({
    defaultValues: organization as UpdateRecord<OrgOrganizationRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          pb
            .collection('org_organization')
            .update(searchParams.id ?? '', value),
          {
            success: 'Organization Updated Successfully',
            error: 'An Error Occurred when updating the record',
          },
        )
        .unwrap();

      navigate({
        search: (prev) => ({
          ...prev,
          editOrganization: undefined,
          id: undefined,
        }),
      });
    },
  });

  return (
    <Dialog
      open={searchParams.editOrganization}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            editOrganization: undefined,
            id: undefined,
          }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Organization Information</DialogTitle>
          <DialogDescription>
            Change the information for: {organization.name}
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
            <EditOrganizationForm form={form} />
            <form.SubmitButton>Edit Organization</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrganizationDialog;
