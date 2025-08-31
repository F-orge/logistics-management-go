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
import { type OrgTeamsRecord } from '@/pocketbase/types';

export const NewTeamForm = withForm({
  defaultValues: {} as CreateRecord<OrgTeamsRecord>,
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

const NewTeamDialog = () => {
  const route = getRouteApi('/dashboard/org/teams/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<OrgTeamsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('org_teams').create(value), {
          success: 'Successfully created team',
          error: 'An error occurred when creating team',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newTeam: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newTeam}
      onOpenChange={(_) =>
        navigate({ search: (prev) => ({ ...prev, newTeam: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Team</DialogTitle>
          <DialogDescription>Create a new team record</DialogDescription>
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
            <NewTeamForm form={form} />
            <form.SubmitButton className="col-start-4">
              Create Team
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTeamDialog;
