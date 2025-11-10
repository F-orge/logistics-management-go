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
import { VehicleMaintenanceSchema } from "@/pocketbase/schemas/transport-management/vehicle-maintenance";

export const CreateVehicleMaintenance = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  return (
    <FormDialog
      title="Create VehicleMaintenance"
      description="Fill in the details to create a new vehicle-maintenance."
      open={searchQuery.action === "create"}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={VehicleMaintenanceSchema}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.TransportManagementVehicleMaintenance)
            .create(data);
          toast.success("VehicleMaintenance created successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to create vehicle-maintenance: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const UpdateVehicleMaintenance = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.TransportManagementVehicleMaintenance, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.TransportManagementVehicleMaintenance)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "update" && !!searchQuery.id,
  });

  return (
    <FormDialog
      title="Update VehicleMaintenance"
      description="Modify the details of the vehicle-maintenance."
      defaultValues={record || undefined}
      open={searchQuery.action === "update" && !!searchQuery.id}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={VehicleMaintenanceSchema.partial()}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.TransportManagementVehicleMaintenance)
            .update(searchQuery.id!, data);
          toast.success("VehicleMaintenance updated successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to update vehicle-maintenance: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const DeleteVehicleMaintenance = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.TransportManagementVehicleMaintenance, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.TransportManagementVehicleMaintenance)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "delete" && !!searchQuery.id,
  });

  const handleDelete = async () => {
    try {
      await pocketbase
        .collection(Collections.TransportManagementVehicleMaintenance)
        .delete(searchQuery.id!);
      toast.success("VehicleMaintenance deleted successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to delete vehicle-maintenance: ${error.message} (${error.status})`
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
            vehicle-maintenance and remove all associated data.
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
  <CreateVehicleMaintenance key={"action-create"} />,
  <UpdateVehicleMaintenance key={"action-update"} />,
  <DeleteVehicleMaintenance key={"action-delete"} />,
];
