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
import { Collections } from "@/lib/pb.types";
import { InteractionsSchema } from "@/pocketbase/schemas/customer-relations/interactions";

const CreateInteractionsFormSchema = z.object({
  contact: InteractionsSchema.shape.contact.register(fieldRegistry, {
    id: "crm-interactions-contact-create",
    type: "field",
    label: "Contact",
    description: "Select the contact",
    inputType: "text",
  }),
  user: InteractionsSchema.shape.user.register(fieldRegistry, {
    id: "crm-interactions-user-create",
    type: "field",
    label: "User",
    description: "Select the user",
    inputType: "text",
  }),
  case: InteractionsSchema.shape.case.register(fieldRegistry, {
    id: "crm-interactions-case-create",
    type: "field",
    label: "Case",
    description: "Select the case (optional)",
    inputType: "text",
  }),
  type: InteractionsSchema.shape.type.register(fieldRegistry, {
    id: "crm-interactions-type-create",
    type: "field",
    label: "Type",
    description: "Select the interaction type (optional)",
    inputType: "select",
  }),
  outcome: InteractionsSchema.shape.outcome.register(fieldRegistry, {
    id: "crm-interactions-outcome-create",
    type: "field",
    label: "Outcome",
    description: "Enter the outcome (optional)",
    inputType: "text",
  }),
  notes: InteractionsSchema.shape.notes.register(fieldRegistry, {
    id: "crm-interactions-notes-create",
    type: "field",
    label: "Notes",
    description: "Enter notes (optional)",
    inputType: "textarea",
  }),
  attachments: InteractionsSchema.shape.attachments.register(fieldRegistry, {
    id: "crm-interactions-attachments-create",
    type: "field",
    inputType: "file",
    label: "Attachments",
    description: "Upload attachments (optional)",
    isArray: true,
  }),
  interactionDate: InteractionsSchema.shape.interactionDate.register(
    fieldRegistry,
    {
      id: "crm-interactions-interactionDate-create",
      type: "field",
      label: "Interaction Date",
      description: "Select the interaction date (optional)",
      inputType: "datetime-local",
    }
  ),
});

const UpdateInteractionsFormSchema = z.object({
  contact: InteractionsSchema.shape.contact.optional().register(fieldRegistry, {
    id: "crm-interactions-contact-update",
    type: "field",
    label: "Contact",
    description: "Select the contact",
    inputType: "text",
  }),
  user: InteractionsSchema.shape.user.optional().register(fieldRegistry, {
    id: "crm-interactions-user-update",
    type: "field",
    label: "User",
    description: "Select the user",
    inputType: "text",
  }),
  case: InteractionsSchema.shape.case.optional().register(fieldRegistry, {
    id: "crm-interactions-case-update",
    type: "field",
    label: "Case",
    description: "Select the case (optional)",
    inputType: "text",
  }),
  type: InteractionsSchema.shape.type.optional().register(fieldRegistry, {
    id: "crm-interactions-type-update",
    type: "field",
    label: "Type",
    description: "Select the interaction type (optional)",
    inputType: "select",
  }),
  outcome: InteractionsSchema.shape.outcome.optional().register(fieldRegistry, {
    id: "crm-interactions-outcome-update",
    type: "field",
    label: "Outcome",
    description: "Enter the outcome (optional)",
    inputType: "text",
  }),
  notes: InteractionsSchema.shape.notes.optional().register(fieldRegistry, {
    id: "crm-interactions-notes-update",
    type: "field",
    label: "Notes",
    description: "Enter notes (optional)",
    inputType: "textarea",
  }),
  interactionDate: InteractionsSchema.shape.interactionDate
    .optional()
    .register(fieldRegistry, {
      id: "crm-interactions-interactionDate-update",
      type: "field",
      label: "Interaction Date",
      description: "Select the interaction date (optional)",
      inputType: "datetime-local",
    }),
});

export const InteractionsActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["interactionss", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsInteractions)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateInteractionsFormSchema>
        title="Create Interactions"
        description="Fill in the details to create a new interactions."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsInteractions)
              .create(data);
            toast.success("Interactions created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create interactions: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateInteractionsFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateInteractionsFormSchema>
        title="Update Interactions"
        description="Update the interactions details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsInteractions)
              .update(searchQuery.id!, data);
            toast.success("Interactions updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update interactions: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateInteractionsFormSchema}
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
            <AlertDialogTitle>Delete Interactions</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this interactions? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.CustomerRelationsInteractions)
                    .delete(searchQuery.id!);
                  toast.success("Interactions deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete interactions: ${error.message} (${error.status})`
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

export default InteractionsActions;
