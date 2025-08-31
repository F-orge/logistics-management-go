import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { pb } from '@/pocketbase';

const DeleteVehicleDialog = () => {
  const route = getRouteApi('/dashboard/tms/vehicles/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const { data: vehicle } = useSuspenseQuery({
    queryKey: ['tms_vehicles', params.id],
    queryFn: () => pb.collection('tms_vehicles').getOne(params.id!),
  });

  const handleDelete = async () => {
    try {
      await toast
        .promise(pb.collection('tms_vehicles').delete(params.id!), {
          success: 'Successfully deleted vehicle',
          error: 'An error occurred when deleting vehicle',
        })
        .unwrap();

      navigate({
        search: (prev) => ({
          ...prev,
          deleteVehicle: undefined,
          id: undefined,
        }),
      });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <AlertDialog
      open={params.deleteVehicle}
      onOpenChange={(_) =>
        navigate({
          search: (prev) => ({
            ...prev,
            deleteVehicle: undefined,
            id: undefined,
          }),
        })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete vehicle "{vehicle?.vehicle_number}"
            ({vehicle?.license_plate})?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            vehicle record and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
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
          <AlertDialogAction onClick={handleDelete}>
            Delete Vehicle
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteVehicleDialog;
