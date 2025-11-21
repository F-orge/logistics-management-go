import { useRouteContext } from "@tanstack/react-router";
import { X } from "lucide-react";
import { ClientResponseError } from "pocketbase";
import z from "zod";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { withForm } from "@/components/ui/forms";
import { InputGroupButton } from "@/components/ui/input-group";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { CampaignsSchema } from "@/pocketbase/schemas/customer-relations";

export type CampaignFormProps = {
  action?: "create" | "edit";
};

export const CreateSchema = (pocketbase: TypedPocketBase) =>
  CampaignsSchema.omit({
    id: true,
    created: true,
    updated: true,
  }).superRefine(async (data, ctx) => {
    // - campaign name must be unique
    if (data.name) {
      try {
        const existing = await pocketbase
          .collection(Collections.CustomerRelationsCampaigns)
          .getFirstListItem(`name = '${data.name}'`);

        if (existing) {
          ctx.addIssue({
            code: "custom",
            message: "Campaign name must be unique",
            path: ["name"],
          });
        }
      } catch (error) {
        if (error instanceof ClientResponseError) {
          if (error.status !== 404 && error.status !== 0) {
            ctx.addIssue({
              code: "custom",
              message: `Error checking campaign name uniqueness: ${error.message} (${error.status})`,
            });
          }
        }
      }
    }

    // - start date must not be in the past and be today or future date
    if (data.startDate) {
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Set to start of today
      if (data.startDate < now) {
        ctx.addIssue({
          code: "custom",
          message: "Start date cannot be in the past",
          path: ["startDate"],
        });
      }
    }

    // - endDate must be after startDate
    if (data.startDate && data.endDate) {
      if (data.endDate <= data.startDate) {
        ctx.addIssue({
          code: "custom",
          message: "End date must be after start date",
          path: ["endDate"],
        });
      }
    }
  });

export const UpdateSchema = (pocketbase: TypedPocketBase, id?: string) =>
  CampaignsSchema.partial()
    .omit({
      attachments: true,
      id: true,
      created: true,
      updated: true,
    })
    .superRefine(async (data, ctx) => {
      console.log("Refining update schema with data:", data);
      // - campaign name must be unique but ignore current record
      if (data.name) {
        try {
          const existing = await pocketbase
            .collection(Collections.CustomerRelationsCampaigns)
            .getFirstListItem(`id != '${id}' && name = '${data.name}'`);

          if (existing) {
            ctx.addIssue({
              code: "custom",
              message: "Campaign name must be unique",
              path: ["name"],
            });
          }
        } catch (error) {
          if (error instanceof ClientResponseError) {
            if (error.status !== 404 && error.status !== 0) {
              ctx.addIssue({
                code: "custom",
                message: `Error checking campaign name uniqueness: ${error.message} (${error.status})`,
              });
            }
          }
        }
      }

      // - start date must not be in the past and be today or future date
      if (data.startDate) {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Set to start of today
        if (data.startDate < now) {
          ctx.addIssue({
            code: "custom",
            message: "Start date cannot be in the past",
            path: ["startDate"],
          });
        }
      }

      // - endDate must be after startDate
      if (data.startDate && data.endDate) {
        if (data.endDate <= data.startDate) {
          ctx.addIssue({
            code: "custom",
            message: "End date must be after start date",
            path: ["endDate"],
          });
        }
      }
    });

export const CampaignForm = withForm({
  defaultValues: {} as z.infer<typeof CampaignsSchema>,
  props: {} as CampaignFormProps,
  render: ({ form, ...props }) => {
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
              <field.NumberField addonStart="₱" />
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
        {/* attachments */}
        {props.action === "create" && (
          <>
            <FieldSeparator className="col-span-full" />
            <form.FieldSet
              className="col-span-full"
              legend="Attachments"
              description="Upload files related to the campaign."
            >
              <form.AppField name="attachments" mode="array">
                {(field) => (
                  <>
                    {field.state.value?.map((_, index) => (
                      <form.AppField key={index} name={`attachments[${index}]`}>
                        {(subField) => (
                          <subField.Field className="mb-2">
                            <subField.FileField>
                              <InputGroupButton
                                onClick={() => field.removeValue(index)}
                                aria-label={`Remove attachment ${index + 1}`}
                              >
                                <X />
                              </InputGroupButton>
                            </subField.FileField>
                          </subField.Field>
                        )}
                      </form.AppField>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue(undefined as any)}
                    >
                      Add Attachments
                    </Button>
                  </>
                )}
              </form.AppField>
            </form.FieldSet>
          </>
        )}
      </form.FieldSet>
    );
  },
});
