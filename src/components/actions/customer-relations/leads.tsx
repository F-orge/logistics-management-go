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
import { LeadsSchema } from "@/pocketbase/schemas/customer-relations/leads";

const CreateLeadsFormSchema = z.object({
  name: LeadsSchema.shape.name.register(fieldRegistry, {
    id: "crm-leads-name-create",
    type: "field",
    label: "Lead Name",
    description: "Enter the lead name (optional)",
    inputType: "text",
  }),
  email: LeadsSchema.shape.email.register(fieldRegistry, {
    id: "crm-leads-email-create",
    type: "field",
    label: "Email",
    description: "Enter the email (optional)",
    inputType: "email",
  }),
  source: LeadsSchema.shape.source.register(fieldRegistry, {
    id: "crm-leads-source-create",
    type: "field",
    label: "Source",
    description: "Select the lead source (optional)",
    inputType: "select",
  }),
  status: LeadsSchema.shape.status.register(fieldRegistry, {
    id: "crm-leads-status-create",
    type: "field",
    label: "Status",
    description: "Select the status (optional)",
    inputType: "select",
  }),
  score: LeadsSchema.shape.score.register(fieldRegistry, {
    id: "crm-leads-score-create",
    type: "field",
    label: "Score",
    description: "Enter the lead score",
    inputType: "number",
  }),
  owner: LeadsSchema.shape.owner.register(fieldRegistry, {
    id: "crm-leads-owner-create",
    type: "field",
    label: "Owner",
    description: "Enter the owner",
    inputType: "text",
  }),
  campaign: LeadsSchema.shape.campaign.register(fieldRegistry, {
    id: "crm-leads-campaign-create",
    type: "field",
    label: "Campaign",
    description: "Select the campaign (optional)",
    inputType: "text",
  }),
  convertedAt: LeadsSchema.shape.convertedAt.register(fieldRegistry, {
    id: "crm-leads-convertedAt-create",
    type: "field",
    label: "Converted At",
    description: "Select the conversion date (optional)",
    inputType: "date",
  }),
  convertedContact: LeadsSchema.shape.convertedContact.register(fieldRegistry, {
    id: "crm-leads-convertedContact-create",
    type: "field",
    label: "Converted Contact",
    description: "Enter the converted contact (optional)",
    inputType: "text",
  }),
  convertedCompany: LeadsSchema.shape.convertedCompany.register(fieldRegistry, {
    id: "crm-leads-convertedCompany-create",
    type: "field",
    label: "Converted Company",
    description: "Enter the converted company (optional)",
    inputType: "text",
  }),
  convertedOpportunity: LeadsSchema.shape.convertedOpportunity.register(
    fieldRegistry,
    {
      id: "crm-leads-convertedOpportunity-create",
      type: "field",
      label: "Converted Opportunity",
      description: "Enter the converted opportunity (optional)",
      inputType: "text",
    }
  ),
  attachments: LeadsSchema.shape.attachments.register(fieldRegistry, {
    id: "crm-leads-attachments-create",
    type: "field",
    inputType: "file",
    label: "Attachments",
    description: "Upload attachments (optional)",
    isArray: true,
  }),
});

const UpdateLeadsFormSchema = z.object({
  name: LeadsSchema.shape.name.optional().register(fieldRegistry, {
    id: "crm-leads-name-update",
    type: "field",
    label: "Lead Name",
    description: "Enter the lead name (optional)",
    inputType: "text",
  }),
  email: LeadsSchema.shape.email.optional().register(fieldRegistry, {
    id: "crm-leads-email-update",
    type: "field",
    label: "Email",
    description: "Enter the email (optional)",
    inputType: "email",
  }),
  source: LeadsSchema.shape.source.optional().register(fieldRegistry, {
    id: "crm-leads-source-update",
    type: "field",
    label: "Source",
    description: "Select the lead source (optional)",
    inputType: "select",
  }),
  status: LeadsSchema.shape.status.optional().register(fieldRegistry, {
    id: "crm-leads-status-update",
    type: "field",
    label: "Status",
    description: "Select the status (optional)",
    inputType: "select",
  }),
  score: LeadsSchema.shape.score.optional().register(fieldRegistry, {
    id: "crm-leads-score-update",
    type: "field",
    label: "Score",
    description: "Enter the lead score",
    inputType: "number",
  }),
  owner: LeadsSchema.shape.owner.optional().register(fieldRegistry, {
    id: "crm-leads-owner-update",
    type: "field",
    label: "Owner",
    description: "Enter the owner",
    inputType: "text",
  }),
  campaign: LeadsSchema.shape.campaign.optional().register(fieldRegistry, {
    id: "crm-leads-campaign-update",
    type: "field",
    label: "Campaign",
    description: "Select the campaign (optional)",
    inputType: "text",
  }),
  convertedAt: LeadsSchema.shape.convertedAt
    .optional()
    .register(fieldRegistry, {
      id: "crm-leads-convertedAt-update",
      type: "field",
      label: "Converted At",
      description: "Select the conversion date (optional)",
      inputType: "date",
    }),
  convertedContact: LeadsSchema.shape.convertedContact
    .optional()
    .register(fieldRegistry, {
      id: "crm-leads-convertedContact-update",
      type: "field",
      label: "Converted Contact",
      description: "Enter the converted contact (optional)",
      inputType: "text",
    }),
  convertedCompany: LeadsSchema.shape.convertedCompany
    .optional()
    .register(fieldRegistry, {
      id: "crm-leads-convertedCompany-update",
      type: "field",
      label: "Converted Company",
      description: "Enter the converted company (optional)",
      inputType: "text",
    }),
  convertedOpportunity: LeadsSchema.shape.convertedOpportunity
    .optional()
    .register(fieldRegistry, {
      id: "crm-leads-convertedOpportunity-update",
      type: "field",
      label: "Converted Opportunity",
      description: "Enter the converted opportunity (optional)",
      inputType: "text",
    }),
});

export const LeadsActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["leadss", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsLeads)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateLeadsFormSchema>
        title="Create Leads"
        description="Fill in the details to create a new leads."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsLeads)
              .create(data);
            toast.success("Leads created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create leads: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateLeadsFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateLeadsFormSchema>
        title="Update Leads"
        description="Update the leads details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsLeads)
              .update(searchQuery.id!, data);
            toast.success("Leads updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update leads: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateLeadsFormSchema}
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
            <AlertDialogTitle>Delete Leads</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this leads? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.CustomerRelationsLeads)
                    .delete(searchQuery.id!);
                  toast.success("Leads deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete leads: ${error.message} (${error.status})`
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

export default LeadsActions;
