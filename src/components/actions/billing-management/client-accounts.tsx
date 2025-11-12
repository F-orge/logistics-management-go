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
import { ClientAccountsSchema } from "@/pocketbase/schemas/billing-management/client-accounts";

const ClientAccountsFormSchema = ClientAccountsSchema.omit({
  id: true,
  created: true,
  updated: true,
});

export const ClientAccountsActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["client-accountss", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.BillingManagementClientAccounts)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof ClientAccountsFormSchema>
        title="Create ClientAccounts"
        description="Fill in the details to create a new client-accounts."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.BillingManagementClientAccounts)
              .create(data);
            toast.success("ClientAccounts created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create client-accounts: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={ClientAccountsFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof ClientAccountsFormSchema>
        title="Update ClientAccounts"
        description="Update the client-accounts details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.BillingManagementClientAccounts)
              .update(searchQuery.id!, data);
            toast.success("ClientAccounts updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update client-accounts: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={ClientAccountsFormSchema}
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
            <AlertDialogTitle>Delete ClientAccounts</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this client-accounts? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.BillingManagementClientAccounts)
                    .delete(searchQuery.id!);
                  toast.success("ClientAccounts deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete client-accounts: ${error.message} (${error.status})`
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

export default ClientAccountsActions;
