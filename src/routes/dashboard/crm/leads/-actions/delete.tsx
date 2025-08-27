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

const DeleteLeadDialog = () => {
  const route = getRouteApi('/dashboard/crm/leads/');

  const navigate = route.useNavigate();

  const searchParams = route.useSearch();

  return (
    <AlertDialog
      open={searchParams.deleteLead}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, deleteLead: undefined, id: undefined }),
        })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteLead: undefined,
                  id: undefined,
                }),
              })
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await toast
                .promise(
                  pb.collection('crm_leads').delete(searchParams.id ?? ''),
                  {
                    success: 'Lead deleted succesfully',
                    error: 'an error occured when deleting lead',
                  },
                )
                .unwrap();

              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteLead: undefined,
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

export default DeleteLeadDialog;
