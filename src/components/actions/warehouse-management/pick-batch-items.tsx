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
import { PickBatchItemsSchema } from "@/pocketbase/schemas/warehouse-management/pick-batch-items";

const PickBatchItemsFormSchema = PickBatchItemsSchema.omit({
  id: true,
  created: true,
  updated: true,
});

export const PickBatchItemsActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["pick-batch-itemss", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementPickBatchItems)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof PickBatchItemsFormSchema>
        title="Create PickBatchItems"
        description="Fill in the details to create a new pick-batch-items."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.WarehouseManagementPickBatchItems)
              .create(data);
            toast.success("PickBatchItems created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create pick-batch-items: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={PickBatchItemsFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof PickBatchItemsFormSchema>
        title="Update PickBatchItems"
        description="Update the pick-batch-items details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.WarehouseManagementPickBatchItems)
              .update(searchQuery.id!, data);
            toast.success("PickBatchItems updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update pick-batch-items: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={PickBatchItemsFormSchema}
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
            <AlertDialogTitle>Delete PickBatchItems</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this pick-batch-items? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.WarehouseManagementPickBatchItems)
                    .delete(searchQuery.id!);
                  toast.success("PickBatchItems deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete pick-batch-items: ${error.message} (${error.status})`
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

export default PickBatchItemsActions;
