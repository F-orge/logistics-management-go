import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Route } from './route';
import { useAppForm, withForm } from '@/components/ui/form';
import type { CreateRolePayload } from '@/lib/bindings/CreateRolePayload';

const NewRole = () => {
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();

  const form = useAppForm({
    defaultValues: {
      name: '',
      description: '',
      permissions: [], //ids
    } as CreateRolePayload,
    onSubmit: async ({ value }) => {},
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={(e) => {
        navigate({ search: (prev) => ({ ...prev, new: e || undefined }) });
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Role</DialogTitle>
          <DialogDescription>Create a new role</DialogDescription>
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
            <form.AppField name="name">
              {(field) => (
                <field.TextField
                  label="Name"
                  required
                  className="col-span-full"
                />
              )}
            </form.AppField>
            <form.AppField name="description">
              {(field) => (
                <field.TextAreaField
                  label="Description"
                  required
                  className="col-span-full"
                />
              )}
            </form.AppField>
            <form.SubmitButton>Create Role</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRole;
