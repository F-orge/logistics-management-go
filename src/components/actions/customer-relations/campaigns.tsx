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
import { CampaignsSchema } from "@/pocketbase/schemas/customer-relations/campaigns";

const CreateCampaignFormSchema = z.object({
  name: CampaignsSchema.shape.name.register(fieldRegistry, {
    id: "crm-campaign-name-create",
    type: "field",
    label: "Campaign Name",
    description: "Enter the name of the campaign",
    inputType: "text",
  }),
  budget: CampaignsSchema.shape.budget.register(fieldRegistry, {
    id: "crm-campaign-budget-create",
    type: "field",
    label: "Budget",
    description: "Enter the budget for the campaign",
    inputType: "number",
  }),
  startDate: CampaignsSchema.shape.startDate.register(fieldRegistry, {
    id: "crm-campaign-startDate-create",
    type: "field",
    label: "Start Date",
    description: "Enter the start date of the campaign",
    inputType: "date",
  }),
  endDate: CampaignsSchema.shape.endDate.register(fieldRegistry, {
    id: "crm-campaign-endDate-create",
    type: "field",
    label: "End Date",
    description: "Enter the end date of the campaign",
    inputType: "date",
  }),
  attachments: CampaignsSchema.shape.attachments.register(fieldRegistry, {
    id: "crm-campaign-attachments-create",
    type: "field",
    inputType: "file",
    label: "Attachments",
    description: "Upload attachments for the campaign",
    isArray: true,
  }),
});

const UpdateCampaignFormSchema = z.object({
  name: CampaignsSchema.shape.name.optional().register(fieldRegistry, {
    id: "crm-campaign-name-update",
    type: "field",
    label: "Campaign Name",
    description: "Enter the name of the campaign",
    inputType: "text",
  }),
  budget: CampaignsSchema.shape.budget.optional().register(fieldRegistry, {
    id: "crm-campaign-budget-update",
    type: "field",
    label: "Budget",
    description: "Enter the budget for the campaign",
    inputType: "number",
  }),
  startDate: CampaignsSchema.shape.startDate
    .optional()
    .register(fieldRegistry, {
      id: "crm-campaign-startDate-update",
      type: "field",
      label: "Start Date",
      description: "Enter the start date of the campaign",
      inputType: "date",
    }),
  endDate: CampaignsSchema.shape.endDate.optional().register(fieldRegistry, {
    id: "crm-campaign-endDate-update",
    type: "field",
    label: "End Date",
    description: "Enter the end date of the campaign",
    inputType: "date",
  }),
});

export const CampaignsActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["campaignss", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsCampaigns)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateCampaignFormSchema>
        title="Create Campaigns"
        description="Fill in the details to create a new campaigns."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsCampaigns)
              .create(data);
            toast.success("Campaigns created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create campaigns: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateCampaignFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateCampaignFormSchema>
        title="Update Campaigns"
        description="Update the campaigns details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsCampaigns)
              .update(searchQuery.id!, data);
            toast.success("Campaigns updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update campaigns: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateCampaignFormSchema}
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
            <AlertDialogTitle>Delete Campaigns</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this campaigns? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.CustomerRelationsCampaigns)
                    .delete(searchQuery.id!);
                  toast.success("Campaigns deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete campaigns: ${error.message} (${error.status})`
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

export default CampaignsActions;
