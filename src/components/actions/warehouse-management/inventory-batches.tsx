import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
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
import FormDialog from "@/components/ui/autoform/components/helpers/FormDialog";
import { Collections } from "@/lib/pb.types";
import { InventoryBatchesSchema } from "@/pocketbase/schemas/warehouse-management/inventory-batches";

export const CreateInventoryBatches = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  return (
    <FormDialog
      title="Create InventoryBatches"
      description="Fill in the details to create a new inventory-batches."
      open={searchQuery.action === "create"}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={InventoryBatchesSchema}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.WarehouseManagementInventoryBatches)
            .create(data);
          toast.success("InventoryBatches created successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to create inventory-batches: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const UpdateInventoryBatches = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.WarehouseManagementInventoryBatches, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.WarehouseManagementInventoryBatches)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "update" && !!searchQuery.id,
  });

  return (
    <FormDialog
      title="Update InventoryBatches"
      description="Modify the details of the inventory-batches."
      defaultValues={record || undefined}
      open={searchQuery.action === "update" && !!searchQuery.id}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={InventoryBatchesSchema.partial()}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.WarehouseManagementInventoryBatches)
            .update(searchQuery.id!, data);
          toast.success("InventoryBatches updated successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to update inventory-batches: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const DeleteInventoryBatches = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.WarehouseManagementInventoryBatches, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.WarehouseManagementInventoryBatches)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "delete" && !!searchQuery.id,
  });

  const handleDelete = async () => {
    try {
      await pocketbase
        .collection(Collections.WarehouseManagementInventoryBatches)
        .delete(searchQuery.id!);
      toast.success("InventoryBatches deleted successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to delete inventory-batches: ${error.message} (${error.status})`
        );
      }
    } finally {
      navigate({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  };

  return (
    <AlertDialog open={searchQuery.action === "delete" && !!searchQuery.id}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            inventory-batches and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, action: undefined }) })
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default [
  <CreateInventoryBatches key={"action-create"} />,
  <UpdateInventoryBatches key={"action-update"} />,
  <DeleteInventoryBatches key={"action-delete"} />,
];
