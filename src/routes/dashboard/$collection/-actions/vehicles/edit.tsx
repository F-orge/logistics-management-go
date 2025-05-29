import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { useQueries } from '@tanstack/react-query';
import type { z } from 'zod';
import { Route } from '../..';
import type { searchQuerySchema } from '../../-schemas/vehicles';
import {
  Collections,
  type UsersResponse,
  type VehiclesResponse,
  VehiclesStatusOptions,
} from '../../../../../../lib/pocketbase.gen';
import { closeDialogButtonRef } from '../../../../../../lib/utils';
import {
  listRecordsQuery,
  useMutateUpdateRecord,
  viewRecordsQuery,
} from '../../../../../queries';

const EditVehicleForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const updateVehicleMutation = useMutateUpdateRecord(
    Collections.Vehicles,
    searchQuery.id,
  );

  const [vehicle, drivers] = useQueries({
    queries: [
      viewRecordsQuery<VehiclesResponse>(Collections.Vehicles, searchQuery.id),
      listRecordsQuery<UsersResponse>(
        Collections.Users,
        { page: 1, perPage: 500 },
        { filter: "role = 'delivery_driver'" },
      ),
    ],
  });

  const form = useAppForm({
    defaultValues: {
      licensePlate: vehicle.data?.licensePlate,
      make: vehicle.data?.make,
      model: vehicle.data?.model,
      type: vehicle.data?.type,
      capacityVolume: vehicle.data?.capacityVolume,
      capacityWeight: vehicle.data?.capacityWeight,
      status: vehicle.data?.status,
      currentDriver: vehicle.data?.currentDriver,
    },
    onSubmit: async ({ value }) =>
      updateVehicleMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({
            search: (prev) => ({
              ...prev,
              edit: undefined,
              id: undefined,
            }),
          }),
      }),
  });

  if (vehicle.isLoading || drivers.isLoading) {
    return <></>;
  }

  return (
    <Dialog open={searchQuery.edit}>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({
              search: (prev) => ({
                ...prev,
                edit: undefined,
                id: undefined,
              }),
            }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>Edit Vehicle</DialogTitle>
          <DialogDescription>Edit vehicle information</DialogDescription>
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
            <form.AppField name="licensePlate">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* License Plate' }}
                />
              )}
            </form.AppField>
            <form.AppField name="make">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Vehicle Manufacturer' }}
                />
              )}
            </form.AppField>
            <form.AppField name="model">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Vehicle Model' }}
                />
              )}
            </form.AppField>
            <form.AppField name="type">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Vehicle Type' }}
                />
              )}
            </form.AppField>
            <form.AppField name="capacityVolume">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Capacity Volume (Liters)' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="capacityWeight">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Capacity Weight (Kg)' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="status">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Status' }}
                  options={Object.keys(VehiclesStatusOptions).map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  selectProps={{ defaultValue: vehicle.data?.status }}
                />
              )}
            </form.AppField>
            <form.AppField name="currentDriver">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Current Driver' }}
                  options={
                    drivers.data?.items.map((driver) => ({
                      label: driver.name,
                      value: driver.id,
                    })) || []
                  }
                  selectProps={{ defaultValue: vehicle.data?.currentDriver }}
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Update Vehicle',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleForm;
