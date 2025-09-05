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
import { buttonVariants } from '@/components/ui/button';
import { pb } from '@/pocketbase';

const DeleteCaseDialog = () => {
  const route = getRouteApi('/dashboard/crm/cases/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const { data: caseData } = useSuspenseQuery({
    queryKey: ['crm_cases', params.id],
    queryFn: () => pb.collection('crm_cases').getOne(params.id!),
  });

  const handleDelete = async () => {
    await toast
      .promise(pb.collection('crm_cases').delete(params.id!), {
        success: 'Successfully deleted the case',
        error: 'An error occurred when deleting the case',
      })
      .unwrap();

    navigate({
      search: (prev) => ({ ...prev, deleteCase: undefined, id: undefined }),
    });
  };

  return (
    <AlertDialog
      open={params.deleteCase}
      onOpenChange={(_) =>
        navigate({
          search: (prev) => ({ ...prev, deleteCase: undefined, id: undefined }),
        })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the case
            "{caseData?.subject}" and remove all associated data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteCase: undefined,
                  id: undefined,
                }),
              })
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Delete Case
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCaseDialog;
