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
  type TmsDriversRecord,
  TmsDriversStatusOptions,
} from '@/pocketbase/types';

export const NewDriverForm = withForm({
  defaultValues: {} as CreateRecord<TmsDriversRecord>,
  props: {} as {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="employee_id">
          {(field) => (
            <field.TextField
              label="Employee ID"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="first_name">
          {(field) => (
            <field.TextField
              label="First Name"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="last_name">
          {(field) => (
            <field.TextField
              label="Last Name"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label="Email"
              required
              type="email"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="phone_number">
          {(field) => (
            <field.TextField
              label="Phone Number"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="license_number">
          {(field) => (
            <field.TextField
              label="License Number"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="hire_date">
          {(field) => (
            <field.DateField
              label="Hire Date"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              options={Object.keys(TmsDriversStatusOptions).map((val) => ({
                label: val,
                value: val,
              }))}
              label="Status"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewDriverDialog = () => {
  const route = getRouteApi('/dashboard/tms/drivers/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<TmsDriversRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('tms_drivers').create(value), {
          success: 'Successfully created a driver',
          error: 'An error occurred when creating a driver',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newDriver: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newDriver}
      onOpenChange={(_) =>
        navigate({ search: (prev) => ({ ...prev, newDriver: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Driver</DialogTitle>
          <DialogDescription>Create a new driver</DialogDescription>
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
            <NewDriverForm form={form} />
            <form.SubmitButton className="col-start-4">
              Create Driver
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewDriverDialog;
