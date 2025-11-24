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
  CustomerRelationsCompaniesRecord,
  TypedPocketBase,
} from "@/lib/pb.types";
import {
  CompaniesSchema,
  CreateCompaniesSchema,
  UpdateCompaniesSchema,
} from "@/pocketbase/schemas/customer-relations";

export type CompaniesFormProps = {
  action?: "create" | "edit";
};

export const CompaniesForm = withForm({
  defaultValues: {} as z.infer<typeof CompaniesSchema>,
  props: {} as CompaniesFormProps,
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
              title="Company Name"
              description="The official name of the company."
              tooltip="Example: Acme Corporation"
            >
              <field.TextField showClearButton />
            </field.Field>
          )}
        </form.AppField>
        {/* street */}
        <form.AppField name="street">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Street Address"
              description="Street address of the company."
              tooltip="Example: 123 Main St"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* city */}
        <form.AppField name="city">
          {(field) => (
            <field.Field
              className="col-span-1"
              title="City"
              description="City where the company is located."
              tooltip="Example: Manila"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* state */}
        <form.AppField name="state">
          {(field) => (
            <field.Field
              className="col-span-1"
              title="State/Province"
              description="State or province of the company."
              tooltip="Example: NCR"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* postalCode */}
        <form.AppField name="postalCode">
          {(field) => (
            <field.Field
              className="col-span-1"
              title="Postal Code"
              description="Postal code for the company address."
              tooltip="Example: 1000"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* country */}
        <form.AppField name="country">
          {(field) => (
            <field.Field
              className="col-span-1"
              title="Country"
              description="Country where the company is located."
              tooltip="Example: Philippines"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* phoneNumber */}
        <form.AppField name="phoneNumber">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Phone Number"
              description="Company contact phone number."
              tooltip="Example: +63 2 1234 5678"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* website */}
        <form.AppField name="website">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Website"
              description="Company website URL."
              tooltip="Example: https://example.com"
            >
              <field.URLField />
            </field.Field>
          )}
        </form.AppField>
        {/* industry */}
        <form.AppField name="industry">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Industry"
              description="Industry or business sector."
              tooltip="Example: Technology"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* annualRevenue */}
        <form.AppField name="annualRevenue">
          {(field) => (
            <field.Field
              className="col-span-full"
              title="Annual Revenue"
              description="Company's annual revenue."
              tooltip="Example: 1000000"
            >
              <field.NumberField addonStart="₱" />
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
              description="Upload files related to the company."
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

export const CreateCompaniesFormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phoneNumber: "",
      website: "",
      industry: "",
      annualRevenue: undefined,
      attachments: [],
    } as Partial<z.infer<ReturnType<typeof CreateCompaniesSchema>>>,
    validators: {
      onSubmitAsync: CreateCompaniesSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.CustomerRelationsCompanies)
          .create(value);

        toast.success("Company created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create company: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateCompaniesFormOption = (
  pocketbase: TypedPocketBase,
  record?: CustomerRelationsCompaniesRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdateCompaniesSchema>>
    >,
    validators: {
      onSubmitAsync: UpdateCompaniesSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.CustomerRelationsCompanies)
          .update(record?.id!, value);

        toast.success("Company updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update company: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
