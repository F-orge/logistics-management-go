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
import { SalesOrderItemsSchema } from "@/pocketbase/schemas/warehouse-management/sales-order-items";

export const CreateSalesOrderItems = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  return (
    <FormDialog
      title="Create SalesOrderItems"
      description="Fill in the details to create a new sales-order-items."
      open={searchQuery.action === "create"}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={SalesOrderItemsSchema}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.WarehouseManagementSalesOrderItems)
            .create(data);
          toast.success("SalesOrderItems created successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to create sales-order-items: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const UpdateSalesOrderItems = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.WarehouseManagementSalesOrderItems, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.WarehouseManagementSalesOrderItems)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "update" && !!searchQuery.id,
  });

  return (
    <FormDialog
      title="Update SalesOrderItems"
      description="Modify the details of the sales-order-items."
      defaultValues={record || undefined}
      open={searchQuery.action === "update" && !!searchQuery.id}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={SalesOrderItemsSchema.partial()}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.WarehouseManagementSalesOrderItems)
            .update(searchQuery.id!, data);
          toast.success("SalesOrderItems updated successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to update sales-order-items: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const DeleteSalesOrderItems = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.WarehouseManagementSalesOrderItems, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.WarehouseManagementSalesOrderItems)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "delete" && !!searchQuery.id,
  });

  const handleDelete = async () => {
    try {
      await pocketbase
        .collection(Collections.WarehouseManagementSalesOrderItems)
        .delete(searchQuery.id!);
      toast.success("SalesOrderItems deleted successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to delete sales-order-items: ${error.message} (${error.status})`
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
            sales-order-items and remove all associated data.
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
  <CreateSalesOrderItems key={"action-create"} />,
  <UpdateSalesOrderItems key={"action-update"} />,
  <DeleteSalesOrderItems key={"action-delete"} />,
];
