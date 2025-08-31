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

const DeleteAddressDialog = () => {
  const route = getRouteApi('/dashboard/lms/addresses/');
  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  return (
    <AlertDialog
      open={searchParams.deleteAddress}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            deleteAddress: undefined,
            id: undefined,
          }),
        })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            address and remove all associated data from our servers. This may
            affect related shipments and other records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await toast
                .promise(
                  pb.collection('lms_addresses').delete(searchParams.id ?? ''),
                  {
                    success: 'Address deleted successfully',
                    error: 'Failed to delete address',
                  },
                )
                .unwrap();
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteAddress: undefined,
                  id: undefined,
                }),
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAddressDialog;
