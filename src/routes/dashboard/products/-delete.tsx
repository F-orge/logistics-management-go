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
import { useNavigate } from '@tanstack/react-router';
import { Route } from '.';
import {
  Collections,
  type CompaniesResponse,
  type ProductsResponse,
} from '../../../../lib/pocketbase.gen';
import { useMutateRemoveRecord, viewRecordsQuery } from '../../../queries';

const DeleteProductForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const deleteProductMutation = useMutateRemoveRecord(
    Collections.Products,
    searchQuery.id || '',
  );

  const product = useQuery(
    viewRecordsQuery<ProductsResponse>(Collections.Products, searchQuery.id),
  );

  return (
    <AlertDialog open={searchQuery.deleteProduct}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete `{product.data?.name}`
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this company will be permanent
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              await deleteProductMutation.mutateAsync();
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteProduct: undefined,
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
                  deleteProduct: undefined,
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

export default DeleteProductForm;
