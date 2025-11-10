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
  WarehouseManagementStockTransferRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementStockTransferSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementStockTransferSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementStockTransfer>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementStockTransfer)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `StockTransfer created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementStockTransferRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementStockTransfer>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementStockTransfer)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "StockTransfer updated successfully",
        })
        .unwrap();
    },
  });

export const StockTransferForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementStockTransfer> | Update<Collections.WarehouseManagementStockTransfer>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Source */}
          <FieldGroup>
            <FieldLegend>Source</FieldLegend>
            <FieldDescription>
              Manage source information
            </FieldDescription>

            <form.AppField name="sourceWarehouse">
              {(field) => (
                <field.RelationField<WarehouseManagementWarehousesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementWarehouses}
                  relationshipName="sourceWarehouse"
                  label="Source Warehouse"
                  description="Sending warehouse"
                  displayField="name"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Destination */}
          <FieldGroup>
            <FieldLegend>Destination</FieldLegend>
            <FieldDescription>
              Manage destination information
            </FieldDescription>

            <form.AppField name="destinationWarehouse">
              {(field) => (
                <field.RelationField<WarehouseManagementWarehousesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementWarehouses}
                  relationshipName="destinationWarehouse"
                  label="Destination Warehouse"
                  description="Receiving warehouse"
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
                  description="Product being transferred"
                  displayField="name"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Quantity */}
          <FieldGroup>
            <FieldLegend>Quantity</FieldLegend>
            <FieldDescription>
              Manage quantity information
            </FieldDescription>

            <form.AppField name="quantity">
              {(field) => (
                <field.NumberField
                  label="Quantity"
                  description="Quantity to transfer"
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

            <form.AppField name="status">
              {(field) => (
                <field.SelectField
                  label="Status"
                  description="Current status"
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "In-transit", value: "in-transit" },
                    { label: "Received", value: "received" },
                    { label: "Cancelled", value: "cancelled" }
                  ]}
                  placeholder="Select..."
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
        <StockTransferForm form={form as any} />
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
    queryKey: ["stocktransfer", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementStockTransfer)
        .getOne<WarehouseManagementStockTransferRecord>(searchQuery.id!),
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
        <StockTransferForm form={form as any} />
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
