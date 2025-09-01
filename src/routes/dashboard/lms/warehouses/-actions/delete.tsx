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

const DeleteWarehouseDialog = () => {
  const route = getRouteApi("/dashboard/lms/warehouses/");
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const warehouses = route.useLoaderData();
  const warehouse = warehouses.items.find(
    (warehouse) => warehouse.id === params.id,
  );

  const handleDelete = async () => {
    if (!warehouse?.id) return;

    await toast
      .promise(pb.collection("lms_warehouses").delete(warehouse.id), {
        success: "Successfully deleted warehouse",
        error: "An error occurred when deleting warehouse",
      })
      .unwrap();

    navigate({ search: (prev) => ({ ...prev, deleteWarehouse: undefined }) });
  };

  if (!warehouse) {
    return null;
  }

  return (
    <AlertDialog
      open={params.deleteWarehouse}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, deleteWarehouse: undefined }),
        })}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Warehouse</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the warehouse "{warehouse.name}"
            ({warehouse.code})? This action cannot be undone and may affect
            related shipments and inventory records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => navigate({
              search: (prev) => ({ ...prev, deleteWarehouse: undefined }),
            })}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Warehouse
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWarehouseDialog;
