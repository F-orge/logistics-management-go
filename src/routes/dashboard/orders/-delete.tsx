import { Route } from '.';
import { useQuery } from '@tanstack/react-query';
import { useMutateRemoveRecord, viewRecordsQuery } from '../../../queries';
import {
  Collections,
  type OrdersResponse,
  type CompaniesResponse,
} from '../../../../lib/pocketbase.gen';
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

const DeleteOrdersForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const companiesMutation = useMutateRemoveRecord(
    Collections.Orders,
    searchQuery.id || '',
  );

  const company = useQuery(
    viewRecordsQuery<OrdersResponse>(Collections.Orders, searchQuery.id),
  );

  return (
    <AlertDialog open={searchQuery.deleteOrder}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete `{company.data?.orderIdCustom}`
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this order will be permanent
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              await companiesMutation.mutateAsync();
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteOrder: undefined,
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
                  deleteOrder: undefined,
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

export default DeleteOrdersForm;
