import { Route } from '../..';
import {
  listRecordsQuery,
  useMutateCreateRecord,
} from '../../../../../queries';
import {
  Collections,
  RoutesStatusOptions,
  type ShipmentsResponse,
  type UsersResponse,
  type VehiclesResponse,
} from '../../../../../../lib/pocketbase.gen';
import { useAppForm } from '@marahuyo/react-ui/forms/index';
import { useQueries } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@marahuyo/react-ui/ui/dialog';
import { Button } from '@marahuyo/react-ui/ui/button';
import { closeDialogButtonRef } from '../../../../../../lib/utils';

const NewRouteForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const createRouteMutation = useMutateCreateRecord(Collections.Routes);

  const [vehicles, drivers, shipments] = useQueries({
    queries: [
      listRecordsQuery<VehiclesResponse>(Collections.Vehicles, {
        page: 1,
        perPage: 500,
      }),
      listRecordsQuery<UsersResponse>(
        Collections.Users,
        { page: 1, perPage: 500 },
        { filter: "role = 'delivery_driver'" },
      ),
      listRecordsQuery<ShipmentsResponse>(Collections.Shipments, {
        page: 1,
        perPage: 500,
      }),
    ],
  });

  const form = useAppForm({
    defaultValues: {
      routeName: '',
      vehicleAssigned: '',
      driverAssigned: '',
      plannedStartTime: '',
      plannedEndTime: '',
      status: RoutesStatusOptions.planned,
      latitude: 0,
      longitude: 0,
      shipmentsOnRoute: [] as string[],
    },
    onSubmit: async ({ value }) =>
      createRouteMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({ search: (prev) => ({ ...prev, new: undefined }) }),
      }),
  });

  return (
    <Dialog open={searchQuery.new}>
      <DialogTrigger
        onClick={() => navigate({ search: (prev) => ({ ...prev, new: true }) })}
      >
        <Button
          isLoading={
            vehicles.isLoading || drivers.isLoading || shipments.isLoading
          }
          size={'sm'}
        >
          Create Route
        </Button>
      </DialogTrigger>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({ search: (prev) => ({ ...prev, new: undefined }) }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>Create Route</DialogTitle>
          <DialogDescription>Create a new route</DialogDescription>
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
            <form.AppField name="routeName">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Route name' }}
                />
              )}
            </form.AppField>
            <form.AppField name="vehicleAssigned">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Vehicle' }}
                  options={
                    vehicles.data?.items.map((vehicle) => ({
                      label: vehicle.licensePlate,
                      value: vehicle.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.AppField name="driverAssigned">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Driver' }}
                  options={
                    drivers.data?.items.map((driver) => ({
                      label: driver.name,
                      value: driver.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.AppField name="plannedStartTime">
              {(field) => (
                <field.SingleDateInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: 'Planned start time' }}
                />
              )}
            </form.AppField>
            <form.AppField name="plannedEndTime">
              {(field) => (
                <field.SingleDateInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: 'Planned end time' }}
                />
              )}
            </form.AppField>
            <form.AppField name="status">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Status' }}
                  options={Object.keys(RoutesStatusOptions).map((option) => ({
                    label: option,
                    value: option,
                  }))}
                />
              )}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Longitude' }}
                />
              )}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Latitude' }}
                />
              )}
            </form.AppField>
            <form.AppField name="shipmentsOnRoute">
              {(field) => (
                <field.MultiSelectField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Shipments' }}
                  options={
                    shipments.data?.items.map((shipment) => ({
                      label: shipment.trackingNumber,
                      value: shipment.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Create Route',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRouteForm;
