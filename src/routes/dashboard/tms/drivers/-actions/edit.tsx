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
  type TmsDriversRecord,
  TmsDriversStatusOptions,
} from '@/pocketbase/types';

export const EditDriverForm = withForm({
  defaultValues: {} as UpdateRecord<TmsDriversRecord>,
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

const EditDriverDialog = () => {
  const route = getRouteApi('/dashboard/tms/drivers/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const { data: driver } = useSuspenseQuery({
    queryKey: ['tms_drivers', params.id],
    queryFn: () => pb.collection('tms_drivers').getOne(params.id!),
  });

  const form = useAppForm({
    defaultValues: {
      employee_id: driver?.employee_id || '',
      first_name: driver?.first_name || '',
      last_name: driver?.last_name || '',
      email: driver?.email || '',
      phone_number: driver?.phone_number || '',
      license_number: driver?.license_number || '',
      hire_date: driver?.hire_date ? new Date(driver.hire_date) : undefined,
      status: driver?.status || TmsDriversStatusOptions.active,
    } as UpdateRecord<TmsDriversRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('tms_drivers').update(params.id!, value), {
          success: 'Successfully updated driver',
          error: 'An error occurred when updating driver',
        })
        .unwrap();

      navigate({
        search: (prev) => ({
          ...prev,
          editDriver: undefined,
          id: undefined,
        }),
      });
    },
  });

  return (
    <Dialog
      open={params.editDriver}
      onOpenChange={(_) =>
        navigate({
          search: (prev) => ({
            ...prev,
            editDriver: undefined,
            id: undefined,
          }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Driver</DialogTitle>
          <DialogDescription>Update driver information</DialogDescription>
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
            <EditDriverForm form={form} />
            <form.SubmitButton className="col-start-4">
              Update Driver
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDriverDialog;
