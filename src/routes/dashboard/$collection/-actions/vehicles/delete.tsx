import { Route } from '../..';
import { useQuery } from '@tanstack/react-query';
import {
  useMutateRemoveRecord,
  viewRecordsQuery,
} from '../../../../../queries';
import {
  Collections,
  type VehiclesResponse,
  type RoutesResponse,
} from '../../../../../../lib/pocketbase.gen';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@marahuyo/react-ui/ui/alert-dialog';
import type { z } from 'zod';
import type { searchQuerySchema } from '../../-schemas/vehicles';

const DeleteVehicleForm = () => {
  const searchQuery = Route.useSearch() as z.infer<typeof searchQuerySchema>;
  const navigate = Route.useNavigate();

  const deleteVehicleMutation = useMutateRemoveRecord(
    Collections.Vehicles,
    searchQuery.id,
  );

  const route = useQuery(
    viewRecordsQuery<VehiclesResponse>(Collections.Vehicles, searchQuery.id),
  );

  return (
    <AlertDialog open={searchQuery.deleteVehicle}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete `{route.data?.licensePlate}`
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this vehicle will be permanent
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              await deleteVehicleMutation.mutateAsync(undefined, {
                onSuccess: () => {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      deleteVehicle: undefined,
                      id: undefined,
                    }),
                  });
                },
              });
            }}
          >
            Confirm
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteVehicle: undefined,
                  id: undefined,
                }),
              })
            }
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteVehicleForm;
