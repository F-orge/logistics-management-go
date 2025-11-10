import { formOptions } from "@tanstack/react-form";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
  Collections,
  Create,
  UsersResponse,
  BillingManagementQuotesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { BillingManagementQuotesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementQuotesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.BillingManagementQuotes>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementQuotes)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Quotes created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: BillingManagementQuotesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.BillingManagementQuotes>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementQuotes)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Quotes updated successfully",
        })
        .unwrap();
    },
  });

export const QuotesForm = withForm({
  defaultValues: {} as Create<Collections.BillingManagementQuotes> | Update<Collections.BillingManagementQuotes>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Identification */}
          <FieldGroup>
            <FieldLegend>Identification</FieldLegend>
            <FieldDescription>
              Manage identification information
            </FieldDescription>

            <form.AppField name="quoteNumber">
              {(field) => (
                <field.TextField
                  label="Quote Number"
                  description="Unique quote number"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Client */}
          <FieldGroup>
            <FieldLegend>Client</FieldLegend>
            <FieldDescription>
              Manage client information
            </FieldDescription>

            <form.AppField name="client">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="client"
                  label="Client"
                  description="Associated client"
                  displayField="username"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Status */}
          <FieldGroup>
            <FieldLegend>Status</FieldLegend>
            <FieldDescription>
              Manage status information
            </FieldDescription>

            <form.AppField name="status">
              {(field) => (
                <field.SelectField
                  label="Status"
                  description="Current quote status"
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "Accepted", value: "accepted" },
                    { label: "Expired", value: "expired" },
                    { label: "Cancelled", value: "cancelled" },
                    { label: "Converted", value: "converted" }
                  ]}
                  placeholder="Select..."
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Details */}
          <FieldGroup>
            <FieldLegend>Details</FieldLegend>
            <FieldDescription>
              Manage details information
            </FieldDescription>

            <form.AppField name="originDetails">
              {(field) => (
                <field.TextareaField
                  label="Origin Details"
                  description="Origin location details"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="destinationDetails">
              {(field) => (
                <field.TextareaField
                  label="Destination Details"
                  description="Destination location details"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => (
                <field.TextareaField
                  label="Notes"
                  description="Additional notes"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Dimensions */}
          <FieldGroup>
            <FieldLegend>Dimensions</FieldLegend>
            <FieldDescription>
              Manage dimensions information
            </FieldDescription>

            <form.AppField name="length">
              {(field) => (
                <field.NumberField
                  label="Length"
                  description="Length in cm"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="width">
              {(field) => (
                <field.NumberField
                  label="Width"
                  description="Width in cm"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="height">
              {(field) => (
                <field.NumberField
                  label="Height"
                  description="Height in cm"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="weight">
              {(field) => (
                <field.NumberField
                  label="Weight"
                  description="Weight in kg"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Pricing */}
          <FieldGroup>
            <FieldLegend>Pricing</FieldLegend>
            <FieldDescription>
              Manage pricing information
            </FieldDescription>

            <form.AppField name="quotePrice">
              {(field) => (
                <field.NumberField
                  label="Quote Price"
                  description="Quoted price"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Service */}
          <FieldGroup>
            <FieldLegend>Service</FieldLegend>
            <FieldDescription>
              Manage service information
            </FieldDescription>

            <form.AppField name="serviceLevel">
              {(field) => (
                <field.TextField
                  label="Service Level"
                  description="Service level"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Validity */}
          <FieldGroup>
            <FieldLegend>Validity</FieldLegend>
            <FieldDescription>
              Manage validity information
            </FieldDescription>

            <form.AppField name="expiredAt">
              {(field) => (
                <field.DateTimeField
                  label="Expired At"
                  description="Quote expiration date"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Audit */}
          <FieldGroup>
            <FieldLegend>Audit</FieldLegend>
            <FieldDescription>
              Manage audit information
            </FieldDescription>

            <form.AppField name="createdBy">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="createdBy"
                  label="Created By"
                  description="User who created quote"
                  displayField="username"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Evidence */}
          <FieldGroup>
            <FieldLegend>Evidence</FieldLegend>
            <FieldDescription>
              Manage evidence information
            </FieldDescription>

            <form.AppField name="attachments">
              {(field) => (
                <field.TextField
                  label="Attachments"
                  description="Supporting documents"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
      </form.AppForm>
    );
  },
});

const CreateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const form = useAppForm(CreateFormOptionFactory(pocketbase));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <QuotesForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

const UpdateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data: record } = useSuspenseQuery({
    queryKey: ["quotes", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.BillingManagementQuotes)
        .getOne<BillingManagementQuotesRecord>(searchQuery.id!),
  });

  const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <QuotesForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

export default () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  switch (searchQuery.action) {
    case "create":
      return <CreateForm />;
    case "update":
      return <UpdateForm />;
    default:
      return null;
  }
};
