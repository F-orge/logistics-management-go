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
import { OpportunitiesSchema } from "@/pocketbase/schemas/customer-relations/opportunities";

const CreateOpportunitiesFormSchema = z.object({
  name: OpportunitiesSchema.shape.name.register(fieldRegistry, {
    id: "crm-opportunities-name-create",
    type: "field",
    label: "Opportunity Name",
    description: "Enter the opportunity name",
    inputType: "text",
  }),
  stage: OpportunitiesSchema.shape.stage.register(fieldRegistry, {
    id: "crm-opportunities-stage-create",
    type: "field",
    label: "Stage",
    description: "Select the stage (optional)",
    inputType: "select",
  }),
  dealValue: OpportunitiesSchema.shape.dealValue.register(fieldRegistry, {
    id: "crm-opportunities-dealValue-create",
    type: "field",
    label: "Deal Value",
    description: "Enter the deal value (optional)",
    inputType: "number",
  }),
  probability: OpportunitiesSchema.shape.probability.register(fieldRegistry, {
    id: "crm-opportunities-probability-create",
    type: "field",
    label: "Probability",
    description: "Enter the probability (0-1) (optional)",
    inputType: "number",
  }),
  expectedCloseDate: OpportunitiesSchema.shape.expectedCloseDate.register(
    fieldRegistry,
    {
      id: "crm-opportunities-expectedCloseDate-create",
      type: "field",
      label: "Expected Close Date",
      description: "Select the expected close date (optional)",
      inputType: "date",
    }
  ),
  lostReason: OpportunitiesSchema.shape.lostReason.register(fieldRegistry, {
    id: "crm-opportunities-lostReason-create",
    type: "field",
    label: "Lost Reason",
    description: "Enter the lost reason (optional)",
    inputType: "textarea",
  }),
  source: OpportunitiesSchema.shape.source.register(fieldRegistry, {
    id: "crm-opportunities-source-create",
    type: "field",
    label: "Source",
    description: "Select the source",
    inputType: "select",
  }),
  owner: OpportunitiesSchema.shape.owner.register(fieldRegistry, {
    id: "crm-opportunities-owner-create",
    type: "field",
    label: "Owner",
    description: "Enter the owner",
    inputType: "text",
  }),
  contact: OpportunitiesSchema.shape.contact.register(fieldRegistry, {
    id: "crm-opportunities-contact-create",
    type: "field",
    label: "Contact",
    description: "Select the contact (optional)",
    inputType: "text",
  }),
  company: OpportunitiesSchema.shape.company.register(fieldRegistry, {
    id: "crm-opportunities-company-create",
    type: "field",
    label: "Company",
    description: "Select the company (optional)",
    inputType: "text",
  }),
  campaign: OpportunitiesSchema.shape.campaign.register(fieldRegistry, {
    id: "crm-opportunities-campaign-create",
    type: "field",
    label: "Campaign",
    description: "Select the campaign (optional)",
    inputType: "text",
  }),
  attachments: OpportunitiesSchema.shape.attachments.register(fieldRegistry, {
    id: "crm-opportunities-attachments-create",
    type: "field",
    inputType: "file",
    label: "Attachments",
    description: "Upload attachments (optional)",
    isArray: true,
  }),
  products: OpportunitiesSchema.shape.products.register(fieldRegistry, {
    id: "crm-opportunities-products-create",
    type: "field",
    label: "Products",
    description: "Select products (optional)",
    inputType: "text",
    isArray: true,
  }),
});

const UpdateOpportunitiesFormSchema = z.object({
  name: OpportunitiesSchema.shape.name.optional().register(fieldRegistry, {
    id: "crm-opportunities-name-update",
    type: "field",
    label: "Opportunity Name",
    description: "Enter the opportunity name",
    inputType: "text",
  }),
  stage: OpportunitiesSchema.shape.stage.optional().register(fieldRegistry, {
    id: "crm-opportunities-stage-update",
    type: "field",
    label: "Stage",
    description: "Select the stage (optional)",
    inputType: "select",
  }),
  dealValue: OpportunitiesSchema.shape.dealValue
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-dealValue-update",
      type: "field",
      label: "Deal Value",
      description: "Enter the deal value (optional)",
      inputType: "number",
    }),
  probability: OpportunitiesSchema.shape.probability
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-probability-update",
      type: "field",
      label: "Probability",
      description: "Enter the probability (0-1) (optional)",
      inputType: "number",
    }),
  expectedCloseDate: OpportunitiesSchema.shape.expectedCloseDate
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-expectedCloseDate-update",
      type: "field",
      label: "Expected Close Date",
      description: "Select the expected close date (optional)",
      inputType: "date",
    }),
  lostReason: OpportunitiesSchema.shape.lostReason
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-lostReason-update",
      type: "field",
      label: "Lost Reason",
      description: "Enter the lost reason (optional)",
      inputType: "textarea",
    }),
  source: OpportunitiesSchema.shape.source.optional().register(fieldRegistry, {
    id: "crm-opportunities-source-update",
    type: "field",
    label: "Source",
    description: "Select the source",
    inputType: "select",
  }),
  owner: OpportunitiesSchema.shape.owner.optional().register(fieldRegistry, {
    id: "crm-opportunities-owner-update",
    type: "field",
    label: "Owner",
    description: "Enter the owner",
    inputType: "text",
  }),
  contact: OpportunitiesSchema.shape.contact
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-contact-update",
      type: "field",
      label: "Contact",
      description: "Select the contact (optional)",
      inputType: "text",
    }),
  company: OpportunitiesSchema.shape.company
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-company-update",
      type: "field",
      label: "Company",
      description: "Select the company (optional)",
      inputType: "text",
    }),
  campaign: OpportunitiesSchema.shape.campaign
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-campaign-update",
      type: "field",
      label: "Campaign",
      description: "Select the campaign (optional)",
      inputType: "text",
    }),
});

export const OpportunitiesActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["opportunitiess", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsOpportunities)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateOpportunitiesFormSchema>
        title="Create Opportunities"
        description="Fill in the details to create a new opportunities."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsOpportunities)
              .create(data);
            toast.success("Opportunities created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create opportunities: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateOpportunitiesFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateOpportunitiesFormSchema>
        title="Update Opportunities"
        description="Update the opportunities details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsOpportunities)
              .update(searchQuery.id!, data);
            toast.success("Opportunities updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update opportunities: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateOpportunitiesFormSchema}
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
            <AlertDialogTitle>Delete Opportunities</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this opportunities? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.CustomerRelationsOpportunities)
                    .delete(searchQuery.id!);
                  toast.success("Opportunities deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete opportunities: ${error.message} (${error.status})`
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

export default OpportunitiesActions;
