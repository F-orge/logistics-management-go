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
  type TmsVehiclesRecord,
  TmsVehiclesStatusOptions,
  TmsVehiclesVehicleTypeOptions,
} from '@/pocketbase/types';

export const NewVehicleForm = withForm({
  defaultValues: {} as CreateRecord<TmsVehiclesRecord>,
  props: {} as {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="vehicle_number">
          {(field) => (
            <field.TextField
              label="Vehicle Number"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="license_plate">
          {(field) => (
            <field.TextField
              label="License Plate"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="vehicle_type">
          {(field) => (
            <field.SelectField
              options={Object.keys(TmsVehiclesVehicleTypeOptions).map(
                (val) => ({
                  label: val,
                  value: val,
                }),
              )}
              label="Vehicle Type"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="make">
          {(field) => (
            <field.TextField label="Make" required className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="model">
          {(field) => (
            <field.TextField label="Model" required className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="year">
          {(field) => (
            <field.DateField label="Year" required className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="capacity_weight">
          {(field) => (
            <field.TextField
              label="Weight Capacity (kg)"
              type="number"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="capacity_volume">
          {(field) => (
            <field.TextField
              label="Volume Capacity (m³)"
              type="number"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              options={Object.keys(TmsVehiclesStatusOptions).map((val) => ({
                label: val,
                value: val,
              }))}
              label="Status"
              className="col-span-4"
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewVehicleDialog = () => {
  const route = getRouteApi('/dashboard/tms/vehicles/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<TmsVehiclesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('tms_vehicles').create(value), {
          success: 'Successfully created a vehicle',
          error: 'An error occurred when creating a vehicle',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newVehicle: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newVehicle}
      onOpenChange={(_) =>
        navigate({ search: (prev) => ({ ...prev, newVehicle: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Vehicle</DialogTitle>
          <DialogDescription>Create a new vehicle</DialogDescription>
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
            <NewVehicleForm form={form} />
            <form.SubmitButton className="col-start-4">
              Create Vehicle
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewVehicleDialog;
