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

const DeleteProductDialog = () => {
  const route = getRouteApi("/dashboard/crm/products/");

  const navigate = route.useNavigate();

  const searchParams = route.useSearch();

  return (
    <AlertDialog
      open={searchParams.deleteProduct}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            deleteProduct: undefined,
            id: undefined,
          }),
        })}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product and remove it from our servers. This may affect related
            opportunities and sales records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteProduct: undefined,
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
                  pb.collection("crm_products").delete(searchParams.id ?? ""),
                  {
                    success: "Product deleted successfully",
                    error: "An error occurred when deleting product",
                  },
                )
                .unwrap();

              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteProduct: undefined,
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

export default DeleteProductDialog;
