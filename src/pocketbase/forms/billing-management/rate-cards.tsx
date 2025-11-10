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
  BillingManagementRateCardsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { BillingManagementRateCardsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementRateCardsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.BillingManagementRateCards>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementRateCards)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `RateCards created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: BillingManagementRateCardsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.BillingManagementRateCards>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementRateCards)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "RateCards updated successfully",
        })
        .unwrap();
    },
  });

export const RateCardsForm = withForm({
  defaultValues: {} as Create<Collections.BillingManagementRateCards> | Update<Collections.BillingManagementRateCards>,
  render: ({ form }) => {
return (
      <form.AppForm>
        <FieldSet>
          {/* Basic Information */}
          <FieldGroup>
            <FieldLegend>Basic Information</FieldLegend>
            <FieldDescription>
              Manage basic information information
            </FieldDescription>

            <form.AppField name="name">
              {(field) => (
                <field.TextField
                  label="Name"
                  description="A unique name identifying this rate card"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Classification */}
          <FieldGroup>
            <FieldLegend>Classification</FieldLegend>
            <FieldDescription>
              Manage classification information
            </FieldDescription>

            <form.AppField name="type">
              {(field) => (
                <field.SelectField
                  label="Type"
                  description="The service category this rate card applies to"
                  options={[
                    { label: "Shipping", value: "shipping" },
                    { label: "Storage", value: "storage" },
                    { label: "Fulfillment", value: "fulfillment" },
                    { label: "Handling", value: "handling" },
                    { label: "Insurance", value: "insurance" },
                    { label: "Customs", value: "customs" },
                    { label: "Packaging", value: "packaging" },
                    { label: "Returns", value: "returns" }
                  ]}
                  placeholder="Select..."
                  required
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

            <form.AppField name="isActive">
              {(field) => (
                <field.TextField
                  label="Is Active"
                  description="Mark whether this rate card is currently in use for billing"
                  placeholder=""
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

            <form.AppField name="description">
              {(field) => (
                <field.TextareaField
                  label="Description"
                  description="Additional information about the purpose and terms of this rate card"
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

            <form.AppField name="validFrom">
              {(field) => (
                <field.DateTimeField
                  label="Valid From"
                  description="The date when this rate card becomes effective"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="validTo">
              {(field) => (
                <field.DateTimeField
                  label="Valid To"
                  description="The date when this rate card expires or becomes inactive"
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
        <RateCardsForm form={form as any} />
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
    queryKey: ["ratecards", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.BillingManagementRateCards)
        .getOne<BillingManagementRateCardsRecord>(searchQuery.id!),
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
        <RateCardsForm form={form as any} />
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
