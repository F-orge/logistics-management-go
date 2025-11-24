import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { X } from "lucide-react";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { withForm } from "@/components/ui/forms";
import { InputGroupButton } from "@/components/ui/input-group";
import {
  Collections,
  Create,
  CustomerRelationsCampaignsResponse,
  CustomerRelationsCompaniesResponse,
  CustomerRelationsContactsResponse,
  CustomerRelationsOpportunitiesRecord,
  TypedPocketBase,
} from "@/lib/pb.types";
import {
  CreateOpportunitiesSchema,
  OpportunitiesSchema,
  UpdateOpportunitiesSchema,
} from "@/pocketbase/schemas/customer-relations";
import { OpportunityProductsForm } from "../opportunity-products/form";

export type OpportunitiesFormProps = {
  action?: "create" | "edit";
};

export const OpportunitiesForm = withForm({
  defaultValues: {} as z.infer<typeof OpportunitiesSchema>,
  props: {} as OpportunitiesFormProps,
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
              title="Opportunity Name"
              description="Name of the sales opportunity or deal."
              tooltip="Example: Enterprise ABC Deal"
            >
              <field.TextField showClearButton />
            </field.Field>
          )}
        </form.AppField>
        {/* stage */}
        <form.AppField name="stage">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Stage"
              description="Current stage in the sales pipeline."
              tooltip="Select pipeline stage"
            >
              <field.SelectField
                options={[
                  { label: "Prospecting", value: "prospecting" },
                  { label: "Qualification", value: "qualification" },
                  { label: "Need Analysis", value: "need-analysis" },
                  { label: "Demo", value: "demo" },
                  { label: "Proposal", value: "proposal" },
                  { label: "Negotiation", value: "negotiation" },
                  { label: "Closed Won", value: "closed-won" },
                  { label: "Closed Lost", value: "closed-lost" },
                ]}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* source */}
        <form.AppField name="source">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Source"
              description="How the opportunity was originated."
              tooltip="Select opportunity source"
            >
              <field.SelectField
                options={[
                  { label: "Website", value: "website" },
                  { label: "Referral", value: "referral" },
                  { label: "Social Media", value: "social-media" },
                  { label: "Email Campaign", value: "email-campaign" },
                  { label: "Cold Call", value: "cold-call" },
                  { label: "Event", value: "event" },
                  { label: "Advertisement", value: "advertisment" },
                  { label: "Partner", value: "partner" },
                  { label: "Existing Customer", value: "existing-customer" },
                  { label: "Other", value: "other" },
                ]}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* dealValue */}
        <form.AppField name="dealValue">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Deal Value"
              description="Estimated or actual deal amount."
              tooltip="Example: 500000"
            >
              <field.NumberField addonStart="₱" />
            </field.Field>
          )}
        </form.AppField>
        {/* probability */}
        <form.AppField name="probability">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Probability"
              description="Win probability (0 to 1 scale)."
              tooltip="Example: 0.75"
            >
              <field.NumberField min={0} max={1} step={0.1} />
            </field.Field>
          )}
        </form.AppField>
        {/* expectedCloseDate */}
        <form.AppField name="expectedCloseDate">
          {(field) => (
            <field.Field
              className="col-span-full"
              title="Expected Close Date"
              description="Expected date of deal closure."
              tooltip="Select expected close date"
            >
              <field.DateTimeField />
            </field.Field>
          )}
        </form.AppField>
        {/* lostReason */}
        <form.AppField name="lostReason">
          {(field) => (
            <field.Field
              className="col-span-full"
              title="Lost Reason"
              description="Reason why the opportunity was lost (if applicable)."
              tooltip="Describe why deal was lost"
            >
              <field.TextareaField
                disabled={props.action === "edit"}
                rows={3}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* contact */}
        <form.AppField name="contact">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Contact"
              description="Primary contact for this opportunity."
              tooltip="Select contact"
            >
              <field.RelationField<CustomerRelationsContactsResponse>
                collectionName={Collections.CustomerRelationsContacts}
                relationshipName="contact"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* company */}
        <form.AppField name="company">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Company"
              description="Company associated with this opportunity."
              tooltip="Select company"
            >
              <field.RelationField<CustomerRelationsCompaniesResponse>
                collectionName={Collections.CustomerRelationsCompanies}
                relationshipName="company"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* campaign */}
        <form.AppField name="campaign">
          {(field) => (
            <field.Field
              className="col-span-full"
              title="Campaign"
              description="Campaign associated with this opportunity."
              tooltip="Select campaign"
            >
              <field.RelationField<CustomerRelationsCampaignsResponse>
                collectionName={Collections.CustomerRelationsCampaigns}
                relationshipName="campaign"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* products */}
        {props.action === "create" && (
          <>
            <FieldSeparator className="col-span-full" />
            <form.FieldSet
              className="col-span-full"
              legend="Products"
              description="Add products to this opportunity."
            >
              <form.AppField name="products" mode="array">
                {(field) => (
                  <>
                    {field.state.value?.map((_, index) => (
                      <OpportunityProductsForm
                        key={index}
                        form={form}
                        fields={`products[${index}]` as any}
                        onRemove={() => field.removeValue(index)}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue(undefined as any)}
                    >
                      Add Product
                    </Button>
                  </>
                )}
              </form.AppField>
            </form.FieldSet>
          </>
        )}
        {/* attachments */}
        {props.action === "create" && (
          <>
            <FieldSeparator className="col-span-full" />
            <form.FieldSet
              className="col-span-full"
              legend="Attachments"
              description="Upload files related to the opportunity."
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

export const CreateOpportunitiesFormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      stage: "prospecting",
      source: "referral",
      products: [],
      attachments: [],
    } as Partial<z.infer<ReturnType<typeof CreateOpportunitiesSchema>>>,
    // todo: please fix this later
    // validators: {
    //   onSubmit: CreateOpportunitiesSchema(pocketbase),
    // },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      let opportunityId: string | null = null;

      try {
        const { products, ...opportunityData } = value;

        const opportunity = await pocketbase
          .collection(Collections.CustomerRelationsOpportunities)
          .create({
            ...opportunityData,
            owner: pocketbase.authStore.record?.id,
          });

        opportunityId = opportunity.id;

        const batch = pocketbase.createBatch();

        for (const item of products || []) {
          batch
            .collection(Collections.CustomerRelationsOpportunityProducts)
            .create({
              opportunity: opportunity.id,
              product: item.product,
              quantity: item.quantity,
            } as Create<Collections.CustomerRelationsOpportunityProducts>);
        }

        await batch.send();

        toast.success("Opportunity created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          if (opportunityId) {
            // Cleanup opportunity if products creation failed
            try {
              await pocketbase!
                .collection(Collections.CustomerRelationsOpportunities)
                .delete(opportunityId);
            } catch (deleteError) {
              console.error(
                "Failed to cleanup opportunity after product creation failure:",
                deleteError
              );
            }
          }

          toast.error(
            `Failed to create opportunity: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateOpportunitiesFormOption = (
  pocketbase: TypedPocketBase,
  record?: CustomerRelationsOpportunitiesRecord
) =>
  formOptions({
    defaultValues: {
      ...record,
      expectedCloseDate: record?.expectedCloseDate
        ? new Date(record.expectedCloseDate)
        : undefined,
    } as Partial<z.infer<ReturnType<typeof UpdateOpportunitiesSchema>>>,
    validators: {
      onSubmitAsync: UpdateOpportunitiesSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.CustomerRelationsOpportunities)
          .update(record?.id!, value);

        toast.success("Opportunity updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update opportunity: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
