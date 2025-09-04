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

const DeleteShipmentDialog = () => {
  const route = getRouteApi('/dashboard/lms/shipments/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const shipments = route.useLoaderData();
  const shipment = shipments.items.find(
    (shipment) => shipment.id === params.id,
  );

  const handleDelete = async () => {
    if (!shipment?.id) return;

    await toast
      .promise(pb.collection('lms_shipments').delete(shipment.id), {
        success: 'Successfully deleted shipment',
        error: 'An error occurred when deleting shipment',
      })
      .unwrap();

    navigate({ search: (prev) => ({ ...prev, deleteShipment: undefined }) });
  };

  if (!shipment) {
    return null;
  }

  return (
    <AlertDialog
      open={params.deleteShipment}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, deleteShipment: undefined }),
        })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Shipment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the shipment "
            {shipment.tracking_number}"? This action cannot be undone and may
            affect related packages and tracking records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({
                search: (prev) => ({ ...prev, deleteShipment: undefined }),
              })
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Shipment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteShipmentDialog;
