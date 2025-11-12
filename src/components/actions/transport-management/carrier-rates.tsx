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
import { CarrierRatesSchema } from "@/pocketbase/schemas/transport-management/carrier-rates";

const CarrierRatesFormSchema = CarrierRatesSchema.omit({
  id: true,
  created: true,
  updated: true,
});

export const CarrierRatesActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["carrier-ratess", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.TransportManagementCarrierRates)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CarrierRatesFormSchema>
        title="Create CarrierRates"
        description="Fill in the details to create a new carrier-rates."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.TransportManagementCarrierRates)
              .create(data);
            toast.success("CarrierRates created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create carrier-rates: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CarrierRatesFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof CarrierRatesFormSchema>
        title="Update CarrierRates"
        description="Update the carrier-rates details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.TransportManagementCarrierRates)
              .update(searchQuery.id!, data);
            toast.success("CarrierRates updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update carrier-rates: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CarrierRatesFormSchema}
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
            <AlertDialogTitle>Delete CarrierRates</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this carrier-rates? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.TransportManagementCarrierRates)
                    .delete(searchQuery.id!);
                  toast.success("CarrierRates deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete carrier-rates: ${error.message} (${error.status})`
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

export default CarrierRatesActions;
