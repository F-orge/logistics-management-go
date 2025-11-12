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
import AutoForm from "@/components/ui/autoform-tanstack/auto-form";
import { Collections } from "@/lib/pb.types";
import { VehicleMaintenanceSchema } from "@/pocketbase/schemas/transport-management/vehicle-maintenance";

const VehicleMaintenanceFormSchema = VehicleMaintenanceSchema.omit({
  id: true,
  created: true,
  updated: true,
});

export const VehicleMaintenanceActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["vehicle-maintenances", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.TransportManagementVehicleMaintenance)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof VehicleMaintenanceFormSchema>
        title="Create VehicleMaintenance"
        description="Fill in the details to create a new vehicle-maintenance."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
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
        schema={VehicleMaintenanceFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof VehicleMaintenanceFormSchema>
        title="Update VehicleMaintenance"
        description="Update the vehicle-maintenance details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
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
        schema={VehicleMaintenanceFormSchema}
        defaultValues={data as any}
      />
    );
  }

  if (searchQuery.action === "delete" && data) {
    return (
      <AlertDialog
        open={searchQuery.action === "delete"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete VehicleMaintenance</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this vehicle-maintenance? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
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
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      action: undefined,
                      id: undefined,
                    }),
                  });
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
};

export default VehicleMaintenanceActions;
