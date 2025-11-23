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
  CustomerRelationsCampaignsResponse,
  CustomerRelationsCompaniesResponse,
  CustomerRelationsContactsResponse,
  CustomerRelationsLeadsRecord,
  CustomerRelationsOpportunitiesResponse,
  TypedPocketBase,
} from "@/lib/pb.types";
import {
  CreateLeadsSchema,
  LeadsSchema,
  UpdateLeadsSchema,
} from "@/pocketbase/schemas/customer-relations";

export type LeadsFormProps = {
  action?: "create" | "edit";
};

export const LeadsForm = withForm({
  defaultValues: {} as z.infer<typeof LeadsSchema>,
  props: {} as LeadsFormProps,
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
              className="col-span-2"
              title="Lead Name"
              description="Name of the lead or prospect."
              tooltip="Example: Jane Smith"
            >
              <field.TextField showClearButton />
            </field.Field>
          )}
        </form.AppField>
        {/* email */}
        <form.AppField name="email">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Email"
              description="Lead email address."
              tooltip="Example: jane@example.com"
            >
              <field.EmailField />
            </field.Field>
          )}
        </form.AppField>
        {/* source */}
        <form.AppField name="source">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Source"
              description="How the lead was acquired."
              tooltip="Select lead source"
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
                  { label: "Other", value: "other" },
                ]}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* status */}
        <form.AppField name="status">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Status"
              description="Current status of the lead."
              tooltip="Select lead status"
            >
              <field.SelectField
                options={[
                  { label: "New", value: "new" },
                  { label: "Contacted", value: "contacted" },
                  { label: "Qualified", value: "qualified" },
                  { label: "Unqualified", value: "unqualified" },
                  { label: "Converted", value: "converted" },
                ]}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* score */}
        <form.AppField name="score">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Lead Score"
              description="Scoring metric for lead quality (0-100)."
              tooltip="Example: 75"
            >
              <field.NumberField min={0} max={100} />
            </field.Field>
          )}
        </form.AppField>
        {/* campaign */}
        <form.AppField name="campaign">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Campaign"
              description="Campaign this lead is associated with."
              tooltip="Select a campaign"
            >
              <field.RelationField<CustomerRelationsCampaignsResponse>
                collectionName={Collections.CustomerRelationsCampaigns}
                relationshipName="campaign"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* convertedAt */}
        <form.AppField name="convertedAt">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Converted At"
              description="Date and time when lead was converted."
              tooltip="Select conversion date"
            >
              <field.DateTimeField />
            </field.Field>
          )}
        </form.AppField>
        {/* convertedContact */}
        <form.AppField name="convertedContact">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Converted to Contact"
              description="Contact record created from this lead."
              tooltip="Select contact"
            >
              <field.RelationField<CustomerRelationsContactsResponse>
                collectionName={Collections.CustomerRelationsContacts}
                relationshipName="convertedContact"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* convertedCompany */}
        <form.AppField name="convertedCompany">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Converted to Company"
              description="Company record created from this lead."
              tooltip="Select company"
            >
              <field.RelationField<CustomerRelationsCompaniesResponse>
                collectionName={Collections.CustomerRelationsCompanies}
                relationshipName="convertedCompany"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* convertedOpportunity */}
        <form.AppField name="convertedOpportunity">
          {(field) => (
            <field.Field
              className="col-span-full"
              title="Converted to Opportunity"
              description="Opportunity record created from this lead."
              tooltip="Select opportunity"
            >
              <field.RelationField<CustomerRelationsOpportunitiesResponse>
                collectionName={Collections.CustomerRelationsOpportunities}
                relationshipName="convertedOpportunity"
                renderOption={(item) => `${item.name}`}
              />
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
              description="Upload files related to the lead."
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

export const CreateLeadsFormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      name: "",
      email: "",
      source: "website",
      status: "new",
      score: 0,
      campaign: undefined,
      convertedAt: undefined,
      convertedContact: undefined,
      convertedCompany: undefined,
      convertedOpportunity: undefined,
      attachments: [],
    } as Partial<z.infer<ReturnType<typeof CreateLeadsSchema>>>,
    validators: {
      onSubmitAsync: CreateLeadsSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.CustomerRelationsLeads)
          .create(value);

        toast.success("Lead created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create lead: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateLeadsFormOption = (
  pocketbase: TypedPocketBase,
  record?: CustomerRelationsLeadsRecord
) =>
  formOptions({
    defaultValues: {
      ...record,
      convertedAt: record?.convertedAt
        ? new Date(record.convertedAt)
        : undefined,
    } as Partial<z.infer<ReturnType<typeof UpdateLeadsSchema>>>,
    validators: {
      onSubmitAsync: UpdateLeadsSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.CustomerRelationsLeads)
          .update(record?.id!, value);

        toast.success("Lead updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update lead: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
