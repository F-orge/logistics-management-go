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
import { SurchargesSchema } from "@/pocketbase/schemas/billing-management/surcharges";

const SurchargesFormSchema = SurchargesSchema.omit({
  id: true,
  created: true,
  updated: true,
});

export const SurchargesActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["surchargess", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.BillingManagementSurcharges)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof SurchargesFormSchema>
        title="Create Surcharges"
        description="Fill in the details to create a new surcharges."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.BillingManagementSurcharges)
              .create(data);
            toast.success("Surcharges created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create surcharges: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={SurchargesFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof SurchargesFormSchema>
        title="Update Surcharges"
        description="Update the surcharges details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.BillingManagementSurcharges)
              .update(searchQuery.id!, data);
            toast.success("Surcharges updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update surcharges: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={SurchargesFormSchema}
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
            <AlertDialogTitle>Delete Surcharges</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this surcharges? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.BillingManagementSurcharges)
                    .delete(searchQuery.id!);
                  toast.success("Surcharges deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete surcharges: ${error.message} (${error.status})`
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

export default SurchargesActions;
