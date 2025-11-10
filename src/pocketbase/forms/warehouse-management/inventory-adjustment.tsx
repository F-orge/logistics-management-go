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
  WarehouseManagementWarehousesResponse,
  WarehouseManagementProductsResponse,
  UsersResponse,
  WarehouseManagementInventoryAdjustmentRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementInventoryAdjustmentSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementInventoryAdjustmentSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementInventoryAdjustment>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementInventoryAdjustment)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `InventoryAdjustment created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementInventoryAdjustmentRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementInventoryAdjustment>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementInventoryAdjustment)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "InventoryAdjustment updated successfully",
        })
        .unwrap();
    },
  });

export const InventoryAdjustmentForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementInventoryAdjustment> | Update<Collections.WarehouseManagementInventoryAdjustment>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Warehouse */}
          <FieldGroup>
            <FieldLegend>Warehouse</FieldLegend>
            <FieldDescription>
              Manage warehouse information
            </FieldDescription>

            <form.AppField name="warehouse">
              {(field) => (
                <field.RelationField<WarehouseManagementWarehousesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementWarehouses}
                  relationshipName="warehouse"
                  label="Warehouse"
                  description="Associated warehouse"
                  displayField="name"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

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
                  description="Product adjusted"
                  displayField="name"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Adjustment */}
          <FieldGroup>
            <FieldLegend>Adjustment</FieldLegend>
            <FieldDescription>
              Manage adjustment information
            </FieldDescription>

            <form.AppField name="quantityChange">
              {(field) => (
                <field.NumberField
                  label="Quantity Change"
                  description="Quantity change (positive or negative)"
                  placeholder="0"
                  min={0}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Reason */}
          <FieldGroup>
            <FieldLegend>Reason</FieldLegend>
            <FieldDescription>
              Manage reason information
            </FieldDescription>

            <form.AppField name="reason">
              {(field) => (
                <field.SelectField
                  label="Reason"
                  description="Reason for adjustment"
                  options={[
                    { label: "Cycle-count", value: "cycle-count" },
                    { label: "Damaged-goods", value: "damaged-goods" },
                    { label: "Theft", value: "theft" },
                    { label: "Expired", value: "expired" },
                    { label: "Return-to-vendor", value: "return-to-vendor" },
                    { label: "Manual-correction", value: "manual-correction" }
                  ]}
                  placeholder="Select..."
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* User */}
          <FieldGroup>
            <FieldLegend>User</FieldLegend>
            <FieldDescription>
              Manage user information
            </FieldDescription>

            <form.AppField name="user">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="user"
                  label="User"
                  description="User making adjustment"
                  displayField="username"
                  recordListOption={{  }}
                  required
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

            <form.AppField name="notes">
              {(field) => (
                <field.TextareaField
                  label="Notes"
                  description="Adjustment notes"
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
        <InventoryAdjustmentForm form={form as any} />
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
    queryKey: ["inventoryadjustment", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementInventoryAdjustment)
        .getOne<WarehouseManagementInventoryAdjustmentRecord>(searchQuery.id!),
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
        <InventoryAdjustmentForm form={form as any} />
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
