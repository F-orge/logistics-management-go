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
import { ReturnsSchema } from "@/pocketbase/schemas/warehouse-management/returns";

export const CreateReturns = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  return (
    <FormDialog
      title="Create Returns"
      description="Fill in the details to create a new returns."
      open={searchQuery.action === "create"}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={ReturnsSchema}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.WarehouseManagementReturns)
            .create(data);
          toast.success("Returns created successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to create returns: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const UpdateReturns = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.WarehouseManagementReturns, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.WarehouseManagementReturns)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "update" && !!searchQuery.id,
  });

  return (
    <FormDialog
      title="Update Returns"
      description="Modify the details of the returns."
      defaultValues={record || undefined}
      open={searchQuery.action === "update" && !!searchQuery.id}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={ReturnsSchema.partial()}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.WarehouseManagementReturns)
            .update(searchQuery.id!, data);
          toast.success("Returns updated successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to update returns: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const DeleteReturns = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.WarehouseManagementReturns, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.WarehouseManagementReturns)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "delete" && !!searchQuery.id,
  });

  const handleDelete = async () => {
    try {
      await pocketbase
        .collection(Collections.WarehouseManagementReturns)
        .delete(searchQuery.id!);
      toast.success("Returns deleted successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to delete returns: ${error.message} (${error.status})`
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
            returns and remove all associated data.
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
  <CreateReturns key={"action-create"} />,
  <UpdateReturns key={"action-update"} />,
  <DeleteReturns key={"action-delete"} />,
];
