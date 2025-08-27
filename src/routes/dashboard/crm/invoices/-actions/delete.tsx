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

const DeleteInvoiceDialog = () => {
  const route = getRouteApi("/dashboard/crm/invoices/");

  const navigate = route.useNavigate();

  const searchParams = route.useSearch();

  return (
    <AlertDialog
      open={searchParams.deleteInvoice}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            deleteInvoice: undefined,
            id: undefined,
          }),
        })}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            invoice and all associated line items from our servers. This may
            affect financial records and reporting.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteInvoice: undefined,
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
                  pb.collection("crm_invoices").delete(searchParams.id ?? ""),
                  {
                    success: "Invoice deleted successfully",
                    error: "An error occurred when deleting invoice",
                  },
                )
                .unwrap();

              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteInvoice: undefined,
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

export default DeleteInvoiceDialog;
