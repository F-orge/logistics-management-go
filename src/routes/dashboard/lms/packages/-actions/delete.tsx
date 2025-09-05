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

const DeletePackageDialog = () => {
  const route = getRouteApi('/dashboard/lms/packages/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const packages = route.useLoaderData();
  const packageRecord = packages.items.find((pkg) => pkg.id === params.id);

  const handleDelete = async () => {
    if (!packageRecord?.id) return;

    await toast
      .promise(pb.collection('lms_packages').delete(packageRecord.id), {
        success: 'Successfully deleted package',
        error: 'An error occurred when deleting package',
      })
      .unwrap();

    navigate({ search: (prev) => ({ ...prev, deletePackage: undefined }) });
  };

  if (!packageRecord) {
    return null;
  }

  return (
    <AlertDialog
      open={params.deletePackage}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, deletePackage: undefined }) })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Package</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the package "
            {packageRecord.package_number}"? This action cannot be undone and
            may affect related shipment records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({
                search: (prev) => ({ ...prev, deletePackage: undefined }),
              })
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Package
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePackageDialog;
