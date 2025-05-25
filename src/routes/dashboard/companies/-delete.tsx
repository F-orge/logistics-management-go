import { Route } from '.';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useMutateRemoveRecord, viewRecordsQuery } from '../../../queries';
import {
  Collections,
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

const DeleteCompanyForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const companiesMutation = useMutateRemoveRecord(
    Collections.Companies,
    searchQuery.id || '',
  );

  const company = useQuery(
    viewRecordsQuery<CompaniesResponse>(Collections.Companies, searchQuery.id),
  );

  return (
    <AlertDialog open={searchQuery.deleteCompany}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete `{company.data?.name}`
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this company will be permanent
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              await companiesMutation.mutateAsync();
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteCompany: undefined,
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
                  deleteCompany: undefined,
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

export default DeleteCompanyForm;
