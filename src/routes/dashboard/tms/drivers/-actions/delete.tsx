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

const DeleteDriverDialog = () => {
  const route = getRouteApi('/dashboard/tms/drivers/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const { data: driver } = useSuspenseQuery({
    queryKey: ['tms_drivers', params.id],
    queryFn: () => pb.collection('tms_drivers').getOne(params.id!),
  });

  const handleDelete = async () => {
    try {
      await toast
        .promise(pb.collection('tms_drivers').delete(params.id!), {
          success: 'Successfully deleted driver',
          error: 'An error occurred when deleting driver',
        })
        .unwrap();

      navigate({
        search: (prev) => ({
          ...prev,
          deleteDriver: undefined,
          id: undefined,
        }),
      });
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  return (
    <AlertDialog
      open={params.deleteDriver}
      onOpenChange={(_) =>
        navigate({
          search: (prev) => ({
            ...prev,
            deleteDriver: undefined,
            id: undefined,
          }),
        })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete driver "{driver?.first_name}{' '}
            {driver?.last_name}"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            driver record and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteDriver: undefined,
                  id: undefined,
                }),
              })
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete Driver
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDriverDialog;
