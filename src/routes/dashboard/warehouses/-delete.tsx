import { useNavigate } from '@tanstack/react-router';
import { Route } from '.';
import { useMutateRemoveRecord, viewRecordsQuery } from '../../../queries';
import { Collections } from '../../../../lib/pocketbase.gen';
import { useQuery } from '@tanstack/react-query';
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

const DeleteWarehouseForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const deleteWarehouseMutation = useMutateRemoveRecord(
    Collections.Warehouses,
    searchQuery.id || '',
  );

  const warehouse = useQuery(
    viewRecordsQuery(Collections.Warehouses, searchQuery.id),
  );

  return (
    <AlertDialog open={searchQuery.deleteWarehouse}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete `{warehouse.data?.name}`
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this company will be permanent
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              await deleteWarehouseMutation.mutateAsync(undefined, {
                onSuccess: () => {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      deleteWarehouse: undefined,
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
                  deleteWarehouse: undefined,
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

export default DeleteWarehouseForm;
