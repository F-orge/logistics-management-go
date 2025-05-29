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
import { Route } from '.';
import {
  Collections,
  type ShipmentsResponse,
} from '../../../../lib/pocketbase.gen';
import { useMutateRemoveRecord, viewRecordsQuery } from '../../../queries';

const DeleteShipmentForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const deleteShipmentMutation = useMutateRemoveRecord(
    Collections.Shipments,
    searchQuery.id || '',
  );

  const shipment = useQuery(
    viewRecordsQuery<ShipmentsResponse>(Collections.Shipments, searchQuery.id),
  );

  return (
    <AlertDialog open={searchQuery.deleteShipment}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete `{shipment.data?.trackingNumber}`
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this shipment will be permanent
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              await deleteShipmentMutation.mutateAsync();
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteShipment: undefined,
                  id: undefined,
                }),
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
                  deleteShipment: undefined,
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

export default DeleteShipmentForm;
