import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
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
import { fieldRegistry } from "@/components/ui/autoform-tanstack/types";
import {
  RelationFieldProps,
  SelectFieldProps,
} from "@/components/ui/forms/fields";
import { Collections, CustomerRelationsCompaniesRecord } from "@/lib/pb.types";
import { CasesSchema } from "@/pocketbase/schemas/customer-relations/cases";

const CreateCasesFormSchema = z.object({
  caseNumber: CasesSchema.shape.caseNumber.register(fieldRegistry, {
    id: "crm-cases-caseNumber-create",
    type: "field",
    label: "Case Number",
    description: "Enter the case number",
    inputType: "text",
  }),
  status: CasesSchema.shape.status.register(fieldRegistry, {
    id: "crm-cases-status-create",
    type: "field",
    label: "Status",
    description: "Select the case status",
  }),
  priority: CasesSchema.shape.priority.register(fieldRegistry, {
    id: "crm-cases-priority-create",
    type: "field",
    label: "Priority",
    description: "Select the priority level",
  }),
  type: CasesSchema.shape.type.register(fieldRegistry, {
    id: "crm-cases-type-create",
    type: "field",
    label: "Type",
    description: "Select the case type",
    inputType: "select",
  }),
  contact: CasesSchema.shape.contact.register(fieldRegistry, {
    id: "crm-cases-contact-create",
    type: "field",
    label: "Contact",
    description: "Enter the contact (optional)",
    inputType: "relation",
    props: {
      collectionName: Collections.CustomerRelationsContacts,
      relationshipName: "contact",
      placeholder: "Select a contact",
      renderOption: (item) => item.name,
    } as RelationFieldProps<CustomerRelationsCompaniesRecord>,
  }),
  description: CasesSchema.shape.description.register(fieldRegistry, {
    id: "crm-cases-description-create",
    type: "field",
    label: "Description",
    description: "Enter the case description (optional)",
    inputType: "textarea",
  }),
});

const UpdateCasesFormSchema = z.object({
  caseNumber: CasesSchema.shape.caseNumber.optional().register(fieldRegistry, {
    id: "crm-cases-caseNumber-update",
    type: "field",
    label: "Case Number",
    description: "Enter the case number",
    inputType: "text",
  }),
  status: CasesSchema.shape.status.optional().register(fieldRegistry, {
    id: "crm-cases-status-update",
    type: "field",
    label: "Status",
    description: "Select the case status",
    inputType: "select",
  }),
  priority: CasesSchema.shape.priority.optional().register(fieldRegistry, {
    id: "crm-cases-priority-update",
    type: "field",
    label: "Priority",
    description: "Select the priority level",
    inputType: "select",
  }),
  type: CasesSchema.shape.type.optional().register(fieldRegistry, {
    id: "crm-cases-type-update",
    type: "field",
    label: "Type",
    description: "Select the case type",
    inputType: "select",
  }),
  owner: CasesSchema.shape.owner.optional().register(fieldRegistry, {
    id: "crm-cases-owner-update",
    type: "field",
    label: "Owner",
    description: "Enter the case owner",
    inputType: "text",
  }),
  contact: CasesSchema.shape.contact.optional().register(fieldRegistry, {
    id: "crm-cases-contact-update",
    type: "field",
    label: "Contact",
    description: "Enter the contact (optional)",
    inputType: "text",
  }),
  description: CasesSchema.shape.description
    .optional()
    .register(fieldRegistry, {
      id: "crm-cases-description-update",
      type: "field",
      label: "Description",
      description: "Enter the case description (optional)",
      inputType: "textarea",
    }),
});

export const CasesActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["casess", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsCases)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateCasesFormSchema>
        title="Create Cases"
        description="Fill in the details to create a new cases."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsCases)
              .create(data);
            toast.success("Cases created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create cases: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateCasesFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateCasesFormSchema>
        title="Update Cases"
        description="Update the cases details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsCases)
              .update(searchQuery.id!, data);
            toast.success("Cases updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update cases: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateCasesFormSchema}
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
            <AlertDialogTitle>Delete Cases</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this cases? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.CustomerRelationsCases)
                    .delete(searchQuery.id!);
                  toast.success("Cases deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete cases: ${error.message} (${error.status})`
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

export default CasesActions;
