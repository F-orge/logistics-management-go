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
import { useQuery } from '@tanstack/react-query';
import { Route } from '../..';
import {
  Collections,
  type VehiclesResponse,
} from '../../../../../../lib/pocketbase.gen';
import {
  useMutateRemoveRecord,
  viewRecordsQuery,
} from '../../../../../queries';

const DeleteVehicleForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const deleteVehicleMutation = useMutateRemoveRecord(
    Collections.Vehicles,
    searchQuery.id,
  );

  const route = useQuery(
    viewRecordsQuery<VehiclesResponse>(Collections.Vehicles, searchQuery.id),
  );

  return (
    <AlertDialog open={searchQuery.delete}>
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
                      delete: undefined,
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
                  delete: undefined,
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
