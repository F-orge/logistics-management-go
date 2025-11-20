import { useRouteContext } from "@tanstack/react-router";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import { Collections } from "@/lib/pb.types";
import { CampaignsSchema } from "@/pocketbase/schemas/customer-relations";

export type CampaignFormProps = {
  action?: "create" | "edit";
};

export const CreateSchema = CampaignsSchema.omit({
  id: true,
  created: true,
  updated: true,
});

export const UpdateSchema = CreateSchema.omit({
  attachments: true,
}).partial();

export const CampaignForm = withForm({
  defaultValues: {} as z.infer<typeof CreateSchema>,
  validators: {},
  props: {} as CampaignFormProps,
  render: ({ form, ...props }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    if (props.action === "create") {
      return (
        <form.FieldSet
          fieldGroupProps={{
            className: "grid grid-cols-4 gap-4",
          }}
        >
          {/* name */}
          <form.AppField
            validators={{
              onChangeAsync: async ({ value }) => {
                if (value === undefined || value === null || value === "")
                  return;
                const result = await pocketbase
                  .collection(Collections.CustomerRelationsCampaigns)
                  .getFirstListItem(`name = "${value}"`);

                if (result) {
                  return {
                    message: "A campaign with this name already exists.",
                  };
                }
              },
              onChangeAsyncDebounceMs: 1000,
            }}
            name="name"
          >
            {(field) => (
              <field.Field
                className="col-span-full"
                tooltip="Example: Holiday Sale 2025"
                title="Name"
                description="The campaign name used to identify this campaign in lists and reports."
              >
                <field.TextField showClearButton />
              </field.Field>
            )}
          </form.AppField>
          {/* budget */}
          <form.AppField name="budget">
            {(field) => (
              <field.Field
                className="col-span-full"
                tooltip="Example: 10000"
                title="Budget"
                description="The total monetary budget allocated to this campaign (numeric value)."
              >
                <field.NumberField />
              </field.Field>
            )}
          </form.AppField>
          {/* startDate */}
          <form.AppField name="startDate">
            {(field) => (
              <field.Field
                className="col-span-2"
                tooltip="Example: 2025-12-01T00:00:00Z"
                title="Start Date"
                description="The start date and time when this campaign becomes active."
              >
                <field.DateTimeField />
              </field.Field>
            )}
          </form.AppField>
          {/* endDate */}
          <form.AppField name="endDate">
            {(field) => (
              <field.Field
                className="col-span-2"
                tooltip="Example: 2026-01-01T00:00:00Z"
                title="End Date"
                description="The end date and time when this campaign stops being active."
              >
                <field.DateTimeField />
              </field.Field>
            )}
          </form.AppField>
        </form.FieldSet>
      );
    }

    if (props.action === "edit") {
      return (
        <form.FieldSet
          fieldGroupProps={{
            className: "grid grid-cols-4 gap-4",
          }}
        >
          {/* name */}
          <form.AppField name="name">
            {(field) => (
              <field.Field
                className="col-span-full"
                tooltip="Example: Holiday Sale 2025"
                title="Name"
                description="The campaign name used to identify this campaign in lists and reports."
              >
                <field.TextField />
              </field.Field>
            )}
          </form.AppField>
          {/* budget */}
          <form.AppField name="budget">
            {(field) => (
              <field.Field
                className="col-span-full"
                tooltip="Example: 10000"
                title="Budget"
                description="The total monetary budget allocated to this campaign (numeric value)."
              >
                <field.NumberField />
              </field.Field>
            )}
          </form.AppField>
          {/* startDate */}
          <form.AppField name="startDate">
            {(field) => (
              <field.Field
                className="col-span-2"
                tooltip="Example: 2025-12-01T00:00:00Z"
                title="Start Date"
                description="The start date and time when this campaign becomes active."
              >
                <field.DateTimeField />
              </field.Field>
            )}
          </form.AppField>
          {/* endDate */}
          <form.AppField name="endDate">
            {(field) => (
              <field.Field
                className="col-span-2"
                tooltip="Example: 2026-01-01T00:00:00Z"
                title="End Date"
                description="The end date and time when this campaign stops being active."
              >
                <field.DateTimeField />
              </field.Field>
            )}
          </form.AppField>
        </form.FieldSet>
      );
    }
  },
});
