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
import AutoForm from "@/components/ui/autoform-tanstack/auto-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Collections } from "@/lib/pb.types";
import { CompaniesSchema } from "@/pocketbase/schemas/customer-relations/companies";

const CompanyFormSchema = CompaniesSchema.omit({
  id: true,
  created: true,
  updated: true,
});

export const CreateCompanies = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  return (
    <>
      {/* <FormDialog
        title="Create Companies"
        description="Fill in the details to create a new companies."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        schema={CompaniesSchema.omit({
          id: true,
          created: true,
          updated: true,
        })}
        onSubmit={async (data) => {
          try {
            const { attachments, ...rest } = data;
            console.log(attachments.item(0));
            await pocketbase
              .collection(Collections.CustomerRelationsCompanies)
              .create(data);
            toast.success("Companies created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create companies: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
      /> */}
      <AutoForm<typeof CompanyFormSchema>
        title="Create Companies"
        description="Fill in the details to create a new companies."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsCompanies)
              .create(data);
            toast.success("Companies created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create companies: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CompanyFormSchema}
        form={{
          fieldsets: [
            {
              groups: [
                {
                  id: "name",
                  type: "field",
                  name: "name",
                  label: "Name",
                  description: "The name of the company.",
                  required: true,
                  inputType: "text",
                  props: {
                    placeholder: "Enter company name",
                  },
                },
                {
                  id: "street",
                  type: "field",
                  name: "street",
                  label: "Street",
                  description: "The street address of the company.",
                  required: true,
                  inputType: "text",
                  props: {
                    placeholder: "Enter company street address",
                  },
                },
                {
                  id: "city",
                  type: "field",
                  name: "city",
                  label: "City",
                  description: "The city of the company.",
                  required: true,
                  inputType: "text",
                  props: {
                    placeholder: "Enter company city",
                  },
                },
              ],
            },
          ],
        }}
      />
    </>
  );
};

export const UpdateCompanies = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.CustomerRelationsCompanies, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.CustomerRelationsCompanies)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "update" && !!searchQuery.id,
  });

  return (
    <FormDialog
      title="Update Companies"
      description="Modify the details of the companies."
      defaultValues={record || undefined}
      open={searchQuery.action === "update" && !!searchQuery.id}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={CompaniesSchema.omit({
        id: true,
        created: true,
        updated: true,
      }).partial()}
      onSubmit={async (data) => {
        try {
          await pocketbase
            .collection(Collections.CustomerRelationsCompanies)
            .update(searchQuery.id!, data);
          toast.success("Companies updated successfully!");
        } catch (error) {
          if (error instanceof ClientResponseError) {
            toast.error(
              `Failed to update companies: ${error.message} (${error.status})`
            );
          }
        } finally {
          navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        }
      }}
    />
  );
};

export const DeleteCompanies = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.CustomerRelationsCompanies, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.CustomerRelationsCompanies)
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "delete" && !!searchQuery.id,
  });

  const handleDelete = async () => {
    try {
      await pocketbase
        .collection(Collections.CustomerRelationsCompanies)
        .delete(searchQuery.id!);
      toast.success("Companies deleted successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to delete companies: ${error.message} (${error.status})`
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
            companies and remove all associated data.
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
  <CreateCompanies key={"action-create"} />,
  <UpdateCompanies key={"action-update"} />,
  <DeleteCompanies key={"action-delete"} />,
];
