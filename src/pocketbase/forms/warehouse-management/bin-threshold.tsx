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
  WarehouseManagementProductsResponse,
  WarehouseManagementLocationsResponse,
  WarehouseManagementBinThresholdRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementBinThresholdSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementBinThresholdSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementBinThreshold>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementBinThreshold)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `BinThreshold created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementBinThresholdRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementBinThreshold>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementBinThreshold)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "BinThreshold updated successfully",
        })
        .unwrap();
    },
  });

export const BinThresholdForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementBinThreshold> | Update<Collections.WarehouseManagementBinThreshold>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Product */}
          <FieldGroup>
            <FieldLegend>Product</FieldLegend>
            <FieldDescription>
              Manage product information
            </FieldDescription>

            <form.AppField name="product">
              {(field) => (
                <field.RelationField<WarehouseManagementProductsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementProducts}
                  relationshipName="product"
                  label="Product"
                  description="Associated product"
                  displayField="name"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Location */}
          <FieldGroup>
            <FieldLegend>Location</FieldLegend>
            <FieldDescription>
              Manage location information
            </FieldDescription>

            <form.AppField name="location">
              {(field) => (
                <field.RelationField<WarehouseManagementLocationsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementLocations}
                  relationshipName="location"
                  label="Location"
                  description="Bin location"
                  displayField="name"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Thresholds */}
          <FieldGroup>
            <FieldLegend>Thresholds</FieldLegend>
            <FieldDescription>
              Manage thresholds information
            </FieldDescription>

            <form.AppField name="minQuantity">
              {(field) => (
                <field.NumberField
                  label="Min Quantity"
                  description="Minimum quantity before alert"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="maxQuantity">
              {(field) => (
                <field.NumberField
                  label="Max Quantity"
                  description="Maximum quantity capacity"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Replenishment */}
          <FieldGroup>
            <FieldLegend>Replenishment</FieldLegend>
            <FieldDescription>
              Manage replenishment information
            </FieldDescription>

            <form.AppField name="reorderQuantity">
              {(field) => (
                <field.NumberField
                  label="Reorder Quantity"
                  description="Quantity to reorder when minimum reached"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Alerts */}
          <FieldGroup>
            <FieldLegend>Alerts</FieldLegend>
            <FieldDescription>
              Manage alerts information
            </FieldDescription>

            <form.AppField name="alertThreshold">
              {(field) => (
                <field.NumberField
                  label="Alert Threshold"
                  description="Alert threshold quantity"
                  placeholder="0"
                  min={0}
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
                  description="Whether threshold is active"
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
        <BinThresholdForm form={form as any} />
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
    queryKey: ["binthreshold", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementBinThreshold)
        .getOne<WarehouseManagementBinThresholdRecord>(searchQuery.id!),
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
        <BinThresholdForm form={form as any} />
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
