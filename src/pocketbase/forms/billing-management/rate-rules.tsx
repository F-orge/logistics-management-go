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
  BillingManagementRateCardsResponse,
  BillingManagementRateRulesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { BillingManagementRateRulesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementRateRulesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.BillingManagementRateRules>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementRateRules)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `RateRules created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: BillingManagementRateRulesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.BillingManagementRateRules>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementRateRules)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "RateRules updated successfully",
        })
        .unwrap();
    },
  });

export const RateRulesForm = withForm({
  defaultValues: {} as Create<Collections.BillingManagementRateRules> | Update<Collections.BillingManagementRateRules>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Rate Card */}
          <FieldGroup>
            <FieldLegend>Rate Card</FieldLegend>
            <FieldDescription>
              Manage rate card information
            </FieldDescription>

            <form.AppField name="rateCard">
              {(field) => (
                <field.RelationField<BillingManagementRateCardsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.BillingManagementRateCards}
                  relationshipName="rateCard"
                  label="Rate Card"
                  description="Associated rate card"
                  displayField="name"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Priority */}
          <FieldGroup>
            <FieldLegend>Priority</FieldLegend>
            <FieldDescription>
              Manage priority information
            </FieldDescription>

            <form.AppField name="priority">
              {(field) => (
                <field.NumberField
                  label="Priority"
                  description="Rule priority (lower = higher priority)"
                  placeholder="0"
                  min={0}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Condition */}
          <FieldGroup>
            <FieldLegend>Condition</FieldLegend>
            <FieldDescription>
              Manage condition information
            </FieldDescription>

            <form.AppField name="condition">
              {(field) => (
                <field.TextField
                  label="Condition"
                  description="Condition for rule application"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
            <form.AppField name="value">
              {(field) => (
                <field.TextField
                  label="Value"
                  description="Condition value"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Range */}
          <FieldGroup>
            <FieldLegend>Range</FieldLegend>
            <FieldDescription>
              Manage range information
            </FieldDescription>

            <form.AppField name="minValue">
              {(field) => (
                <field.NumberField
                  label="Min Value"
                  description="Minimum value for range"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="maxValue">
              {(field) => (
                <field.NumberField
                  label="Max Value"
                  description="Maximum value for range"
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

            <form.AppField name="pricingModel">
              {(field) => (
                <field.SelectField
                  label="Pricing Model"
                  description="How price is calculated"
                  options={[
                    { label: "Per-kg", value: "per-kg" },
                    { label: "Per-item", value: "per-item" },
                    { label: "Flat-rate", value: "flat-rate" },
                    { label: "Per-cubic-meter", value: "per-cubic-meter" },
                    { label: "Per-zone", value: "per-zone" },
                    { label: "Percentage", value: "percentage" },
                    { label: "Tiered", value: "tiered" }
                  ]}
                  placeholder="Select..."
                  required
                />
              )}
            </form.AppField>
            <form.AppField name="price">
              {(field) => (
                <field.NumberField
                  label="Price"
                  description="Price for this rule"
                  placeholder="0"
                  min={0}
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
                  description="Whether rule is active"
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
        <RateRulesForm form={form as any} />
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
    queryKey: ["raterules", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.BillingManagementRateRules)
        .getOne<BillingManagementRateRulesRecord>(searchQuery.id!),
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
        <RateRulesForm form={form as any} />
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
