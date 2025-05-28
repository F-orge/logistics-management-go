import type { z } from 'zod';
import { Route } from '../..';
import type { searchQuerySchema } from '../../-schemas/routes';
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
  const searchQuery = Route.useSearch() as z.infer<typeof searchQuerySchema>;
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
          navigate({ search: (prev) => ({ ...prev, newRoute: undefined }) }),
      }),
  });

  if (vehicles.isLoading || drivers.isLoading || shipments.isLoading) {
    return (
      <Button size={'sm'} disabled>
        Create Route
      </Button>
    );
  }

  return (
    <Dialog open={searchQuery.newRoute}>
      <DialogTrigger
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, newRoute: true }) })
        }
      >
        <Button size={'sm'}>Create Route</Button>
      </DialogTrigger>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({ search: (prev) => ({ ...prev, newRoute: undefined }) }),
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
