import { Route } from '../..';
import { useQuery } from '@tanstack/react-query';
import {
  useMutateRemoveRecord,
  viewRecordsQuery,
} from '../../../../../queries';
import {
  Collections,
  type RoutesResponse,
} from '../../../../../../lib/pocketbase.gen';
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
import type { z } from 'zod';
import type { searchQuerySchema } from '../../-schemas/routes';

const DeleteRouteForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const deleteRouteMutation = useMutateRemoveRecord(
    Collections.Routes,
    searchQuery.id || '',
  );

  const route = useQuery(
    viewRecordsQuery<RoutesResponse>(Collections.Routes, searchQuery.id),
  );

  return (
    <AlertDialog open={searchQuery.delete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete `{route.data?.routeName}`
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this route will be permanent
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              await deleteRouteMutation.mutateAsync(undefined, {
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

export default DeleteRouteForm;
