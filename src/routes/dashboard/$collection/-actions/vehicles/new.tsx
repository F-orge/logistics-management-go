import { useAppForm } from '@marahuyo/react-ui/forms/index';
import { Button } from '@marahuyo/react-ui/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@marahuyo/react-ui/ui/dialog';
import { useQueries } from '@tanstack/react-query';
import type { z } from 'zod';
import { Route } from '../..';
import type { searchQuerySchema } from '../../-schemas/vehicles';
import {
  Collections,
  type UsersResponse,
  VehiclesStatusOptions,
} from '../../../../../../lib/pocketbase.gen';
import { closeDialogButtonRef } from '../../../../../../lib/utils';
import {
  listRecordsQuery,
  useMutateCreateRecord,
} from '../../../../../queries';

const NewVehicleForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const createVehicleMutation = useMutateCreateRecord(Collections.Vehicles);

  const [drivers] = useQueries({
    queries: [
      listRecordsQuery<UsersResponse>(
        Collections.Users,
        { page: 1, perPage: 500 },
        { filter: "role = 'delivery_driver'" },
      ),
    ],
  });

  const form = useAppForm({
    defaultValues: {
      licensePlate: '',
      make: '',
      model: '',
      type: '',
      capacityVolume: 0,
      capacityWeight: 0,
      status: VehiclesStatusOptions.available,
      currentDriver: '',
    },
    onSubmit: async ({ value }) =>
      createVehicleMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({ search: (prev) => ({ ...prev, new: undefined }) }),
      }),
  });

  return (
    <Dialog open={searchQuery.new}>
      <DialogTrigger
        onClick={() => navigate({ search: (prev) => ({ ...prev, new: true }) })}
      >
        <Button isLoading={drivers.isLoading} size={'sm'}>
          Create Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({
              search: (prev) => ({ ...prev, new: undefined }),
            }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>Create Vehicle</DialogTitle>
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
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Create Vehicle',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewVehicleForm;
