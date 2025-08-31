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
import { type OrgTeamsRecord } from '@/pocketbase/types';

export const EditTeamForm = withForm({
  defaultValues: {} as UpdateRecord<OrgTeamsRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Team Name"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="organization">
          {(field) => (
            <field.TextField
              label="Organization"
              required
              className="col-span-full"
              placeholder="Organization ID"
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
      </>
    );
  },
});

const EditTeamDialog = () => {
  const route = getRouteApi('/dashboard/org/teams/');

  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  const { data: team } = useSuspenseQuery({
    queryKey: ['teams', searchParams.id],
    queryFn: () => pb.collection('org_teams').getOne(searchParams.id ?? ''),
  });

  const form = useAppForm({
    defaultValues: team as UpdateRecord<OrgTeamsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          pb.collection('org_teams').update(searchParams.id ?? '', value),
          {
            success: 'Team Updated Successfully',
            error: 'An Error Occurred when updating the record',
          },
        )
        .unwrap();

      navigate({
        search: (prev) => ({ ...prev, editTeam: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchParams.editTeam}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            editTeam: undefined,
            id: undefined,
          }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Team Information</DialogTitle>
          <DialogDescription>
            Change the information for: {team.name}
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
            <EditTeamForm form={form} />
            <form.SubmitButton>Edit Team</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamDialog;
