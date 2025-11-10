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
import { CarriersSchema } from "@/pocketbase/schemas/transport-management/carriers";

export const CreateCarriers = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  return (
    <FormDialog
      title="Create Carriers"
      description="Fill in the details to create a new carriers."
      open={searchQuery.action === "create"}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={CarriersSchema}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.TransportManagementCarriers)
            .create(data);
          toast.success("Carriers created successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to create carriers: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const UpdateCarriers = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.TransportManagementCarriers, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.TransportManagementCarriers)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "update" && !!searchQuery.id,
  });

  return (
    <FormDialog
      title="Update Carriers"
      description="Modify the details of the carriers."
      defaultValues={record || undefined}
      open={searchQuery.action === "update" && !!searchQuery.id}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={CarriersSchema.partial()}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.TransportManagementCarriers)
            .update(searchQuery.id!, data);
          toast.success("Carriers updated successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to update carriers: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const DeleteCarriers = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.TransportManagementCarriers, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.TransportManagementCarriers)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "delete" && !!searchQuery.id,
  });

  const handleDelete = async () => {
    try {
      await pocketbase
        .collection(Collections.TransportManagementCarriers)
        .delete(searchQuery.id!);
      toast.success("Carriers deleted successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to delete carriers: ${error.message} (${error.status})`
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
            carriers and remove all associated data.
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
  <CreateCarriers key={"action-create"} />,
  <UpdateCarriers key={"action-update"} />,
  <DeleteCarriers key={"action-delete"} />,
];
