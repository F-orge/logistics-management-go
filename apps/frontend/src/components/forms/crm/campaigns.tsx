import { formOptions } from "@tanstack/react-form";
import { useAppForm, withForm } from "@packages/ui/components/form/index";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCampaignInputSchema,
  UpdateCampaignInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";
import { toast } from "sonner";
import {
  CreateCampaignMutation,
  execute,
  UpdateCampaignMutation,
} from "@packages/graphql/client";
import { Campaign } from "@/components/tables/crm/campaigns";
import { Row } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const createCampaignSchema = CreateCampaignInputSchema();
export const updateCampaignSchema = UpdateCampaignInputSchema();

export const createCampaignFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCampaignSchema>,
});

export const updateCampaignFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCampaignSchema>,
});

export const CreateCampaignForm = withForm({
  ...createCampaignFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Campaign</FieldLegend>
        <FieldDescription>
          Fill in the details for the new campaign.
        </FieldDescription>
        <FieldGroup>
          {/* Campaign Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Campaign Details</FieldLegend>
            <FieldDescription>Basic campaign information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Campaign Name *"
                    description="Name of the marketing campaign."
                    placeholder="e.g., Summer 2025 Promotion"
                  />
                )}
              </form.AppField>
              <form.AppField name="budget">
                {(field) => (
                  <field.InputField
                    type="number"
                    step="0.01"
                    label="Budget"
                    description="Total budget allocated for this campaign."
                    placeholder="0.00"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>Campaign start and end dates.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Start Date"
                      description="When the campaign begins."
                    />
                  )}
                </form.AppField>
                <form.AppField name="endDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="End Date"
                      description="When the campaign ends."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateCampaignForm = withForm({
  ...updateCampaignFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Campaign</FieldLegend>
        <FieldDescription>
          Update the details for the campaign.
        </FieldDescription>
        <FieldGroup>
          {/* Campaign Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Campaign Details</FieldLegend>
            <FieldDescription>Basic campaign information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Campaign Name"
                    description="Name of the marketing campaign."
                    placeholder="e.g., Summer 2025 Promotion"
                  />
                )}
              </form.AppField>
              <form.AppField name="budget">
                {(field) => (
                  <field.InputField
                    type="number"
                    step="0.01"
                    label="Budget"
                    description="Total budget allocated for this campaign."
                    placeholder="0.00"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>Campaign start and end dates.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Start Date"
                      description="When the campaign begins."
                    />
                  )}
                </form.AppField>
                <form.AppField name="endDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="End Date"
                      description="When the campaign ends."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const NewCampaignDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/crm/campaigns" });
  const searchQuery = useSearch({ from: "/dashboard/crm/campaigns" });

  const form = useAppForm({
    ...createCampaignFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateCampaignMutation,
        { campaign: value }
      );

      if (data) {
        toast.success("Successfully created campaign");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({ search: (prev) => ({ ...prev, new: undefined }) });
    },
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <CreateCampaignForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Create
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const UpdateCampaignDialogForm = ({ data }: { data: Campaign[] }) => {
  const navigate = useNavigate({ from: "/dashboard/crm/campaigns" });
  const searchQuery = useSearch({ from: "/dashboard/crm/campaigns" });

  const campaign = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateCampaignFormOption,
    defaultValues: campaign,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateCampaignMutation,
        { id: campaign.id, campaign: value }
      );

      if (data) {
        toast.success("Successfully created campaign");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({
        search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchQuery.edit && !!searchQuery.id}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
        })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <UpdateCampaignForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Update
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};
