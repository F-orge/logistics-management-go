import { getRouteApi } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { pb } from "@/pocketbase";

const DeleteCompanyDialog = () => {
  const route = getRouteApi("/dashboard/crm/companies/");

  const navigate = route.useNavigate();

  const searchParams = route.useSearch();

  return (
    <AlertDialog
      open={searchParams.deleteCompany}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            deleteCompany: undefined,
            id: undefined,
          }),
        })}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            company and remove all associated data from our servers. This may
            affect related contacts and other records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteCompany: undefined,
                  id: undefined,
                }),
              })}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await toast
                .promise(
                  pb.collection("crm_companies").delete(searchParams.id ?? ""),
                  {
                    success: "Company deleted successfully",
                    error: "An error occurred when deleting company",
                  },
                )
                .unwrap();

              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteCompany: undefined,
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

export default DeleteCompanyDialog;
