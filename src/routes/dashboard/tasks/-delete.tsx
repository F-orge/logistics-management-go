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
  type TasksResponse,
} from '../../../../lib/pocketbase.gen';
import { useMutateRemoveRecord, viewRecordsQuery } from '../../../queries';

const DeleteTask = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const task = useQuery(
    viewRecordsQuery<TasksResponse>(Collections.Tasks, searchQuery.id || ''),
  );

  const tasksMutation = useMutateRemoveRecord(
    Collections.Tasks,
    searchQuery.id || '',
  );

  if (task.isLoading) {
    return (
      <AlertDialog open={searchQuery.deleteTask}>
        <AlertDialogContent>Loading</AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog open={searchQuery.deleteTask}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting `{task.data?.title}` is permanent
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              tasksMutation.mutate();
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteTask: undefined,
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
                  deleteTask: undefined,
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

export default DeleteTask;
