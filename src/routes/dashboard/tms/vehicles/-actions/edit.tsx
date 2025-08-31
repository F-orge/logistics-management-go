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
  type TmsVehiclesRecord,
  TmsVehiclesStatusOptions,
  TmsVehiclesVehicleTypeOptions,
} from '@/pocketbase/types';

export const EditVehicleForm = withForm({
  defaultValues: {} as UpdateRecord<TmsVehiclesRecord>,
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

const EditVehicleDialog = () => {
  const route = getRouteApi('/dashboard/tms/vehicles/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const { data: vehicle } = useSuspenseQuery({
    queryKey: ['tms_vehicles', params.id],
    queryFn: () => pb.collection('tms_vehicles').getOne(params.id!),
  });

  const form = useAppForm({
    defaultValues: {
      vehicle_number: vehicle?.vehicle_number || '',
      license_plate: vehicle?.license_plate || '',
      vehicle_type: vehicle?.vehicle_type || undefined,
      make: vehicle?.make || '',
      model: vehicle?.model || '',
      year: vehicle?.year ? new Date(vehicle.year) : undefined,
      capacity_weight: vehicle?.capacity_weight || undefined,
      capacity_volume: vehicle?.capacity_volume || undefined,
      status: vehicle?.status || TmsVehiclesStatusOptions.active,
    } as UpdateRecord<TmsVehiclesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('tms_vehicles').update(params.id!, value), {
          success: 'Successfully updated vehicle',
          error: 'An error occurred when updating vehicle',
        })
        .unwrap();

      navigate({
        search: (prev) => ({
          ...prev,
          editVehicle: undefined,
          id: undefined,
        }),
      });
    },
  });

  return (
    <Dialog
      open={params.editVehicle}
      onOpenChange={(_) =>
        navigate({
          search: (prev) => ({
            ...prev,
            editVehicle: undefined,
            id: undefined,
          }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Vehicle</DialogTitle>
          <DialogDescription>Update vehicle information</DialogDescription>
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
            <EditVehicleForm form={form} />
            <form.SubmitButton className="col-start-4">
              Update Vehicle
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleDialog;
